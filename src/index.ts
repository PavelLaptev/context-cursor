const styles = require("./styles/styles.scss");

const contextCursor = (name: string) => {
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  document.addEventListener("DOMContentLoaded", (event) => {
    console.log(document.querySelectorAll("[data-ccursor]"));
  });

  console.log(`Helldcso ${name}`);
};

export default contextCursor;
