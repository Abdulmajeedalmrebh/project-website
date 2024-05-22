const student = require("./models/Student");
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
function submitAttendance() {
  var checkboxes = document.querySelectorAll('input[name^="attendance"]');
  var attendanceData = {};
  checkboxes.forEach(function (checkbox) {
      var studentId = checkbox.name.match(/\[(.*?)\]/)[1];
      if (!attendanceData[studentId]) {
          attendanceData[studentId] = { student_id: studentId, status: 'absent' };
      }
      if (checkbox.checked) {
          attendanceData[studentId].status = 'present';
      }
  });

  // Using AJAX to send attendance data to the server
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/submitAttendance", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ attendance: Object.values(attendanceData) }));

  // Handle response from the server if needed
  xhr.onload = function () {
      if (xhr.status === 200) {
          console.log(xhr.responseText);
          // Reload the page to update attendance marks
          window.location.reload();
      }
  };
}
