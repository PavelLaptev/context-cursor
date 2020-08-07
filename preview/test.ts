import "./scss/styles.scss";
import contextCursor from "../src";

// Init context cursor
contextCursor();

// Darkmode
const darkmodeBtn = document.getElementById("darkmode-button");
const moonIcon = document.getElementById("moon-icon");

darkmodeBtn.addEventListener("click", (e) => {
  document.body.classList.toggle("darkmode");
  moonIcon.classList.toggle("moon-icon_active");
});
