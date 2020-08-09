import propNames from "../propNames";

const isElHasProperty = (el: HTMLElement, property: string) => {
  if (el.getAttribute(propNames.dataAttr).includes(property)) {
    return true;
  } else {
    return false;
  }
};

export default isElHasProperty;
