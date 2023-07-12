let nav_label = document.getElementById("modes");
let nav_icon = document.getElementById("frnt_awsme");
let body_mode = document.getElementsByTagName("body")[0];
let toggle_btn = document.getElementById("light_dark_mode");

let checked = false;

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
    checked = true;
  } else {
    // nav_label.innerHTML = "Dark Mode";
    nav_icon.className = "fa-regular fa-moon";
    body_mode.className = "";

    checked = false;
  }
}
