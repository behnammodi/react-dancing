/* eslint-disable react/prop-types, react/display-name */
import {
  memo,
  useRef,
  forwardRef,
  createElement,
  useLayoutEffect,
  useImperativeHandle,
} from "react";

const Dancer = memo(
  forwardRef((props, ref) => {
    const innerRef = useRef();

    useImperativeHandle(ref, () => {
      const targetStyle = innerRef.current.style;
      return {
        setStyle: (style) => {
          if (!style) return;

          const keys = Object.keys(style);
          keys.forEach((key) => {
            targetStyle[key] = style[key];
          });
        },
        setDuration: (duration) => {
          targetStyle.transitionDuration = duration || "0.2s";
        },
        setTimingFunction: (timingFunction) => {
          if (!timingFunction) return;

          targetStyle.transitionTimingFunction = timingFunction;
        },
        setDelay: (delay) => {
          if (!delay) return;

          targetStyle.transitionDelay = delay;
        },
      };
    });

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
  }, []);

  const play = (style) => {
    ref.current.setStyle(style);
  };

  return [ref, play];
};

export { useDancer, Dancer };
