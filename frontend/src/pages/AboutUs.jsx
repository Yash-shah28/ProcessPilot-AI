import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
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
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      <Navbar />
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-16 space-y-24">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">
          About ProcessPilot AI
        </h1>

        {sections.map((section, index) => {
          const isReversed = index % 2 !== 0;

          const textAnim = {
            hidden: { opacity: 0, x: isReversed ? 100 : -100 },
            visible: { opacity: 1, x: 0 },
          };
          const imageAnim = {
            hidden: { opacity: 0, x: isReversed ? -100 : 100 },
            visible: { opacity: 1, x: 0 },
          };

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""
                } items-center gap-10 md:gap-16`}
            >
              {/* TEXT SECTION */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                variants={textAnim}
                className="w-full md:w-1/2"
              >
                <h2 className="text-3xl font-semibold mb-4 text-gray-700 relative inline-block">
                  <span className="z-10 relative">{section.title}</span>
                  <span className="absolute bottom-0 left-1 w-full h-1 bg-gradient-to-r from-black to-blue-900 rounded-full"></span>
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {section.content}
                </p>
              </motion.div>

              {/* LOTTIE SECTION */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                variants={imageAnim}
                className="w-full md:w-1/2 flex items-center justify-center"
              >
                <Lottie
                  animationData={lottieAnimations[index]}
                  loop
                  className="h-64 w-full max-w-sm"
                />
              </motion.div>
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
