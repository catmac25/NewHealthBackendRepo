const Feedback = require("../models/feedbackSchema");
const User = require("../models/userSchema");

// Get feedback for a specific user
const getFeedback = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find feedback related to the user
        const feedbacks = await Feedback.find({ user: userId });

        if (feedbacks.length === 0) {
            return res.status(404).json({ success: false, message: "No feedback found for this user" });
        }

        res.status(200).json({ success: true, message: "Feedback retrieved", data: feedbacks });
    } catch (error) {
        console.error("Error retrieving feedback:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Add new feedback
const addFeedback = async (req, res) => {
    const { email, Name, phone, feedback, selectedOptions, rating } = req.body;

    try {
        // Check if the user exists by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found, please login first" });
        }

        // Create and save new feedback
        const newFeedback = new Feedback({
            user: user._id,
            email,
            Name,
            phone,
            feedback,
            servicesUsed: selectedOptions,
            rating
        });

        await newFeedback.save();

        // Increment feedback count in User model
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $inc: { feedbackCount: 1 } }, // Increment feedbackCount
            { new: true } // Return the updated user object
        );

        res.status(201).json({ 
            success: true, 
            message: "New feedback added", 
            feedbackCount: updatedUser.feedbackCount 
        });
    } catch (error) {
        console.error("Error adding feedback:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { getFeedback, addFeedback };
