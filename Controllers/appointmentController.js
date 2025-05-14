const Appointment = require ("../models/bookingSchema");
// create or register a new appointment of a user 
const createAppointment = async (req,res) =>{
    try{
        const {appointmentType, date, slot, query} = req.body;
        if (!req.user){
            return res.status(401).json({message: "Unauthorized"});
        }

        const newAppointment = new Appointment ({
            user : req.user.id,
            appointmentType,
            date: new Date(date).toISOString(), 
            slot, 
            query,
        });

        await newAppointment.save();

        res.status(201).json({
            success:true,
            message: "Appointment Booked Successfully",
            data: newAppointment,
        });
    } catch (error){
        res.status(500).json({success:false, message: error.message});
    }
}
const getUpcomingAppointments = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const appointments = await Appointment.find({ user: req.user.id }).sort({ date: 1 });

        console.log("Fetched Appointments:", appointments); // 🛠 Debugging log

        res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// delete the appointment of a user 
const deleteAppointment = async(req , res) =>{
    try{
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const appointment = await Appointment.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!appointment){
            return res.status(404).json ({message: "Appointment not found"});
        }

        if (appointment.user.toString() != req.user.id){
            res.status(403).json({message: "not authorized"});
        }

        res.status(200).json({
            success: true,
            message: "Appointment Deleted"
        });
    }catch  (error){
        res.status(500).json ({success: false, message: error.message});
    }
};

module.exports = {
    createAppointment, 
  
    deleteAppointment, 
    getUpcomingAppointments
};