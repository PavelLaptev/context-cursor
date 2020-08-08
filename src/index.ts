import { addCursor, setStyles } from "./chunks";
import contextMode from "./modes/contextMode";
import propNames from "./propNames";

const contextCursor = (props: CProps = {}) => {
  // Default props
  props = {
    radius: props.radius || 20,
    transitionSpeed: props.transitionSpeed || 0.2,
    parallaxIndex: props.parallaxIndex || 10,
    hoverPadding: props.hoverPadding || 6,
  };

  // Set base
  setStyles();
  const cCursor = addCursor(props) as HTMLElement;

  // Load mode when page is loaded
  window.onload = () => {
    let interactElements = document.querySelectorAll(
      `[${propNames.dataAttr}]`
    ) as NodeListOf<Element>;
    contextMode(cCursor, props, interactElements);
  };
};

export default contextCursor;
