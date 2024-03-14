// Function to handle user role selection and redirection
function chooseRole() {
    var userType = document.getElementById('userType').value;

    // Hide the landing page
    document.getElementById('landingPage').style.display = 'none';

    // Redirect to the appropriate page based on the selected user type
    if (userType === 'student') {
        window.location.href = 'student.html'; // Replace with the actual filename of your student page
    } else if (userType === 'teacher') {
        window.location.href = 'teacher.html'; // Replace with the actual filename of your teacher page
    }
}

// Simulated attendance data (replace with actual data or API call)
var attendanceData = [
    { date: '2022-03-01', status: 'Present' },
    { date: '2022-03-05', status: 'Absent' },
    { date: '2022-03-10', status: 'Present' },
    // ... Add more data as needed
];

// Function to view attendance
function viewAttendance() {
    // Assuming you have a function or API call to fetch attendance data
    var attendanceData = fetchAttendanceData(); // Replace with actual implementation

    // Display the attendance data
    displayContent('<h3>Attendance</h3>' + attendanceData);
}

// Function to view marks
function viewMarks() {
    // Assuming you have a function or API call to fetch marks data
    var marksData = fetchMarksData(); // Replace with actual implementation

    // Display the marks data
    displayContent('<h3>Marks</h3>' + marksData);
}
// Function to fetch attendance data from the backend
function fetchAttendanceData() {
    // Make an AJAX GET request to fetch attendance data from the backend
    fetch('/attendance')
        .then(response => response.json())
        .then(data => {
            // Display the fetched attendance data
            displayAttendance(data);
        })
        .catch(error => {
            console.error('Error fetching attendance data:', error);
        });
}

// Function to display attendance data
function displayAttendance(attendanceData) {
    var attendanceContent = '<h3>Attendance Sheet</h3>';
    attendanceContent += '<table>';
    attendanceContent += '<tr><th>Date</th><th>Status</th></tr>';

    attendanceData.forEach(function (entry) {
        attendanceContent += `<tr><td>${entry.date}</td><td>${entry.status}</td></tr>`;
    });

    attendanceContent += '</table>';

    document.getElementById('attendanceContent').innerHTML = attendanceContent;
}

// Function to handle user role selection and redirection
function chooseRole() {
    var userType = document.getElementById('userType').value;

    // Hide the landing page
    document.getElementById('landingPage').style.display = 'none';

    // Redirect to the appropriate page based on the selected user type
    if (userType === 'student') {
        window.location.href = 'student.html'; // Replace with the actual filename of your student page
    } else if (userType === 'teacher') {
        window.location.href = 'teacher.html'; // Replace with the actual filename of your teacher page
    }
}

// Initially fetch attendance data when the page loads
window.onload = function () {
    fetchAttendanceData();
};

// Other functions remain unchanged...

// Function to display content
function displayContent(content) {
    document.getElementById('content').innerHTML = content;
}

// Function to display attendance sheet
function displayAttendance() {
    var attendanceContent = '<h3>Attendance Sheet</h3>';
    attendanceContent += '<table>';
    attendanceContent += '<tr><th>Date</th><th>Status</th></tr>';

    attendanceData.forEach(function (entry) {
        attendanceContent += `<tr><td>${entry.date}</td><td>${entry.status}</td></tr>`;
    });

    attendanceContent += '</table>';

    document.getElementById('attendanceContent').innerHTML = attendanceContent;
    window.location.href = 'attendance.html';
}

// Function to go back to the student page
function goBack() {
    // Redirect back to the student page
    window.location.href = 'student.html';
}



// Initially display attendance when the page loads
window.onload = function () {
    displayAttendance();
};

// Function to toggle dark mode
function toggle() {
    var body = document.getElementById('body');
    body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    var isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode.toString());
}

// Function to toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("user-password");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye-slash");
    this.classList.toggle("bi-eye");
});

// Prevent form submission
const form = document.querySelector("#attendance-form form");
form.addEventListener('submit', function (e) {
    e.preventDefault();
});

