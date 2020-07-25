const addCursor = (radius: number) => {
  const contextCursor = document.createElement("div");
  contextCursor.setAttribute(
    "style",
    `width: ${radius}px; height: ${radius}px;`
  );
  contextCursor.setAttribute("class", "c-cursor");
  document.body.prepend(contextCursor);
  return contextCursor;
};

export default addCursor;
