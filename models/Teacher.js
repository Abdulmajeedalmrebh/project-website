const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Address Schema
const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zip: String
});

// Define Teacher Schema
const teacherSchema = new Schema({
    id: String,
    name: String,
    age: Number,
    subject: String,
    address: addressSchema,
    phone: String,
    Email: String,
    Password: String
});

// Create Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
