// routes/google.route.js
import express from "express";
import { sendEmail } from "../controllers/google.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // JWT middleware

const router = express.Router();

router.post("/send-email", verifyToken, sendEmail);

export default router;
