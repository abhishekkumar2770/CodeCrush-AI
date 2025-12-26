import axios from "../utils/axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  // ✅ Local state for form fields and UI toggles
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // true = login, false = signup
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect URL query parameter to auto-switch to signup form
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");

    // ✅ If user manually clicks "Login" or "Signup", update form state
    if (mode === "signup") {
      setIsLoginForm(false);
    } else {
      setIsLoginForm(true);
    }
  }, [location.search]);

  // ✅ Handle Login API call
  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        "/login",
        { emailId, password }
      );
      localStorage.setItem("token", res.data.token); // ✅ Store token
      dispatch(addUser(res.data.user)); // ✅ Corrected structure
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  // ✅ Handle Signup API call
  const handleSignUp = async () => {
    setError("");
    try {
      const res = await axios.post(
        "/signup",
        { firstName, lastName, emailId, password }
      );
      localStorage.setItem("token", res.data.token); // ✅ Store token
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    isLoginForm ? handleLogin() : handleSignUp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-base-100 text-base-content shadow-lg rounded-xl border border-neutral p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ✅ Heading */}
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in tracking-tight">
            {isLoginForm ? "Welcome Back 👋" : "Create an Account"}
          </h2>

          {/* ✅ Sign Up - Extra Fields */}
          {!isLoginForm && (
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-base-200 transition"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-base-200 transition"
                  placeholder="Doe"
                />
              </div>
            </div>
          )}

          {/* ✅ Email Field */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-base-200 transition"
              placeholder="you@example.com"
            />
          </div>

          {/* ✅ Password Field */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-base-200 transition"
              placeholder="••••••••"
            />
          </div>

          {/* ✅ Error Display */}
          {error && (
            <p className="text-red-500 text-center text-sm font-medium">
              {error}
            </p>
          )}

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full font-semibold text-lg tracking-wide hover:scale-[1.02] transition-transform"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          {/* ✅ Toggle Login/Signup */}
          <p
            className="text-sm text-center text-blue-300 mt-2 cursor-pointer hover:text-blue-400 hover:underline font-medium transition"
            onClick={() => setIsLoginForm((prev) => !prev)}
          >
            {isLoginForm
              ? "👉 New user? Create an account"
              : "👈 Already have an account? Login"}
          </p>
        </form>
      </div>
      <a
        href="/assistant"
        className="fixed bottom-20 right-6 z-[9999] w-14 h-14 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-2xl rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        title="AI Assistant"
      >
        🤖
      </a>
    </div>
  );
};

export default Login;
