const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/user");
const router = express.Router();

// AI Assistant Route
// AI Assistant Route
router.post("/ai-assistant", async (req, res) => {
  const { message } = req.body;

  //  Validate request
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  let userId = null;
  let user = null;

  //  Decode token from cookies if available
  try {
    const token = req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;

      //  Fetch user data from DB
      user = await User.findById(userId).select(
        "firstName lastName skills about"
      );
    }
  } catch (err) {
    // console.log("Guest user or invalid token");
  }

  try {
    //  Build user context
    const userContext = user
      ? `User Info → Name: ${user.firstName} ${user.lastName}, Skills: ${user.skills?.join(", ") || "N/A"
      }, About: ${user.about || "N/A"}.\n`
      : "";

    // Prepare prompt
    const systemPrompt =
      "You are an AI onboarding assistant for a platform called CodeCrush AI. Help users understand features like setting up profiles, finding smart matches, sending connection requests, and collaborating on projects. " +
      (user
        ? "Personalize your answers using the user's profile info provided."
        : "Respond generically if no user data.");

    const finalPrompt = `${systemPrompt}\n\n${userContext}User question: ${message}`;

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent(finalPrompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("=== AI ERROR START ===");
    console.error(err.message);
    console.error("=== AI ERROR END ===");
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

module.exports = router;
