const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    appointmentType: {
        type: Number, 
        enum: [1, 2, 3, 4],
        required: true
    }, 
    date: {
        type: Date,  
        required: true
    },
    slot:{
        type : String, 
        required: true
    },
    query:{
        type: String, 
    }
})

module.exports = mongoose.model("Appointment", appointmentSchema);