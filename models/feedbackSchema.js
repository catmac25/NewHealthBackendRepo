const mongoose = require("mongoose");

const feedback = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: {type:String, required:true},
    Name: { type: String, required: true },
    phone: { type: String, required: true },
    feedback: { type: String, required: true },
    servicesUsed: { type: [String], required: true }, // Stores selected options
    rating: { webservice:{
        type:Number,
        required:true,
        min:1,
        max:5
    }, 
    consultation:{
        type:Number,
        required:true,
        min:1,
        max:5
    }, 
    availability:{
        type:Number,
        required:true,
        min:1,
        max:5
    }}
});
module.exports = mongoose.model("Feedback", feedback);