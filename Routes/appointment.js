const express = require("express");
const { 
    createAppointment, 
    deleteAppointment,
    getUpcomingAppointments 
} = require("../Controllers/appointmentController");

const { authenticate, restrict } = require("../auth/verifyToken"); // Ensure correct middleware import

const router = express.Router();

router.post("/", authenticate, restrict, createAppointment);
router.get("/upcoming", authenticate, restrict, getUpcomingAppointments);
router.delete("appointments/:id", authenticate, restrict, deleteAppointment);

module.exports = router;
