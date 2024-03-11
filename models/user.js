// models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Add any additional fields as needed
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);