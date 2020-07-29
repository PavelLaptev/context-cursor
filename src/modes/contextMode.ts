import { TweenLite } from "gsap";
import { getMoveIndex } from "../utils";
import propNames from "../propNames";

const contextMode = (
  cursor: HTMLElement,
  props: CProps,
  interactElements: NodeListOf<Element>
) => {
  let isHovered: boolean = false;
  let moveIndex = {
    left: 0,
    top: 0,
  };
  const padding: number = 12;
  let cursorTarget: HTMLElement = null;
  const parallaxSpeed = {
    cursor: 16,
    target: 20,
  };

  const moveCursor = (e: globalThis.MouseEvent) => {
    if (!isHovered) {
      TweenLite.to(cursor, 0.2, {
        x: e.clientX - props.context.radius / 2,
        y: e.clientY - props.context.radius / 2,
      });
    } else {
      TweenLite.to(cursor, 0.0, {
        left: getMoveIndex(
          e.clientX,
          cursorTarget.offsetLeft,
          cursorTarget.clientWidth,
          parallaxSpeed.cursor
        ),
        top: getMoveIndex(
          e.clientY,
          cursorTarget.offsetTop,
          cursorTarget.clientHeight,
          parallaxSpeed.cursor
        ),
      });
      TweenLite.to(cursorTarget, 0.2, {
        x: -getMoveIndex(
          e.clientX,
          cursorTarget.offsetLeft,
          cursorTarget.clientWidth,
          parallaxSpeed.target
        ),
        y: -getMoveIndex(
          e.clientY,
          cursorTarget.offsetTop,
          cursorTarget.clientHeight,
          parallaxSpeed.target
        ),
      });
    }
  };

  const handleMouseOver = (e: globalThis.MouseEvent) => {
    isHovered = true;
    cursorTarget = e.target as HTMLElement;
    const isNoPadding = cursorTarget
      .getAttribute(propNames.dataAttr)
      .includes(propNames.noPadding);
    const borderRadius = Number(
      window.getComputedStyle(cursorTarget).borderRadius.slice(0, -2) as any
    );

    TweenLite.to(cursor, 0.2, {
      x:
        cursorTarget.getBoundingClientRect().left -
        (isNoPadding ? null : padding / 2),
      y:
        cursorTarget.getBoundingClientRect().top -
        (isNoPadding ? null : padding / 2),
      borderRadius: borderRadius * (isNoPadding ? 1 : 1.5),
      width: cursorTarget.clientWidth + (isNoPadding ? null : padding),
      height: cursorTarget.clientHeight + (isNoPadding ? null : padding),
      backgroundColor: "var(--main-cursor-hover-clr)",
    });
  };

  const handleMouseOut = (e: MouseEvent) => {
    isHovered = false;
    moveIndex = {
      left: 0,
      top: 0,
    };
    TweenLite.to(cursor, 0.2, {
      width: props.context.radius,
      height: props.context.radius,
      backgroundColor: "var(--main-cursor-clr)",
      borderRadius: "100px",
      left: 0,
      top: 0,
    });
    TweenLite.to(cursorTarget, 0.2, {
      x: 0,
      y: 0,
    });
  };

  document.addEventListener("mousemove", (e) => {
    moveCursor(e);
  });

  interactElements.forEach((item) => {
    item.addEventListener("mouseenter", (e) => {
      handleMouseOver(e as globalThis.MouseEvent);
    });
  });

  interactElements.forEach((item) => {
    item.addEventListener("mouseleave", (e) => {
      handleMouseOut(e as globalThis.MouseEvent);
    });
  });
};

export default contextMode;
