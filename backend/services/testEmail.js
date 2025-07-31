// runTest.js

// ✅ 1. Load .env at the VERY top
import path from "path";
import dotenv from "dotenv";

// Optional: explicitly point to your .env file (if not in root)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { emailDraft } from "../utils/ai.js"; // ✅ Adjust this path if needed

const extractJSONFromMarkdown = (text) => {
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    return match ? match[1] : null;
};


const runEmailTest = async () => {

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing. Check your .env file.");
    return;
  }

  const description = "Schedule a product demo on every Tuesday at 4 PM with yashshah28072004@gmail.com and yashkordia@gmail.com. Send a confirmation email to both 1 day in advance.Create a reminder 30 minutes before the demo via email. text"

  try {
    const draft = await emailDraft(description);
    const emailcontent = draft.output?.[0]?.content;
    const extractedemail = extractJSONFromMarkdown(emailcontent);
    const parsedemail = JSON.parse(extractedemail);
    console.log("📧 to:\n", parsedemail.to);
    console.log("📧 subject:\n", parsedemail.subject);
    console.log("📧 body:\n", parsedemail.body);
  } catch (error) {
    console.error("🚨 AI Drafting Error:", error);
  }
};



runEmailTest();
