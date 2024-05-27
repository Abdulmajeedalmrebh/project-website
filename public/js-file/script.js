// Get references to the sign-up and sign-in buttons and the container element
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// Add event listener to the sign-up button
signUpButton.addEventListener("click", () => {
    // Add the 'right-panel-active' class to the container to activate the right panel animation
    container.classList.add("right-panel-active");
});

// Add event listener to the sign-in button
signInButton.addEventListener("click", () => {
    // Remove the 'right-panel-active' class from the container to deactivate the right panel animation
    container.classList.remove("right-panel-active");
});

function prepareAttendanceForm() {
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
        if (!checkbox.checked) {
            checkbox.checked = true;
            checkbox.value = 'absent';
        }
    });
}

document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('/logout', {
        method: 'GET',
        credentials: 'same-origin'
    }).then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    });

    // Clear browser history
    history.pushState(null, null, '/login');
    window.addEventListener('popstate', function(event) {
        history.pushState(null, null, '/login');
    });
});