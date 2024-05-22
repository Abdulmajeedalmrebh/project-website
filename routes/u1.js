const express = require('express');
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Course = require("../models/Course");
const router = express.Router();

router.get('/u1.ejs', async (req, res) => {
    const date = req.query.date || new Date().toISOString().slice(0, 10);
    const course_id = req.query.course_id;

    try {
        // Fetch the course to get the list of enrolled students
        const course = await Course.findOne({ course_id });
        if (!course) {
            return res.status(404).send("Course not found");
        }

        // Fetch students who are enrolled in the course
        const studentIds = course.students.map(student => student.id);
        const students = await Student.find({ id: { $in: studentIds } });

        // Fetch attendance for the given date and course
        const attendance = await Attendance.findOne({ date, course_id });

        res.render("u1", { students, attendance, date, course_id });
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.status(500).send("Error fetching attendance data");
    }
});

router.post('/submitAttendance', async (req, res) => {
    const { date, attendance, course_id } = req.body;
    console.log("Received attendance data:", req.body);
    
    if (!attendance || typeof attendance !== 'object') {
        console.error("Invalid attendance data format");
        return res.status(400).send("Invalid attendance data");
    }

    try {
        const attendanceRecords = Object.values(attendance).map(record => ({
            student_id: record.student_id,
            status: record.status === 'present' ? 'present' : 'absent'
        }));

        console.log("Processed attendance records:", attendanceRecords);

        const existingAttendance = await Attendance.findOne({ date, course_id });
        if (existingAttendance) {
            existingAttendance.attendance_list = attendanceRecords;
            await existingAttendance.save();
            console.log("Updated existing attendance record for date:", date);
        } else {
            await Attendance.create({ date, course_id, attendance_list: attendanceRecords });
            console.log("Created new attendance record for date:", date);
        }

        // Redirect back to the teacher page
        res.redirect(`/teacher`);
    } catch (error) {
        console.error("Error updating attendance:", error);
        res.status(500).send("Error updating attendance");
    }
});

module.exports = router;
