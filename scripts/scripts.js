let nav_label = document.getElementById("modes");
let nav_icon = document.getElementById("frnt_awsme");
let body_mode = document.getElementsByTagName("body")[0];
let toggle_btn = document.getElementById("light_dark_mode");
let img_src = document.getElementsByClassName("my_logo")[0];
let checked = false;
img_src.setAttribute("src", "./assets/images/logoLight.png");

function toggleCheckbox() {
  toggle_btn.checked = !toggle_btn.checked;
  toggleMode();
}
toggle_btn.addEventListener("change", toggleMode);
function toggleMode() {
  if (checked === false) {
    // nav_label.innerHTML = "Dark Mode";
    nav_icon.className = "fa-solid fa-moon";
    body_mode.className = "dark";
    img_src.setAttribute("src", "./assets/images/logoDark.png");
    checked = true;
  } else {
    // nav_label.innerHTML = "Dark Mode";
    nav_icon.className = "fa-regular fa-moon";
    body_mode.className = "";
    img_src.setAttribute("src", "./assets/images/logoLight.png");

    checked = false;
  }
}

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
