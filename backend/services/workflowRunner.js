import { Workflow } from "../models/workflow.model.js";

export const runWorkflow = async (workflowId, userId) => {
    const workflow = await Workflow.findOne({ _id: workflowId, userId: userId });

    if (!workflow) throw new Error("Workflow not found");

    workflow.status = "running";
    await workflow.save();

    const steps = workflow.steps.sort((a, b) => a.order - b.order);

    for (const step of steps) {
        try {
            switch (step.type) {
                case "calendar_event":
                    await handleCalendarEvent(step.parameters, userId);
                    break;

                case "reminder":
                    await handleReminder(step.parameters, userId);
                    break;

                case "send_email":
                    const content = await draftEmailWithAI(step.parameters)

                    await sendEmail(
                        step.parameters.to,
                        step.parameters.subject,
                        content,
                        userId
                    );
                    break;

                default:
                    console.log(`Unknown step type: ${step.type}`);
            }
        } catch (err) {
            console.error(`Step failed [${step.name}]`, err);
            workflow.status = "failed";
            await workflow.save();
            throw err; // exit early if step fails
        }
    }

    workflow.status = "completed";
    await workflow.save();
};