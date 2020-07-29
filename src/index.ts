import { addCursor, setStyles } from "./utils";
import { contextMode } from "./modes";
import propNames from "./propNames";

const contextCursor = (props?: CProps) => {
  props = {
    radius: props.radius || 20,
    name: props.name || "hello",
    parallaxIndex: props.parallaxIndex || 16,
  };

  setStyles();
  const cCursor = addCursor(props);
  let interactElements: NodeListOf<Element>;

  window.onload = () => {
    interactElements = document.querySelectorAll(`[${propNames.dataAttr}]`);

    contextMode(cCursor, props, interactElements);
  };

  console.log(props.name);
};

export default contextCursor;
