import { createAgent, gemini } from "@inngest/agent-kit"


export const emailDraft = async (description, senderName = "ProcessPilot AI") => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "Email Drafting Agent",
    system: `
You are a helpful and professional AI email assistant working inside an automation platform called \"ProcessPilot AI\".
Your job is to:
- Understand user instructions like meeting schedules, reminders, or emails.
- Extract email recipients, subjects, and relevant message content from the description.
- Write detailed, warm, polite, and professional emails for actions such as confirmations, follow-ups, reminders, or onboarding.

Rules:
- Automatically infer the email subject based on the description.
- Extract the recipient email addresses from the input.
- Output a JSON object with keys: "to" (array), "subject", and "body".
- Do not include [Name] placeholders unless explicitly provided.
- Keep the tone friendly, respectful, and direct.
- Begin with a proper greeting (e.g., "Hi Team," or "Hello,"), and end with a thank-you or closing line.
- The email body must be in valid HTML format.
- The final line in the email should be a polite thank-you message ending with the sender's name: ${senderName}.
`
  });

  const response = await supportAgent.run(`
Here is a task description from the user:
"""
${description}
"""

Extract the necessary email information and generate the following JSON object:
{
  "to": [...],
  "subject": "...",
  "body": "..."
}

The body should be in valid HTML format only.
Only output the JSON object, no commentary.`);

  return response;
};




export const workflowAI = async (userInstruction) => {
    const supportAgent = createAgent({
        model: gemini({
            model: "gemini-2.5-flash-lite",
            apiKey: process.env.GEMINI_API_KEY,
        }),
        name: "Workflow Agent",
        system:`
You are an AI workflow automation agent inside ProcessPilot AI.

Your job is to convert a user's natural instruction into a structured JSON object that can be saved to a MongoDB-based system. This object represents a workflow with one or more automation steps.

---

🧩 The structure must follow this format:
{
  "workflow": {
    "workflow_name": "String",
    "steps": [
      {
        "name": "String",
        "type": "calendar_event | send_email | reminder",
        "parameters": {
          ... // Depending on the step type
        }
      },
      ...
    ]
  }
}

---

📦 Parameters Required Per Step:

🔹 For type: "calendar_event":
- title (string)
- attendees (array of email strings)
- time (string, format "HH:mm")
- If recurring: recurrence (e.g., "Every Monday")
- If one-time: date (format "YYYY-MM-DD")
⚠️ Do NOT include both date and recurrence together.

🔹 For type: "reminder":
- offset_minutes (number)
- attendees (array of email strings)
- subject (string)
- content_type (string, saying reminder or follow_up for the meet or demo mention in the inputs)


🔹 For type: "send_email":
- to (array of email strings)
- subject (string)
- content_type (string)

---

🛑 If any required value is missing, insert "REQUIRED_INPUT" and add an entry in "missing_fields".

Return only a markdown-wrapped JSON object like:
\`\`\`json
{
  "workflow": { ... },
  "missing_fields": [
    field: 'Required input field name',
    step_name: 'Step name',
    explanation:  "Explanation of the missing value"
  ]
}
\`\`\`

Do NOT make assumptions. Always reflect missing fields clearly.
`
    })
    const response = await supportAgent.run(`The user provided the following instruction for workflow creation:

"""
${userInstruction}
"""

Please convert the instruction into a structured JSON following the exact schema described in the system prompt.

If any required value is missing (like time, subject, email address, recurrence, etc.), insert "REQUIRED_INPUT" and list the issue in the "missing_fields" array with a clear explanation.

Do not explain anything outside the code block.
Just return valid JSON inside a markdown \`\`\`json block.`);

    return response;
}
