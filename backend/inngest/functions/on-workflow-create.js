import { Workflow } from "../../models/workflow.model.js";
import {Activity} from "../../models/activity.model.js";
import { inngest } from "../client.js";
import { emailDraft, workflowAI } from "../../utils/ai.js";
import { createCalendarEvent, sendEmail } from "../../controllers/google.controller.js";

const convertTo24Hour = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string") return timeStr;
    const [time, ampm] = timeStr.trim().split(" ");
    let [hour, min] = time.split(":").map(Number);
    if (ampm?.toLowerCase() === "pm" && hour < 12) hour += 12;
    if (ampm?.toLowerCase() === "am" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${min || "00"}`;
};


const normalizeAndHandleWorkflow = (parsed) => {
    const { workflow, missing_fields } = parsed;

    if (!workflow || !workflow.steps) {
        console.error("❌ Invalid workflow structure.");
        return;
    }

    const normalized = {
        workflow_name: workflow.workflow_name || "Untitled Workflow",
        steps: workflow.steps.map((step, i) => {
            const normalizedStep = {
                name: step.name,
                type: step.type,
                order: i + 1,
                parameters: {}
            };

            const params = { ...step.parameters };

            // Calendar Event Normalization
            if (step.type === "calendar_event") {
                if (params.subject) {
                    params.title = params.subject;
                    delete params.subject;
                }

                // Normalize attendees
                if (typeof params.attendees === "string") {
                    params.attendees = [params.attendees];
                }

                // Time formatting (optional)
                if (params.time) {
                    params.time = convertTo24Hour(params.time);
                }

                // Cleanup
                delete params.date && params.recurrence; // Remove date if recurrence exists
            }

            // Send Email Normalization
            if (step.type === "send_email") {
                if (typeof params.to === "string") {
                    params.to = [params.to];
                }
            }

            // Reminder Normalization
            if (step.type === "reminder") {
                // Could add time/unit conversion or recipient formatting here
            }

            normalizedStep.parameters = params;
            return normalizedStep;
        })
    };

    return normalized;
};


const extractJSONFromMarkdown = (text) => {
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    return match ? match[1] : null;
};

export const onWorkflowCreate = inngest.createFunction(
    { id: "on-workflow-create" },
    { event: "workflow/create" },
    async ({ event, step }) => {
        try {
            const { workflowId } = event.data;

            const workflow = await step.run("get-workflow", async () => {
                const workflowObject = await Workflow.findById(workflowId);
                if (!workflowObject) {
                    throw new NonRetriableError("Workflow not found");
                }
                return workflowObject;
            });

            const result = await workflowAI(workflow.description);
            const rawContent = result.output?.[0]?.content;
            const extracted = extractJSONFromMarkdown(rawContent);
            const parsed = JSON.parse(extracted);
            const response = normalizeAndHandleWorkflow(parsed)

            const email = await emailDraft(workflow.description);
            const emailcontent = email.output?.[0]?.content;
            const extractedemail = extractJSONFromMarkdown(emailcontent);
            const parsedemail = JSON.parse(extractedemail);

            await step.run("Update-Workflow", async () => {
                await Workflow.findByIdAndUpdate(workflowId, {
                    $set: {
                        steps: response.steps,
                        name: response.workflow_name
                    }
                }, { new: true });
            })
            for (const [i, stepItem] of response.steps.entries()) {
                await step.run(`step-${i + 1}-${stepItem.name}`, async () => {
                    const fakeReq = {
                        userId: workflow.userId,
                        body: stepItem.parameters,

                    };

                    const emailfakeReq = {
                        userId: workflow.userId,
                        body: {
                            to: parsedemail.to,
                            subject: parsedemail.subject,
                            body: parsedemail.body
                        }
                    }

                    const fakeRes = {
                        status: (code) => ({
                            json: (data) => console.log(`📬 Response [${code}]:`, data)
                        })
                    };

                    switch (stepItem.type) {
                        case "calendar_event":
                            await createCalendarEvent(fakeReq, fakeRes);
                            break;
                        case "send_email":
                            await sendEmail(emailfakeReq, fakeRes);
                            break;

                        case "reminder":
                            break;

                        default:
                            throw new Error(`Unsupported step type: ${stepItem.type}`);
                    }

                    // Update DB: mark step as completed (if you track per step status)
                    await Workflow.updateOne(
                        { _id: workflowId, "steps.name": stepItem.name },
                        { $set: { "steps.$.status": "completed" } }
                    );
                });
            }
            await step.run("Update-Activity", async () => {
                await Activity.create({ userId: workflow.userId, workflowId: workflow._id, type: "created", status: "success" });
            })


        } catch (err) {
            console.error("❌ Error running the step", err.message);
            return { success: false };
        }
    }
)