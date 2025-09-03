// routes/google.route.js
import express from "express";
import { sendEmail, createCalendarEvent,connectGmail,googleCallback , disconnectGmail} from "../controllers/google.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // JWT middleware

const router = express.Router();

router.post("/send-email", verifyToken, sendEmail);

router.post("/calendar-event", verifyToken, createCalendarEvent);

router.get("/connect", verifyToken, connectGmail);   // Get OAuth URL
router.get("/callback", verifyToken, googleCallback); // Handle Google redirect
router.post("/disconnect", verifyToken, disconnectGmail); // Disconnect Gmail


export default router;
