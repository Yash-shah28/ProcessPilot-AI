import axios from "axios";

// ✅ Base URL pointing to your backend server
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ Needed if you're using cookies/auth
});

// ✅ Call Gemini-backed prompt evaluator route
export const evaluatePrompt = (prompt) =>
  API.post("/prompt/evaluate", { prompt });
