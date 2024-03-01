async function markAttendance() {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('user-password').value;

    try {
        const response = await fetch('/attendance', { // Sending POST request to /attendance endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, password })
        });

        if (response.ok) {
            alert('Attendance marked successfully!');
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error marking attendance:', error.message);
        alert('Error marking attendance. Please try again later.');
    }
}

    function chooseRole() {
       var userType = document.getElementById('userType').value;

        // Hide the landing page
        document.getElementById('landingPage').style.display = 'none';

        // Redirect to the appropriate page based on the selected user type
        if (userType === 'student') {
            window.location.href = 'student.html';  // Replace with the actual filename of your student page
        } else if (userType === 'teacher') {
            window.location.href = 'teacher.html';  // Replace with the actual filename of your teacher page
        }
    }
    
    // Additional functions for handling login and specific user pages
    // You can implement the login logic and navigate to student/teacher pages based on authentication.




function toggleDarkMode() {
    var body = document.getElementById('body');
    body.classList.toggle('dark-mode');
}
