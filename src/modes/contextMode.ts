import { TweenLite } from "gsap";
import { getMoveIndex, isElHasProperty } from "../utils";
import propNames from "../propNames";

const getStyleProp = (value: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(value);
};

const contextMode = (
  cursor: HTMLElement,
  props: CProps,
  interactElements: NodeListOf<Element>
) => {
  const parallaxSpeed = {
    cursor: props.parallaxIndex,
    target: props.parallaxIndex * 1.5,
  };
  let isHovered: boolean = false;
  let cursorTarget: HTMLElement = null;

  const moveCursor = (e: globalThis.MouseEvent) => {
    const borderRadius = Number(
      window.getComputedStyle(cursorTarget).borderRadius.slice(0, -2) as any
    );

    if (!isHovered) {
      TweenLite.to(cursor, props.transitionSpeed, {
        x: e.clientX - props.radius / 2,
        y: e.clientY - props.radius / 2,
      });
    } else {
      if (isElHasProperty(cursorTarget, propNames.lift)) {
        TweenLite.to(cursorTarget, props.transitionSpeed, {
          x: getMoveIndex(
            e.clientX,
            cursorTarget.offsetLeft,
            cursorTarget.clientWidth,
            parallaxSpeed.target
          ),
          y: getMoveIndex(
            e.clientY,
            cursorTarget.offsetTop,
            cursorTarget.clientHeight,
            parallaxSpeed.target
          ),
          scale: 1.1,
          boxShadow: getStyleProp("--ghost-shadow"),
        });
        TweenLite.to(cursor, props.transitionSpeed, {
          filter: "blur(8px)",
          x:
            cursorTarget.offsetLeft +
            getMoveIndex(
              e.clientX,
              cursorTarget.offsetLeft,
              cursorTarget.clientWidth,
              parallaxSpeed.target
            ),
          y:
            cursorTarget.offsetTop +
            getMoveIndex(
              e.clientY,
              cursorTarget.offsetTop,
              cursorTarget.clientHeight,
              parallaxSpeed.target
            ),
          scale: 1.1,
          backgroundColor: "rgba(0,0,0,0)",
          backgroundImage: `radial-gradient(circle at ${
            e.clientX - cursorTarget.offsetLeft
          }px ${
            e.clientY - cursorTarget.offsetTop
          }px, rgba(255,255,255,0.4), rgba(255,255,255,0))`,
        });
      } else {
        TweenLite.to(cursor, props.transitionSpeed, {
          x:
            cursorTarget.getBoundingClientRect().left -
            (isElHasProperty(cursorTarget, propNames.noPadding)
              ? null
              : props.hoverPadding) +
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
              : props.hoverPadding) +
            (isElHasProperty(cursorTarget, propNames.noParallax)
              ? 0
              : (e.clientY -
                  cursorTarget.offsetTop -
                  cursorTarget.clientHeight / 2) /
                parallaxSpeed.cursor),
          borderRadius:
            borderRadius *
            (isElHasProperty(cursorTarget, propNames.noPadding) ? 1 : 1.5),
          width:
            cursorTarget.clientWidth +
            (isElHasProperty(cursorTarget, propNames.noPadding)
              ? null
              : props.hoverPadding * 2),
          height:
            cursorTarget.clientHeight +
            (isElHasProperty(cursorTarget, propNames.noPadding)
              ? null
              : props.hoverPadding * 2),
          backgroundColor: getStyleProp("--main-cursor-hover-clr"),
        });
        if (!isElHasProperty(cursorTarget, propNames.noParallax)) {
          TweenLite.to(cursorTarget, props.transitionSpeed, {
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
    }
  };

  const handleMouseOver = (e: globalThis.MouseEvent) => {
    isHovered = true;
    cursorTarget = e.target as HTMLElement;
    const borderRadius = Number(
      window.getComputedStyle(cursorTarget).borderRadius.slice(0, -2) as any
    );

    cursor.classList.add("c-cursor_active");

    if (isElHasProperty(cursorTarget, propNames.lift)) {
      TweenLite.to(cursor, props.transitionSpeed, {
        borderRadius: borderRadius,
        width: cursorTarget.clientWidth,
        height: cursorTarget.clientHeight,
        scale: 1.1,
      });
      TweenLite.to(cursor, 0, {
        backgroundColor: "rgba(255,255,255,0)",
      });
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    isHovered = false;
    cursor.classList.remove("c-cursor_active");
    TweenLite.to(cursor, props.transitionSpeed, {
      width: props.radius,
      height: props.radius,
      backgroundColor: getStyleProp("--main-cursor-clr"),
      borderRadius: "100px",
      scale: 1,
      backgroundImage: "none",
      filter: "blur(0px)",
    });
    TweenLite.to(cursorTarget, props.transitionSpeed, {
      x: 0,
      y: 0,
      scale: 1,
      boxShadow: "0 7px 15px rgba(0,0,0,0.0)",
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
