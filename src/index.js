import React from "react";

const Dancer = React.forwardRef(({ children, ...restProps }, ref) => {
  const innerRef = React.useRef();

  React.useImperativeHandle(ref, () => {
    const target = innerRef.current;

    return {
      setStyle: (style) => {
        if (!style) return;

        const keys = Object.keys(style);
        keys.forEach((key) => {
          target.style[key] = style[key];
        });
      },
      setDuration: (duration = "0.2s") => {
        target.style.transitionDuration = duration;
      },
      setTimingFunction: (timingFunction) => {
        if (!timingFunction) return;

        target.style.transitionTimingFunction = timingFunction;
      },
      setDelay: (delay) => {
        if (!delay) return;

        target.style.transitionDelay = delay;
      },
    };
  });

  return React.createElement("div", { ...restProps, ref: innerRef }, children);
});

const useDancer = ({ defaultStyle, duration, timingFunction, delay } = {}) => {
  const ref = React.useRef();

  React.useLayoutEffect(() => {
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
