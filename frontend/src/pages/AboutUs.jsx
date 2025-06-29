import Footer from "../components/Footer";
import Lottie from "lottie-react";
import aiBrain from "../assets/ai-brain.json";
import automationGears from "../assets/automation-gears.json";
import aiagnt from "../assets/ai-agn.json";
import Aivision from "../assets/ai-vision.json";
import Thanks from "../assets/thanks.json";

const lottieAnimations = [aiBrain, automationGears, aiagnt, Aivision, Thanks];

const sections = [
  {
    title: "🚀 Our Mission",
    content:
      "To empower businesses and professionals by simplifying routine operations using smart, AI-driven workflows — enabling faster decisions, improved productivity, and smarter task management.",
  },
  {
    title: "💡 What We Do",
    content:
      "We help users automate multi-step workflows like sending emails, creating calendar events, and posting reminders — all powered by AI. Our system drafts content, classifies tasks, sets reminders, and integrates with Gmail, Google Calendar, and Slack.",
  },
  {
    title: "🧠 How We're Different",
    content:
      "ProcessPilot AI doesn't just automate — it thinks. Using AI agents, we bring context, learning, and prediction to your workflows. Our goal is not just time-saving, but smarter execution.",
  },
  {
    title: "📈 Our Vision",
    content:
      "The future of work is automated and intelligent. ProcessPilot AI is your partner in this future — smart, fast, and adaptive.",
  },
  {
    title: "🙌 Thank You",
    content:
      "Whether you're a user, collaborator, or supporter — thank you for being part of the journey. We're just getting started!",
  },
];

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black font-sans">
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-gray-800 tracking-tight">
          About ProcessPilot AI
        </h1>

        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-8 md:gap-16 mb-20`}
          >
            {/* Text Section */}
            <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8 md:p-10 transition-all hover:shadow-xl">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{section.content}</p>
            </div>

            {/* Lottie Animation */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white rounded-2xl shadow-md p-6 h-[280px] md:h-[320px]">
              <Lottie
                animationData={lottieAnimations[index]}
                loop
                className="h-full w-full max-w-xs md:max-w-sm"
              />
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
