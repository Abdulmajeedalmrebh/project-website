const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});
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