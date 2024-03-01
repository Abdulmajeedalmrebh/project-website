// models/attendance.js

const mongoose = require('mongoose');

// Define the schema for the attendance model
const attendanceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true }
});

// Create and export the Attendance model
module.exports = mongoose.model('Attendance', attendanceSchema);
