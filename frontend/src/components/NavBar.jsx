import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { FiLock } from "react-icons/fi"; // Feather lock icon
import { FiUser, FiUsers, FiInbox } from "react-icons/fi";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      localStorage.removeItem("token"); // ✅ Clear token
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogoClick = () => {
    if (
      location.pathname === "/login" ||
      location.pathname.startsWith("/login")
    ) {
      navigate("/");
    } else {
      if (user) {
        navigate("/feed");
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-base-100 text-base-content shadow-md z-50">
      <div className="navbar w-full px-4 sm:px-6 lg:px-8 h-16 flex justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center">
          <span
            onClick={handleLogoClick}
            className="cursor-pointer text-2xl sm:text-3xl font-extrabold tracking-tight select-none px-2 bg-gradient-to-r from-sky-400 to-pink-400 text-transparent bg-clip-text transition duration-300 hover:brightness-110 hover:underline underline-offset-4"
          >
            CodeCrush AI
          </span>
        </div>

        {/* Right Side */}
        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden sm:block text-sm text-base-content/70 font-medium px-4 py-1 rounded-lg bg-base-200">
                👋 Welcome, {user.firstName}
              </div>
              {/* Profile Dropdown hameburger */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:bg-base-200"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user.photoURL} alt="User Avatar" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
                >
                  <li>
                    <Link to="/profile">
                      <FiUser className="inline mr-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">
                      <FiUsers className="inline mr-2" />
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link to="/requests">
                      <FiInbox className="inline mr-2" />
                      Requests
                    </Link>
                  </li>
                  <li>
                    <Link to="/smart-matches">Smart Matches 💡</Link>
                  </li>
                  <li>
                    <Link to="/assistant">AI Assistant 🤖</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-400"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm border-primary text-primary px-4 flex items-center gap-2 transform transition duration-300 ease-in-out hover:scale-105 hover:brightness-110"
              >
                <FiLock className="text-lg" />
                Login
              </Link>
              <Link
                to="/login?mode=signup"
                className="btn btn-primary btn-sm text-white px-4 font-semibold transform transition duration-300 ease-in-out hover:scale-105 hover:brightness-110"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
          >
            {user ? (
              <>
                <li>
                  <Link to="/profile">
                    <FiUser className="inline mr-2" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections">
                    <FiUsers className="inline mr-2" />
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests">
                    <FiInbox className="inline mr-2" />
                    Requests
                  </Link>
                </li>
                <li>
                  <Link to="/smart-matches">Smart Matches 💡</Link>
                </li>
                <li>
                  <Link to="/assistant">AI Assistant 🤖</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-400"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FiLock className="inline mr-1" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/login?mode=signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
