// Import necessary modules
const express = require('express');
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express();
const PORT = process.env.PORT || 5500;

// Serve static files (including attendance.html)
app.use(express.static(__dirname));

// Define a route to fetch attendance data from the backend API
app.get('/attendance-data', async (req, res) => {
  try {
    // Make a GET request to your backend API endpoint to fetch attendance data
    const response = await axios.get('/index.js');
    
    // Extract attendance data from the response
    const attendanceData = response.data;

    // Send the attendance data as a JSON response
    res.json(attendanceData);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ error: 'Failed to fetch attendance data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
