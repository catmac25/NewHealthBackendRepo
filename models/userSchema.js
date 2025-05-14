const mongoose = require("mongoose");
const userSchema = new mongoose.Schema ({
    name: {type:String, required:true},
    phone: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 4},
    address: {type: String, required: true},
    gender: {type: [String], enum: ["Male", "Female","ThirdGender"], required: true},
    feedbackCount: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);
module.exports = User;