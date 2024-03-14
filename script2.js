// Fetch attendance data from backend API
fetch('/attendance')
  .then(response => response.json())
  .then(data => {
    // Handle fetched attendance data
    console.log(data);
    // Update the attendance table in your student.html using the fetched data
    updateAttendanceTable(data);
  })
  .catch(error => console.error('Error fetching attendance data:', error));

// Function to update the attendance table in student.html
function updateAttendanceTable(data) {
  const tableBody = document.getElementById('attendanceTableBody');
  tableBody.innerHTML = ''; // Clear existing table rows
  data.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.userId}</td>
      <td>${entry.date}</td>
      <td>${entry.status}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to add new attendance record
function addAttendance(userId, date, status) {
  // Validate the data before sending the request
  if (!userId || !date || !status) {
    console.error('User ID, date, and status are required');
    return;
  }

  // Make a POST request to add the attendance record
  fetch('/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, date, status })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add attendance record');
    }
    console.log('Attendance record added successfully');
    // Refresh the attendance data after adding a new record
    fetchAttendanceData();
  })
  .catch(error => console.error('Error adding attendance record:', error));
}

// Example usage:
// Replace the parameters with actual data obtained from user input or elsewhere
addAttendance('01', '03-24-22', 'present');
