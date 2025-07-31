// routes/promptRoutes.js
import express from "express";
import { evaluatePrompt } from "../controllers/promptController.js";

// ✅ Initialize router
const router = express.Router();

// ✅ POST route for prompt evaluation via Gemini
router.post("/evaluate", evaluatePrompt);

// ✅ Export router to be used in your server
export default router;
