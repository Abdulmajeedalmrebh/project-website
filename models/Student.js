const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Address Schema
const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zip: String
});


// Define Student Schema
const studentSchema = new Schema({
    id: String,
    name: String,
    age: Number,
    grade: String,
    class: String,
    address: addressSchema,
    phone: String,
    Password:String,
    Email:String

});

// Create Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
