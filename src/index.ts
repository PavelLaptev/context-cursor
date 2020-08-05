import { addCursor, setStyles } from "./utils";
import contextMode from "./modes/contextMode";
import propNames from "./propNames";

const contextCursor = (props: CProps = {}) => {
  props = {
    radius: props.radius || 20,
    transitionSpeed: props.transitionSpeed || 0.2,
    parallaxIndex: props.parallaxIndex || 8,
    hoverPadding: props.hoverPadding || 6,
  };

  setStyles();
  const cCursor = addCursor(props) as HTMLElement;
  let interactElements: NodeListOf<Element>;

  window.onload = () => {
    interactElements = document.querySelectorAll(`[${propNames.dataAttr}]`);

    contextMode(cCursor, props, interactElements);
  };
};

export default contextCursor;
