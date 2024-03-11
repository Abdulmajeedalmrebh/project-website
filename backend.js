const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Attendance = require('./models/attendance'); // Importing Attendance model
const passportConfig = require('./passport-config');
const authenticationRoutes = require('./authenticationRoutes');

// Define the schema for the attendance model
const attendanceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true }
});

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/', authenticationRoutes);

mongoose.connect('mongodb://localhost:27017/attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
