// const express = require("express");
// const connectDB = require("./config/database");
// const cookieParser = require("cookie-parser");
// const app = express();
// const dotenv = require("dotenv");
// dotenv.config({}); // Load environment variables - restart for stable model
// const cors = require("cors");
// const http = require("http");

// const allowedOrigins = ["http://localhost:5173", "https://code-crush-ai.vercel.app"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// //routes
// const authRouter = require("./routes/auth");
// const profileRouter = require("./routes/profile");
// const requestRouter = require("./routes/request");
// const userRouter = require("./routes/user");
// const initializeSocket = require("./utils/socket");
// const chatRouter = require("./routes/chat");
// const smartMatchRouter = require("./routes/smartMatch");
// const aiAssistantRouter = require("./routes/aiAssistant");

// app.use("/", authRouter);
// app.use("/", profileRouter);
// app.use("/", requestRouter);
// app.use("/", userRouter);
// app.use("/api", chatRouter);
// app.use("/api", smartMatchRouter);
// app.use("/api", require("./routes/aiAssistant"));

// const server = http.createServer(app);
// initializeSocket(server);

// //database connect before server
// connectDB().then(() => {
//   try {
//     server.listen(process.env.PORT, () => {
//       console.log(`Server running on ` + process.env.PORT);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

dotenv.config();

const app = express();

// ✅ CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://code-crush-ai.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/profile"));
app.use("/", require("./routes/request"));
app.use("/", require("./routes/user"));
app.use("/api", require("./routes/chat"));
app.use("/api", require("./routes/smartMatch"));
app.use("/api", require("./routes/aiAssistant"));

// ✅ Server + Socket
const server = http.createServer(app);
require("./utils/socket")(server);

// ✅ PORT FIX (THIS IS THE MAIN CHANGE)
const PORT = process.env.PORT || 3000;

// ✅ DB CONNECT → SERVER START
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
