// backend.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Attendance = require('./models/attendance');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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
