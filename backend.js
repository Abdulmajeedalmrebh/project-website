const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Attendance = require('./models/attendance');
const passportConfig = require('./passport-config');
const authenticationRoutes = require('./authenticationRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/', authenticationRoutes);

// Replace <password> with your actual password
const uri = "mongodb+srv://karmrm07:<password>@wristband.xzthvrh.mongodb.net/?retryWrites=true&w=majority&appName=wristband";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.get('/attendance', async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/attendance', async (req, res) => {
  const { userId, date, status } = req.body;
  try {
    if (!userId || !date || !status) {
      return res.status(400).json({ error: 'User ID, date, and status are required' });
    }

    if (typeof userId !== 'string' || userId.length !== 5) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    if (status !== 'present' && status !== 'absent') {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const newAttendance = new Attendance({ userId, date, status });
    await newAttendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});
// Update an attendance record
app.put('/attendance/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, date, status } = req.body;
  try {
    // Find the attendance record by ID and update it
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, { userId, date, status }, { new: true });
    res.json(updatedAttendance);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// Delete an attendance record
app.delete('/attendance/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the attendance record by ID and delete it
    await Attendance.findByIdAndDelete(id);
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
