import express from "express";
import passport from "passport";
import {
  login,
  logout,
  signup,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import "../utils/passport.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Set JWT cookie and redirect
    generateTokenAndSetCookie(res, req.user._id);
    const redirectUrl = `${process.env.CLIENT_URL}/dashboard`;
    res.redirect(redirectUrl);
  }
);

export default router;
