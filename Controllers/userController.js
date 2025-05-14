const User = require("../models/userSchema");
const appointmentSchema = require("../models/bookingSchema");
const updateUser = async (req , res) => {
    const id = req.params.id;
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true});
        res.status(200).json({status: true ,message:"sucessfully updated", data: updatedUser}); 
    }catch(error){
        res.status(500).json({status: false, message: "not updated!"});
    }
}

const deleteUser = async (req, res)=>{
    const id = req.params.id;

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, message:"successfully deleted"});
    } catch(error){
        res.status(404).json({status: false, message: "Internal server error"});
    }
}

const getSingleUser = async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await User.findById(id);

        res.status(200).json({success: true, message:"User Found", data: user});
    }catch(error){
        res.status(404).json({status: false, message: "failed to update"});
    }
}
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId); // ✅ Use req.userId from authenticate middleware

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, ...rest } = user.toObject(); // ✅ Remove sensitive data
        res.status(200).json({ success: true, message: "Profile info", data: rest });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getMyAppointments  = async(req,res) =>{
    try{
        // step1 => retrieve appointments from booking 
        const bookings = await appointmentSchema.find({user: req.user._id});
        res.status(200).json({success: true, message: "Upcoming appointments found"});
        // step2 =>
    }catch(error){
        res.status(500).json({success:false, message: "server error"});
    }
}
module.exports = {updateUser, deleteUser, getSingleUser, getUserProfile, getMyAppointments};