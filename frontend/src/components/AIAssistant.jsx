import { useState } from "react";
import axios from "../utils/axios";
import { BASE_URL } from "../utils/constants";

const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/ai-assistant`,
        { message }
      );
      setReply(res.data.reply || "No response from DevBuddy.");
    } catch (err) {
      console.error("AI error:", err);
      setReply("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-800 via-indigo-900 to-gray-900 text-white p-8 rounded-3xl shadow-2xl border border-indigo-600">
        <h2 className="text-3xl font-bold mb-4 text-center tracking-wide">
          🤖 Meet <span className="text-accent font-extrabold">DevBuddy</span>
        </h2>
        {/* <p className="text-center text-sm text-white/70 mb-6">
          Your personal assistant to navigate CodeCrush AI. Ask anything about
          profile setup, smart matching, or building connections!
        </p> */}

        <textarea
          className="textarea w-full min-h-[100px] bg-base-100 text-base-content p-4 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="btn btn-accent btn-md px-6 hover:scale-105 transition-transform duration-200"
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask DevBuddy"}
          </button>
        </div>

        {reply && (
          <div className="mt-6 bg-base-100 text-base-content p-5 rounded-xl border border-base-300 shadow-sm">
            <h3 className="text-sm font-semibold text-base-content/70 mb-1">
              💡 DevBuddy Says:
            </h3>
            <p className="whitespace-pre-line leading-relaxed tracking-wide">
              {reply}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
