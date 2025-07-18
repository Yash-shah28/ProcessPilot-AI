import { google } from "googleapis";
import { User } from "../models/user.model.js";
import { getNextDateTime } from "../utils/getNextDateTime.js";
import { convertToRRULE } from "../utils/convertToRRULE.js";


export const sendEmail = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user || !user.accessToken) {
    return res.status(401).json({ message: "User has not connected Google account." });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: user.accessToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const {to, subject, body}= req.body;
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    `${body}`
  ].join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage
    }
  });

  res.json({ success: true, message: "Email sent!" });
};



export const createCalendarEvent = async (req, res) => {
  const userId = req.userId;
  const params = req.body;

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
