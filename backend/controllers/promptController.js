// backend/controllers/promptController.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // ✅ Load .env variables

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const evaluatePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // ✅ Correct way to call generateContent
    const result = await model.generateContent(
      `Evaluate this prompt: "${prompt}". You are a helpful assistant that checks if the prompt is specific and effective. 
       If it’s vague, suggest how to improve it. If it’s good, say it's ready to use.`
    );

    const response = await result.response;
    const feedback = await response.text(); // ✅ Await this properly

    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Gemini API Error:", error?.message || error);
    res.status(500).json({ error: "Gemini API request failed." });
  }
};

