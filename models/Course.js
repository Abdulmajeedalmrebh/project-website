const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Student Subdocument Schema
const studentSchema = new Schema({
    id: String,
    name: String
});

// Define Teacher Subdocument Schema
const teacherSchema = new Schema({
    id: String,
    name: String
});

// Define Course Schema
const courseSchema = new Schema({
    course_id: String,
    course_name: String,
    teacher: teacherSchema,
    students: [studentSchema]
});

// Create Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
