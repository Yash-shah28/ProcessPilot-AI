import passport from "passport";
import dotenv from 'dotenv';
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/calendar.events"
    ],
    accessType: "offline",
    prompt: "consent"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: profile.emails[0].value },
        {
          name: profile.displayName,
          googleId: profile.id,
          accessToken,
          refreshToken,
          tokenExpiry: new Date(Date.now() + 3600 * 1000) // estimate
        },
        { upsert: true, new: true }
      );
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));
