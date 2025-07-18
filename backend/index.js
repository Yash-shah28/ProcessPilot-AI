import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { serve } from "inngest/express";


import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import googleRoutes from "./routes/google.route.js";
import workflowRoutes from "./routes/workflow.routes.js";
import { inngest } from "./inngest/client.js";
import { onUsersignup } from "./inngest/functions/on-signup.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);
app.use("/api/google", googleRoutes);
app.use("/api/workflow", workflowRoutes);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onUsersignup],
  })
);




if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
	
});
