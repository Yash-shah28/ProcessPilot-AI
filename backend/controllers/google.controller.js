import { google } from "googleapis";
import { User } from "../models/user.model.js";

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
