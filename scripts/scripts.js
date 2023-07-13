let nav_label = document.getElementById("modes");
let nav_icon = document.getElementById("frnt_awsme");
let body_mode = document.getElementsByTagName("body")[0];
let toggle_btn = document.getElementById("light_dark_mode");
let img_src = document.getElementsByClassName("my_logo")[0];
let checked = false;
// img_src.setAttribute("src", "./assets/images/logoLight.png");

// let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

// function saveTasks() {
//   localStorage.setItem("darkMode", JSON.stringify(darkMode));
// }

function toggleCheckbox() {
  toggle_btn.checked = !toggle_btn.checked;
  toggleMode();
}
toggle_btn.addEventListener("change", toggleMode);
function toggleMode() {
  if (checked === false) {
    nav_icon.className = "fa-solid fa-moon";
    body_mode.className = "dark";
    img_src.setAttribute("src", "./assets/images/logoDark.png");
    checked = true;
    localStorage.setItem("darkMode", "true"); // حفظ وضع الظلام في localStorage
  } else {
    nav_icon.className = "fa-regular fa-moon";
    body_mode.className = "";
    img_src.setAttribute("src", "./assets/images/logoLight.png");

    checked = false;
    localStorage.setItem("darkMode", "false"); // حفظ وضع النور في localStorage
  }
  // saveTasks();
}

window.addEventListener("load", function () {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "true") {
    toggleCheckbox();
  }
});
// popup

function openPopup(skill, skillName, skillPercentage) {
  document.getElementById("popupTitle").textContent = skillName;
  document.getElementById("popupProgressBar").style.width =
    skillPercentage + "%";
  document.getElementById("popupProgressBar").textContent =
    skillPercentage + "%";
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
