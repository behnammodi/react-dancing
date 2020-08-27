/* eslint-disable react/prop-types, react/display-name */
import {
  useRef,
  forwardRef,
  createElement,
  useLayoutEffect,
  useImperativeHandle,
} from "react";

const Dancer = forwardRef(({ children, ...restProps }, ref) => {
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
    },
  }));

  return createElement("div", { ...restProps, ref: innerRef }, children);
});

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
