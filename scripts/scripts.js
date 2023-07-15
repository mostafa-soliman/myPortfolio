let nav_label = document.getElementById("modes");
let nav_icon = document.getElementById("frnt_awsme");
let body_mode = document.getElementsByTagName("body")[0];
let toggle_btn = document.getElementById("light_dark_mode");
let img_src = document.getElementsByClassName("my_logo")[0];
// let closMenu = document.querySelectorAll("#mainmenu .container nav a");
// let menuControl = document.getElementById("menuControl");
// let nav = document.querySelector("#mainmenu .container nav ");

let checked_mode = false;

function toggleCheckbox() {
  toggle_btn.checked = !toggle_btn.checked;
  toggleMode();
}
toggle_btn.addEventListener("change", toggleMode);
function toggleMode() {
  if (checked_mode === false) {
    nav_icon.className = "fa-solid fa-moon";
    body_mode.className = "dark";
    img_src.setAttribute("src", "./assets/images/logoDark.png");
    checked_mode = true;
    localStorage.setItem("darkMode", "true"); // حفظ وضع الظلام في localStorage
  } else {
    nav_icon.className = "fa-regular fa-moon";
    body_mode.className = "";
    img_src.setAttribute("src", "./assets/images/logoLight.png");

    checked_mode = false;
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

// function activateNavItem(element) {
//   let navItems = document.querySelectorAll("nav a");
//   navItems.forEach((item) => {
//     item.classList.remove("active");
//   });

//   element.classList.add("active");
// }

window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;

  let sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    let sectionTop = section.offsetTop;
    let sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      activateNavItem(section.id); // استدعاء الدالة مع تمرير معرف القسم
    }
  });
});

function activateNavItem(sectionId) {
  let navItems = document.querySelectorAll("nav a");
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  let targetNav = document.querySelector(`nav a[href="#${sectionId}"]`);
  targetNav.classList.add("active");
}

// window.addEventListener("scroll", function () {
//   let scrollPosition = window.scrollY;

//   let sections = document.querySelectorAll("section");
//   sections.forEach((section) => {
//     let sectionTop = section.offsetTop;
//     let sectionHeight = section.offsetHeight;

//     if (
//       scrollPosition >= sectionTop &&
//       scrollPosition < sectionTop + sectionHeight
//     ) {
//       // إزالة العناصر المفعلة من قائمة التنقل
//       let navItems = document.querySelectorAll("nav a");
//       navItems.forEach((item) => {
//         item.classList.remove("active");
//       });

//       // تفعيل العنصر المناسب في قائمة التنقل
//       let targetNav = document.querySelector(`nav a[href="#${section.id}"]`);
//       targetNav.classList.add("active");
//     }
//   });
// });

function addWowClass() {
  let wowClass1 = "wow";
  let wowClass2 = "rollIn";
  let duration = "2s";
  let offset = "20";
  let delay = ".5s";

  let elements = document.querySelectorAll("#sec3 .container a");
  let elements1 = document.querySelectorAll("#div_sec7 .container a");
  // sec3
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add(wowClass1);
    elements[i].classList.add(wowClass2);
    elements[i].setAttribute("data-wow-duration", duration);
    elements[i].setAttribute("data-wow-offset", offset);
    elements[i].setAttribute("data-wow-delay", delay);
  }
  // sec7
  for (let i = 0; i < elements1.length; i++) {
    elements1[i].classList.add(wowClass1);
    elements1[i].classList.add(wowClass2);
    elements1[i].setAttribute("data-wow-duration", duration);
    elements1[i].setAttribute("data-wow-offset", offset);
    elements1[i].setAttribute("data-wow-delay", delay);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  addWowClass();
});

// add copyright dynamic by js
let currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

// Closes the popup when you click outside it
document.addEventListener("click", function (event) {
  if (menuControl.checked && !event.target.matches("#menuControl")) {
    menuControl.checked = false;
    closeBurgerMenu();
  }
});

// Closes the popup when the is clicked <a></a>
let menuLinks = document.querySelectorAll("#mainmenu .container nav a");
menuLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    closeBurgerMenu();
  });
});

function closeBurgerMenu() {
  let menuControl = document.getElementById("menuControl");
  menuControl.checked = false;
}

// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault(); // Prevent form submission

//   const senderNameInput = document.querySelector("#text");
//   const senderEmailInput = document.querySelector("#email");
//   const subjectInput = document.querySelector("#title");
//   const messageInput = document.querySelector("#massage");

//   const senderName = senderNameInput.value;
//   const senderEmail = senderEmailInput.value;
//   const subject = subjectInput.value;
//   const message = messageInput.value;

//   const formData = new FormData();
//   formData.append("from", `${senderName} <${senderEmail}>`);
//   formData.append("to", "m.fadaly52@gmail.com");
//   formData.append("subject", subject);
//   formData.append("text", message);

//   fetch("https://api.mailgun.net/v3/your-domain.com/messages", {
//     method: "POST",
//     headers: {
//       Authorization:
//         "Basic " + btoa("api:" + "448894eb42c37dd6b6d4e6169789a6bc"),
//     },
//     body: formData,
//   })
//     .then((response) => {
//       if (response.ok) {
//         // Email sent successfully
//         console.log("Email sent!");
//         // You can add any success message or further actions here
//       } else {
//         // Handle error
//         console.log("Error sending email:", response.statusText);
//       }
//     })
//     .catch((error) => {
//       console.error("Error sending email:", error);
//     });

//   // Reset the form after submission
//   form.reset();
//   // Optionally, clear the input fields
//   senderNameInput.value = "";
//   senderEmailInput.value = "";
//   subjectInput.value = "";
//   messageInput.value = "";
// });
