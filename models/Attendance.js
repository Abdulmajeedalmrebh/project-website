const mongoose = require('mongoose');

const attendanceListSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    }
});

const attendanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        required: true
    },
    attendance_list: [attendanceListSchema]
}, { strict: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
