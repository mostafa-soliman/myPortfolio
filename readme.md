# My Portfolio

This is a portfolio website showcasing the work and skills of Mostafa Fadali, a passionate software engineer specializing in front-end development, with a strong focus on Angular.

## Live Demo

You can access the live demo of the portfolio website at [https://my-portfolio-xi-gules-73.vercel.app/](https://my-portfolio-xi-gules-73.vercel.app/).

## Features and Functions

### HTML Structure

- The HTML structure follows best practices and uses semantic elements.
- The website is responsive and adjusts to different screen sizes using the meta viewport tag.
- Favicon is set using the provided image file.

### Styling

- The website uses external CSS files (`style.css`, `all.css`, `animate.css`) for styling.
- CSS classes are used to style different elements throughout the website.
- The website includes font awesome icons for various elements.

### Navigation

- The website has a responsive navigation menu.
- Clicking on a navigation link scrolls smoothly to the corresponding section.
- The active navigation link is highlighted when the corresponding section is in view.

### Dark/Light Mode

- The website includes a toggle button for switching between dark and light mode.
- When the dark mode is activated, the website's colors and logo change accordingly.
- The selected mode is stored in the browser's localStorage for persistence across page refreshes.

### Sections

- The website is divided into several sections (`sec1`, `sec2`, `sec3`, `sec4`, `sec5`) for different content.
- Each section includes relevant information and styling.

### Wow Animation Library

- The website uses the `wow.js` library to apply animations to elements.
- Animations are triggered as the user scrolls down the page.
- The `wow.js` library is included and initialized in the script.

### About Me Section

- The "About Me" section provides a brief introduction to Mostafa Fadali.
- It includes an image and a description of his skills and background.

### Skills Section

- The "Skills" section showcases Mostafa Fadali's skills using animated progress bars.
- Clicking on a skill opens a popup displaying the skill name and percentage.
- The popup is closed by clicking outside the content area.

#### Functions:

- `openPopup(skill, skillName, skillPercentage)`: Opens the skill popup with the provided skill details.
- `closePopup()`: Closes the skill popup.

### Projects Section

- The "Projects" section showcases Mostafa Fadali's featured projects.
- Each project includes an image, description, and buttons for live demo and source code.
- Clicking on the buttons opens the project's live demo or source code in a new tab.

### Contact Section

- The "Contact" section provides a form for users to send a message to Mostafa Fadali.
- It includes fields for name, email, title, and message.
- Clicking the "SEND" button submits the form (functionality not implemented in the provided code).
- There is also a "Hire Me" button that opens the default email application with Mostafa Fadali's email address.

#### Functions:

- `openpop_form()`: Opens the form submission popup (currently showing a "Coming Soon" message).
- `closePopup()`: Closes the form submission popup.

### Footer

- The footer includes an attribution section with Mostafa Fadali's name and a link to his LinkedIn profile.
- The current year is dynamically added using JavaScript.

### Miscellaneous

- The code includes event listeners and functions for various interactions and behaviors.
- The `toggleCheckbox()` function toggles the dark/light mode when the toggle button is clicked.
- The `toggleMode()` function changes the website's colors and logo based on the selected mode.
- The `window.addEventListener("load")` function checks and sets the dark mode based on the localStorage value.
- The `window.addEventListener("scroll")` function handles the navigation link highlighting based on the current section in view.
- The `addWowClass()` function adds the necessary classes for applying animations using the `wow.js` library.
- The `document.addEventListener("click")` function closes the navigation menu when clicking outside it.
- The `menuLinks` variable stores the navigation links and adds a click event listener to close the menu.
- The `closeBurgerMenu()` function closes the navigation menu when called.

## Author

This project, named "My Portfolio," was implemented by Mostafa Soliman Fadali. The project showcases the author's proficiency in HTML, CSS, and JavaScript, demonstrating their ability to create a responsive web page with interactive features.
