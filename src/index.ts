import { addCursor, setStyles } from "./utils";
import { TweenLite } from "gsap";

interface CProps {
  name?: string;
  radius?: number;
}

const defaultProps: CProps = {
  name: "Title",
  radius: 10,
};

const contextCursor = (props: CProps = defaultProps) => {
  document.body.requestPointerLock();
  setStyles();
  const cCursor = addCursor(props.radius);
  let interactElements: NodeListOf<Element>;

  window.onload = () => {
    interactElements = document.querySelectorAll("[data-ccursor]");
    let isHovered = false;

    const moveCursor = (e: globalThis.MouseEvent) => {
      // console.log(e.clientX - props.radius / 2);
      if (!isHovered) {
        TweenLite.to(cCursor, 0.2, {
          x: e.clientX - props.radius / 2,
          y: e.clientY - props.radius / 2,
        });
      }
    };

    const handleMouseOver = (e: globalThis.MouseEvent) => {
      const cursorTarget = e.target as HTMLElement;
      isHovered = true;
      TweenLite.to(cCursor, 0.2, {
        x: cursorTarget.getBoundingClientRect().left,
        y: cursorTarget.getBoundingClientRect().top,
        borderRadius: window.getComputedStyle(cursorTarget).borderRadius,
        width: cursorTarget.clientWidth,
        height: cursorTarget.clientHeight,
      });
    };

    const handleMouseOut = (e: Event) => {
      isHovered = false;
      TweenLite.to(cCursor, 0.2, {
        width: props.radius,
        height: props.radius,
      });
    };

    document.addEventListener("mousemove", (e) => {
      moveCursor(e);
    });

    interactElements.forEach((item) => {
      item.addEventListener("mouseover", (e) => {
        handleMouseOver(e as globalThis.MouseEvent);
      });
    });

    interactElements.forEach((item) => {
      item.addEventListener("mouseout", (e) => {
        handleMouseOut(e as globalThis.MouseEvent);
      });
    });
  };

  console.log(`Hedco ${props.name}`);
};

export default contextCursor;
