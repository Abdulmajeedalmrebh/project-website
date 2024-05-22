const express = require('express');
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Course = require("../models/Course");
const router = express.Router();

router.get("/student", async (req, res) => {
    try {
        const student = await Student.findOne({ Email: req.session.email });
        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Fetch the courses the student is enrolled in
        const courses = await Course.find({ 'students.id': student.id });

        // Fetch the attendance data for the student
        const attendanceRecords = await Attendance.find({ 'attendance_list.student_id': student.id });

        // Map attendance records to a simpler format for easier rendering
        const attendance = attendanceRecords.map(record => {
            const studentAttendance = record.attendance_list.find(att => att.student_id.toString() === student.id.toString());
            return {
                date: record.date,
                status: studentAttendance ? studentAttendance.status : 'absent'
            };
        });

        res.render("student", { student, courses, attendance });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
