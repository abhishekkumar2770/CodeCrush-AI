import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./components/Home";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import SmartMatches from "./components/SmartMatches";
// import AIAssistant from "./components/AIAssistant";
import Assistant from "./pages/Assistant";

import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";

import Chat from "./components/Chat";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data)); // store user in Redux
      } catch (err) {
        console.log("User not logged in or session expired");
        dispatch(addUser(null)); // optional fallback
      }
    };

    checkLogin();
  }, [dispatch]);

  return (
    <div
      data-theme="business"
      className="min-h-screen flex flex-col bg-base-100 text-base-content"
    >
      <Router>
        <NavBar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
            <Route path="/smart-matches" element={<SmartMatches />} />
            {/* <Route path="/assistant" element={<AIAssistant />} /> */}
            <Route path="/assistant" element={<Assistant />} />
          </Routes>
        </main>
        <Toaster position="top-right" reverseOrder={false} />
        <Footer />
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
