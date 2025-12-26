import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";

const SmartMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSmartMatches = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/smart-matches", {
        withCredentials: true,
      });
      setMatches(res.data.matches || []);
    } catch (err) {
      console.error("Error fetching smart matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInterest = async (targetId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/interested/${targetId}`,
        {},
        { withCredentials: true }
      );
      toast.success("You showed interest! 🤝");
      setMatches((prev) => prev.filter((m) => m.user._id !== targetId));
    } catch (err) {
      toast.error("Failed to send interest.");
      console.error("Error sending interest:", err);
    }
  };

  const handleIgnore = async (targetId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/ignored/${targetId}`,
        {},
        { withCredentials: true }
      );
      toast("Ignored successfully 🚫", { icon: "❌" });
      setMatches((prev) => prev.filter((m) => m.user._id !== targetId));
    } catch (err) {
      toast.error("Failed to ignore.");
      console.error("Error ignoring match:", err);
    }
  };

  useEffect(() => {
    fetchSmartMatches();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-base-content">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Smart Match Suggestions 💡
        </h1>
        <p className="text-sm text-base-content/70 mt-1">
          Based on your skill compatibility
        </p>
      </div>

      {loading ? (
        <div className="text-center mt-20 text-white text-lg">
          Loading suggestions...
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center mt-20 text-base-content/60">
          No suitable matches found. Try updating your skills!
        </div>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto grid-cols-1 md:grid-cols-2">
          {matches.map(({ user, similarity }, idx) => (
            <div
              key={idx}
              className="bg-base-200 p-5 rounded-2xl shadow-md border border-base-300 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover border border-base-300"
                />
                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-base-content/70">
                    Match Score: {(similarity * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              <div className="mt-3 text-sm text-base-content/80 line-clamp-3">
                {user.about}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {user.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => handleInterest(user._id)}
                  className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-none shadow hover:scale-105 transition duration-200"
                >
                  💖 Interested
                </button>
                <button
                  onClick={() => handleIgnore(user._id)}
                  className="btn btn-sm bg-error text-white border-none shadow hover:scale-105 transition duration-200"
                >
                  ❌ Ignore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartMatches;
