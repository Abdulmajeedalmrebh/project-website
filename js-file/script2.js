// script2.js

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
  }
}

// script2.js

// Function to update attendance marks in the table
function updateAttendanceMarks(response) {
  var attendanceData = response.attendanceData;
  var tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';
  attendanceData.forEach(function(data) {
      var studentName = data.Name;
      var isPresent = data.State;
      var tableRow = document.createElement('tr');
      var nameCell = document.createElement('td');
      var statusCell = document.createElement('td');
      nameCell.textContent = studentName;
      statusCell.textContent = isPresent ? 'Present' : 'Absent';
      tableRow.appendChild(nameCell);
      tableRow.appendChild(statusCell);
      tableBody.appendChild(tableRow);
  });
}

// script2.js

// script2.js

// script2.js

console.log("Script2 loaded successfully");

function submitAttendance() {
  console.log("Submit button clicked");
  var checkboxes = document.querySelectorAll('input[name="attendance[]"]');
  var attendanceData = [];
  checkboxes.forEach(function(checkbox) {
      attendanceData.push({
          id: checkbox.value,
          present: checkbox.checked
      });
  });

  console.log("Attendance Data:", attendanceData);

  // Using AJAX to send attendance data to the server
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/submitAttendance", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ attendance: attendanceData }));

  // Handle response from the server if needed
  xhr.onload = function() {
      if (xhr.status === 200) {
          console.log(xhr.responseText);
          // Reload the page to update attendance marks
          window.location.reload();
      }
  };
}


