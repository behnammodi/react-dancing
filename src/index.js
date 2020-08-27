import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  createElement
} from "react";

const Dancer = forwardRef(({ children }, ref) => {
  const innerRef = useRef();

  useEffect(() => {
    innerRef.current.style.transitionProperty = "transition opacity";
  }, []);

  useImperativeHandle(ref, () => ({
    setStyle: (style) => {
      const keys = Object.keys(style);
      keys.forEach((key) => {
        innerRef.current.style[key] = style[key];
      });
    },
    setDuration: (duration) => {
      innerRef.current.style.transitionDuration = duration;
    },
    setTimingFunction: (timingFunction) => {
      innerRef.current.style.transitionTimingFunction = timingFunction;
    },
    setDelay: (delay) => {
      innerRef.current.style.transitionDelay = delay;
    },
  }));

  return createElement("div", { ref: innerRef }, children);
});

const useDancer = ({ defaultStyle, duration, timingFunction, delay }) => {
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
