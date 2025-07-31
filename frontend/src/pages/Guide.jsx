import { useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { evaluatePrompt } from "../utils/GeminiaiApi"; // ⬅️ Imported API wrapper

const Guide = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userPrompt.trim()) {
      setFeedback("⚠️ Please enter a prompt to evaluate.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const response = await evaluatePrompt(userPrompt); // ⬅️ Uses Gemini via backend
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("API Error:", error.message);
      setFeedback("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-6">How to Write a Great Prompt</h1>
        <p className="text-lg text-center mb-10">
          Follow this guide to write effective prompts that help us solve your problems accurately.
        </p>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "1. Be Clear and Specific",
              desc: "Clearly describe your problem or goal. Avoid vague language.",
            },
            {
              title: "2. Include Context",
              desc: "Add any background info or what you've already tried.",
            },
            {
              title: "3. Ask One Thing at a Time",
              desc: "Split complex problems into separate prompts for better results.",
            },
          ].map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Good vs Bad Prompts */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">🆚 Examples of Good vs Bad Prompts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-red-100 p-4 rounded-lg">
              <h4 className="font-bold text-red-700">❌ Bad Prompt</h4>
              <p>"Fix this code"</p>
              <p className="text-sm text-gray-700 mt-1">→ Too vague, no context.</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-bold text-green-700">✅ Good Prompt</h4>
              <p>
                "Here's my React login page code. I'm getting a 'Cannot read property of undefined'
                error at line 12. How can I fix it?"
              </p>
              <p className="text-sm text-gray-700 mt-1">→ Clear, specific, includes context.</p>
            </div>
          </div>
        </div>

        {/* Prompt Evaluation */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">📝 Try Writing Your Prompt</h2>
          <textarea
            className="w-full h-32 border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe your problem here..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Evaluating..." : "Submit Prompt"}
          </button>

          {feedback && (
            <div className="mt-6 bg-gray-100 p-4 rounded-md border-l-4 border-blue-500 text-gray-700">
              <strong>AI Feedback:</strong> {feedback}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to={"/inputs"} className="text-center block text-[#111] text-lg hover:underline">
              Go to Workflow Page
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guide;
