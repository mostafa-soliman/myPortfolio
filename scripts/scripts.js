let nav_label = document.getElementById("modes");
let nav_icon = document.getElementById("frnt_awsme");
let body_mode = document.getElementsByTagName("body")[0];
let toggle_btn = document.getElementById("light_dark_mode");
let img_src = document.getElementsByClassName("my_logo")[0];
// let closMenu = document.querySelectorAll("#mainmenu .container nav a");
// let menuControl = document.getElementById("menuControl");
// let nav = document.querySelector("#mainmenu .container nav ");

let checked = false;

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

// add and remove active in navbar

function activateNavItem(element) {
  let navItems = document.querySelectorAll("nav a");
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  element.classList.add("active");
}
// // إغلاق القائمة المنبثقة عند النقر خارجها
// document.addEventListener("click", function (event) {
//   if (menuControl.checked && !event.target.matches("#menuControl")) {
//     menuControl.checked = false;
//     closeBurgerMenu();
//   }
// });

// // تنفيذ الأمر المحدد وإغلاق القائمة المنبثقة عند النقر على رابط داخل القائمة
// const menuLinks = document.querySelectorAll("#mainmenu .container nav a");
// menuLinks.forEach(function (link) {
//   link.addEventListener("click", function (event) {
//     event.preventDefault(); // لمنع الانتقال إلى الصفحة الجديدة
//     // تنفيذ الأمر المطلوب عند النقر على الرابط هنا
//     closeBurgerMenu();
//   });
// });

// closMenu.forEach((elem) => {
//   elem.addEventListener("click", closeBurgerMenu);
// });

// function closeBurgerMenu() {
//   if (window.innerWidth < 992) {
//     nav.style.display = "none";
//     menuControl.checked = false;
//   } else {
//     nav.style.display = "block";
//     menuControl.checked = true;
//   }
// }
//
