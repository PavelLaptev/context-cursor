import { addCursor, setStyles } from "./utils";
import { contextMode } from "./modes";
import propNames from "./propNames";

const contextCursor = (props?: CProps) => {
  props = {
    context: {
      radius: props.context.radius || 20,
      name: props.context.name || "hello",
    },
  };

  setStyles();
  const cCursor = addCursor(props);
  let interactElements: NodeListOf<Element>;

  window.onload = () => {
    interactElements = document.querySelectorAll(`[${propNames.dataAttr}]`);

    contextMode(cCursor, props, interactElements);
  };

  console.log(props.context.name);
};

export default contextCursor;
