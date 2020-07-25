const styles = require("../styles/styles.scss");

const setStyles = () => {
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

export default setStyles;
