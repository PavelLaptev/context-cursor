const addCursor = (props: CProps) => {
  if (props.context) {
    const contextCursor = document.createElement("div");
    contextCursor.setAttribute(
      "style",
      `width: ${props.context.radius}px; height: ${props.context.radius}px;`
    );
    contextCursor.setAttribute("class", "c-cursor");
    document.body.prepend(contextCursor);
    return contextCursor;
  }
};

export default addCursor;
