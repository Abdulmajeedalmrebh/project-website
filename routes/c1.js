const express = require('express');
const Student = require('../models/Student'); // Ensure this path is correct for your setup
const Attendance = require("../models/Attendance");
const router = express.Router();

router.get("/c1", (req, res) => {
    res.render("c1");
});


router.post('/mark-attendance', async (req, res) => {
    const { minor } = req.body;
    console.log("Received minor:", minor);  // Log received data

    try {
        const student = await Student.findOne({ id: minor });

        if (student) {
            // Update the student's attendance status
            student.present = true;
            await student.save();

            // Also update the attendance record if needed
            const attendanceRecord = await Attendance.findOneAndUpdate(
                { date: new Date().toISOString().slice(0, 10), "attendance_list.student_id": student.id },
                { $set: { "attendance_list.$.status": 'present' } },
                { new: true }
            );

            if (attendanceRecord) {
                res.send(`Attendance marked for student with ID: ${student.id}`);
            } else {
                res.status(404).send('Attendance record not found.');
            }
        } else {
            res.status(404).send('Student not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error marking attendance.');
    }
});

module.exports = router;

