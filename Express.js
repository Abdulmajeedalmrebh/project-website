// Import necessary modules
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define routes

// Route to serve the attendance.html page
app.get('/attendance.html', (req, res) => {
  // Assuming attendance.html is in the root directory
  res.sendFile(__dirname + '/attendance.html');
});

// Redirect route for /attendance.html to a different page (e.g., dashboard)
app.get('/attendance.html', (req, res) => {
  res.redirect('/dashboard'); // Replace '/dashboard' with the desired redirect destination
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
