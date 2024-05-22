const express = require('express');
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Attendance = require("../models/Attendance");
const Course = require("../models/Course");
const router = express.Router();

router.get("/teacher", async (req, res) => {
    try {
        if (!req.session.email || req.session.role !== 'teacher') {
            return res.status(403).send("Access denied");
        }

        const teacher = await Teacher.findOne({ Email: req.session.email });
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        const courses = await Course.find({ "teacher.id": teacher.id });
        const studentIds = courses.flatMap(course => course.students.map(student => student.id));
        const students = await Student.find({ id: { $in: studentIds } });
        const attendanceList = await Attendance.find({ teacher_id: teacher.id });

        res.render("teacher", { teacher, courses, students, attendanceList });
    } catch (error) {
        console.error("Error fetching teacher data:", error);
        res.status(500).send("Error fetching teacher data");
    }
});

router.post("/addAttendance", async (req, res) => {
    const { date, attendance, course_id } = req.body;

    try {
        const teacher = await Teacher.findOne({ Email: req.session.email });
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        const attendanceRecords = Object.values(attendance).map(record => ({
            student_id: record.student_id,
            status: record.status === 'present' ? 'present' : 'absent'
        }));

        await Attendance.create({
            date,
            teacher_id: teacher.id,
            course_id,
            attendance_list: attendanceRecords
        });

        res.redirect("/teacher");
    } catch (error) {
        console.error("Error adding new attendance:", error);
        res.status(500).send("Error adding new attendance");
    }
});

module.exports = router;
