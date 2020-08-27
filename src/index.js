/* eslint-disable react/prop-types, react/display-name */
import {
  memo,
  useRef,
  forwardRef,
  createElement,
  useLayoutEffect,
  useImperativeHandle
} from "react";

const Dancer = memo(
  forwardRef((props, ref) => {
    console.log("render Dancer");
    const innerRef = useRef();

    useImperativeHandle(ref, () => ({
      setStyle: (style) => {
        if (!style) return;

        const keys = Object.keys(style);
        keys.forEach((key) => {
          innerRef.current.style[key] = style[key];
        });
      },
      setDuration: (duration = "0.2s") => {
        innerRef.current.style.transitionDuration = duration;
      },
      setTimingFunction: (timingFunction) => {
        if (!timingFunction) return;

        innerRef.current.style.transitionTimingFunction = timingFunction;
      },
      setDelay: (delay) => {
        if (!delay) return;

        innerRef.current.style.transitionDelay = delay;
      }
    }));

    const cloneProps = {};
    for (let prop in props) {
      cloneProps[prop] = props[prop];
    }
    cloneProps.ref = innerRef;
    delete cloneProps.children;

    return createElement("div", cloneProps, props.children);
  })
);

const useDancer = ({ defaultStyle, duration, timingFunction, delay } = {}) => {
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current.setStyle(defaultStyle);
    ref.current.setDuration(duration);
    ref.current.setTimingFunction(timingFunction);
    ref.current.setDelay(delay);
  });

  const play = (style) => {
    ref.current.setStyle(style);
  };

  return [ref, play];
};

export { useDancer, Dancer };