const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// Authentication Middleware
const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token found, authorization denied" });
    }

    try {
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id; // Attach userId to request object

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token is expired" });
        }

        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

// Restrict Middleware (To Ensure Only Authenticated Users Can Access Certain Routes)
const restrict = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user; // Attach user object to request

        next(); // Move to the next middleware/controller
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { authenticate, restrict };
