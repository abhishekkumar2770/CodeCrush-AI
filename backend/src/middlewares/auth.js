const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Get token directly without destructuring
    // Get token from Authorization Header (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Please Login (Token missing)");
    }
    const token = authHeader.split(" ")[1];

    // jwt.verify is synchronous
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log to debug the decoded token structure
    console.log("Decoded token:", decoded);

    // Use userId or _id based on how you structured your token
    const userId = decoded.userId || decoded._id;

    if (!userId) {
      throw new Error("Invalid token structure");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User Not Found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
