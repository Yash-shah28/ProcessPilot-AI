// routes/google.route.js
import express from "express";
import { sendEmail, createCalendarEvent } from "../controllers/google.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // JWT middleware

const router = express.Router();

router.post("/send-email", verifyToken, sendEmail);

router.post("/calendar-event", verifyToken, createCalendarEvent);


export default router;
