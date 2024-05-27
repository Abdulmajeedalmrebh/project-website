const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const app = express();
const port = 4000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const u1Routes = require('./routes/u1');
const attendanceRoutes = require('./routes/attendance');  // Import the attendance routes
const c1Routes = require('./routes/c1');  // Import the c1 routes

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', studentRoutes);
app.use('/', teacherRoutes);
app.use('/', u1Routes);
app.use('/', attendanceRoutes);  // Use the attendance routes under the '/api' path
app.use('/', c1Routes);  // Use the c1 routes

// Sample route to test the setup
app.get('/api/data', (req, res) => {
    res.send('Data received');
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://gintaku07:o44kv0e1Awst9GBg@wristband.yxyzveb.mongodb.net/?retryWrites=true&w=majority&appName=Wristband')
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });
    

module.exports = app;
