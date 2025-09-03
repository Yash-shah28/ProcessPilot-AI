import { google } from "googleapis";
import { User } from "../models/user.model.js";
import { getNextDateTime } from "../utils/getNextDateTime.js";
import { convertToRRULE } from "../utils/convertToRRULE.js";

import { oauth2Client } from "../config/google.js";

// Step 1: Generate OAuth URL
export const connectGmail = async (req, res) => {
  try {
    const scopes = [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline", // ensures refresh_token is returned
      prompt: "consent",      // always ask user
      scope: scopes,
    });

    res.json({ url });
  } catch (error) {
    console.error("Error generating Gmail OAuth URL:", error);
    res.status(500).json({ success: false, message: "Failed to connect Gmail" });
  }
};

// Step 2: Callback from Google
export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: tokens.expiry_date,
    };
    await user.save();

    // Redirect to frontend after successful connection
    res.redirect("http://localhost:5173/profile");
  } catch (error) {
    console.error("Error in Google OAuth callback:", error);
    res.status(500).json({ success: false, message: "Google OAuth failed" });
  }
};

// Step 3: Disconnect Gmail
export const disconnectGmail = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $unset: { accessToken: "", refreshToken: "" } }, // remove fields
      { new: true, runValidators: false }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, message: "Gmail disconnected" });
  } catch (err) {
    console.error("Error disconnecting Gmail:", err);
    res.status(500).json({ message: "Failed to disconnect Gmail" });
  }
};



export const sendEmail = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user || !user.accessToken) {
    return res.status(401).json({ message: "Google not connected." });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: user.accessToken });
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const { to, subject, body } = req.body;

  // ✅ Ensure `to` is an array of valid strings
  console.log("Sending email to:", to);
  const recipients = Array.isArray(to) ? to.join(", ") : to;
  console.log("Formatted recipients:", recipients);
  if (!recipients || recipients.includes("undefined")) {
    return res.status(400).json({ message: "Invalid 'To' email address." });
  }

  // ✅ Build MIME message with proper headers
  const mimeMessage = [
    `To: ${recipients}`,
    `Subject: ${subject}`,
    "Content-Type: text/html; charset=UTF-8",
    "",
    body
  ].join("\r\n");

  const encodedMessage = Buffer.from(mimeMessage)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage
      }
    });

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Gmail send error:", error?.response?.data || error);
    res.status(500).json({ message: "Failed to send email." });
  }
};



export const createCalendarEvent = async (req, res) => {
  const userId = req.userId;
  const params = req.body;

  console.log("Creating calendar event with params:", params);
  console.log("User ID:", userId);
  try {
    const user = await User.findById(userId);
    if (!user || !user.accessToken) {
      return res.status(401).json({ message: "Google not connected." });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: user.accessToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const timeZone = params.timeZone || "Asia/Kolkata";
    const startTime = getNextDateTime(params.recurrence, params.time, params.date);
    const endTime = new Date(startTime.getTime() + (params.duration || 30) * 60000);
    const recurrenceRule = convertToRRULE(params.recurrence);

    const event = {
      summary: params.title || "Untitled Event",
      start: {
        dateTime: startTime.toISOString(),
        timeZone,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone,
      },
      attendees: (params.attendees || []).map(email => ({ email })),
      ...(recurrenceRule ? { recurrence: [recurrenceRule] } : {})
    };

    await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    res.status(200).json({ success: true, message: "Calendar event created." });
  } catch (error) {
    console.error("Calendar error:", error?.response?.data || error);
    res.status(500).json({ message: "Failed to create calendar event." });
  }
};
