const addCursor = (props: CProps) => {
  if (props) {
    const contextCursor = document.createElement("div");
    contextCursor.setAttribute(
      "style",
      `width: ${props.radius}px; height: ${props.radius}px;`
    );
    contextCursor.setAttribute("class", "c-cursor");
    document.body.prepend(contextCursor);
    return contextCursor;
  }
};

export default addCursor;
