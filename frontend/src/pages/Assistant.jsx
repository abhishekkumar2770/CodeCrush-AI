import AIAssistant from "../components/AIAssistant";

const Assistant = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-fade-in">
          👋 Welcome to Your AI Assistant
        </h1>

        <p className="text-base sm:text-lg text-white/80 mb-10 leading-relaxed animate-fade-in delay-100">
          Ask anything about how to use{" "}
          <span className="text-accent font-medium">CodeCrush AI</span> — whether
          it's about smart matches, profile setup, or connecting with devs. Your
          AI guide is ready to help!
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-base-100/5 backdrop-blur-md rounded-2xl border border-base-300 shadow-xl p-6 sm:p-10">
        <AIAssistant />
      </div>
    </div>
  );
};

export default Assistant;
