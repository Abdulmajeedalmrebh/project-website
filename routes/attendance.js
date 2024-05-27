const express = require('express');
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const router = express.Router();

router.post('/attendance/:studentId', async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const student = await Student.findOne({ id: studentId });
        if (!student) {
            return res.status(404).send("Student not found with ID: " + studentId);
        }

        const date = new Date().toISOString().slice(0, 10);
        const attendanceRecord = await Attendance.findOne({ date, 'attendance_list.student_id': studentId });

        if (attendanceRecord) {
            let studentAttendance = attendanceRecord.attendance_list.find(att => att.student_id === studentId);
            if (studentAttendance) {
                studentAttendance.status = 'present';
            } else {
                attendanceRecord.attendance_list.push({ student_id: studentId, status: 'present' });
            }
            await attendanceRecord.save();
        } else {
            await Attendance.create({
                date,
                teacher_id: "default_teacher_id", // Consider environment variables
                course_id: "default_course_id",
                attendance_list: [{ student_id: studentId, status: 'present' }]
            });
        }

        res.status(200).send("Attendance recorded successfully for student ID: " + studentId);
    } catch (error) {
        console.error("Error recording attendance:", error);
        res.status(500).send("Internal Server Error due to: " + error.message);
    }
});



module.exports = router;
