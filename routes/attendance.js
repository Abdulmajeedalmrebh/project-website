const express = require('express');
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const router = express.Router();

router.post('/api/attendance', async (req, res) => {
    const { major, minor } = req.body;

    try {
        const student = await Student.findOne({ id: minor });
        if (!student) {
            return res.status(404).send("Student not found");
        }

        const date = new Date().toISOString().slice(0, 10);
        const attendanceRecord = await Attendance.findOne({ date, 'attendance_list.student_id': minor });

        if (attendanceRecord) {
            // Update existing attendance
            const studentAttendance = attendanceRecord.attendance_list.find(att => att.student_id === minor);
            if (studentAttendance) {
                studentAttendance.status = 'present';
            } else {
                attendanceRecord.attendance_list.push({ student_id: minor, status: 'present' });
            }
            await attendanceRecord.save();
        } else {
            // Create new attendance record
            await Attendance.create({
                date,
                teacher_id: "default_teacher_id", // Update with the actual teacher ID or obtain from the context
                course_id: "default_course_id", // Update with the actual course ID or obtain from the context
                attendance_list: [{ student_id: minor, status: 'present' }]
            });
        }

        res.status(200).send("Attendance recorded successfully.");
    } catch (error) {
        console.error("Error recording attendance:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
