import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { BASE_URL } from "../utils/constants"; // Keeping BASE_URL for socket connection logic if needed (wait, socket handles it)

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const scrollRef = useRef(null);
  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get("/api/chat/" + targetUserId);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((prev) => [
        ...prev,
        { firstName, lastName, text, createdAt },
      ]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    socketRef.current?.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-base-content flex justify-center">
      <div className="w-full max-w-3xl bg-base-200 rounded-xl shadow-xl border border-base-300 flex flex-col h-[70vh]">
        <div className="p-4 border-b border-base-300 text-xl font-semibold text-center text-primary tracking-wide">
          Dev Chat 💬
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.map((msg, index) => {
            const isSelf = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={`chat ${isSelf ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header text-sm font-semibold text-base-content/60">
                  {msg.firstName}
                  {msg.createdAt && (
                    <time className="ml-2 text-xs text-base-content/40">
                      {formatTime(msg.createdAt)}
                    </time>
                  )}
                </div>
                <div
                  className={`chat-bubble ${isSelf
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "bg-base-300 text-base-content"
                    } rounded-2xl text-sm px-4 py-2`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-base-300 flex gap-3 items-center bg-base-100 rounded-b-xl">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type your message..."
            className="textarea textarea-bordered w-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={sendMessage}
            className="btn btn-primary shadow-md hover:scale-105 transition-transform duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
