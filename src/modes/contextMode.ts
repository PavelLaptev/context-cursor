import { TweenLite } from "gsap";
import { getMoveIndex, isElHasProperty } from "../utils";
import propNames from "../propNames";

const contextMode = (
  cursor: HTMLElement,
  props: CProps,
  interactElements: NodeListOf<Element>
) => {
  let isHovered: boolean = false;
  const padding: number = 12;
  let cursorTarget: HTMLElement = null;
  const timeTransition = 0.2;
  const parallaxSpeed = {
    cursor: props.parallaxIndex,
    target: props.parallaxIndex * 1.5,
  };

  const moveCursor = (e: globalThis.MouseEvent) => {
    if (!isHovered) {
      TweenLite.to(cursor, timeTransition, {
        x: e.clientX - props.radius / 2,
        y: e.clientY - props.radius / 2,
      });
    } else {
      TweenLite.to(cursor, timeTransition, {
        x:
          cursorTarget.getBoundingClientRect().left -
          (isElHasProperty(cursorTarget, propNames.noPadding)
            ? null
            : padding / 2) +
          (isElHasProperty(cursorTarget, propNames.noParallax)
            ? 0
            : (e.clientX -
                cursorTarget.offsetLeft -
                cursorTarget.clientWidth / 2) /
              parallaxSpeed.cursor),
        y:
          cursorTarget.getBoundingClientRect().top -
          (isElHasProperty(cursorTarget, propNames.noPadding)
            ? null
            : padding / 2) +
          (isElHasProperty(cursorTarget, propNames.noParallax)
            ? 0
            : (e.clientY -
                cursorTarget.offsetTop -
                cursorTarget.clientHeight / 2) /
              parallaxSpeed.cursor),
      });
      if (!isElHasProperty(cursorTarget, propNames.noParallax)) {
        TweenLite.to(cursorTarget, timeTransition, {
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
    }
  };

  const handleMouseOver = (e: globalThis.MouseEvent) => {
    isHovered = true;
    cursorTarget = e.target as HTMLElement;
    const borderRadius = Number(
      window.getComputedStyle(cursorTarget).borderRadius.slice(0, -2) as any
    );

    cursor.classList.add("c-cursor_active");

    TweenLite.to(cursor, timeTransition, {
      borderRadius:
        borderRadius *
        (isElHasProperty(cursorTarget, propNames.noPadding) ? 1 : 1.5),
      width:
        cursorTarget.clientWidth +
        (isElHasProperty(cursorTarget, propNames.noPadding) ? null : padding),
      height:
        cursorTarget.clientHeight +
        (isElHasProperty(cursorTarget, propNames.noPadding) ? null : padding),
      backgroundColor: "var(--main-cursor-hover-clr)",
    });
  };

  const handleMouseOut = (e: MouseEvent) => {
    isHovered = false;
    cursor.classList.remove("c-cursor_active");
    TweenLite.to(cursor, timeTransition, {
      width: props.radius,
      height: props.radius,
      backgroundColor: "var(--main-cursor-clr)",
      borderRadius: "100px",
    });
    TweenLite.to(cursorTarget, timeTransition, {
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
