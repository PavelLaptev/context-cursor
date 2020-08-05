const getStyleProp = (value: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(value);
};

export default getStyleProp;
