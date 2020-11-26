/* eslint-disable react/prop-types, react/display-name */
import {
  memo,
  useRef,
  forwardRef,
  createElement,
  useLayoutEffect
} from "react";

const FPS = 1000 / 60;

const Dancer = memo(
  forwardRef((props, ref) => {
    const cloneProps = Object.assign({}, props);
    cloneProps.ref = ref;
    delete cloneProps.children;

    return createElement("div", cloneProps, props.children);
  })
);

const useDancer = (config) => {
  const ref = useRef();
  const prevRef = useRef();
  const refConfig = useRef();
  const refRaf = useRef();
  const refTimeout = useRef();
  const time = useRef();

  const setStyle = (style, element) => {
    for (let key in style) element.style[key] = style[key];
  };

  useLayoutEffect(() => {
    if (!ref.current) return;

    if (ref.current === prevRef.current) return;

    prevRef.current = ref.current;

    config = config || {};
    config.duration = config.duration == null ? 200 : config.duration;
    config.delay = config.delay || 0;
    config.timingFunction = config.timingFunction || ((x) => x);
    time.current = config.defaultValue = config.defaultValue || 0;
    config.interpolate = config.interpolate || {};

    refConfig.current = config;

    const currentStyle = {};
    for (let prop in config.interpolate) {
      currentStyle[prop] = config.interpolate[prop](
        config.timingFunction(config.defaultValue)
      );
    }

    setStyle(currentStyle, ref.current);
  });

  const start = (toValue) => {
    if (!ref.current) return;

    if (toValue < 0 || toValue > 1) return;

    refTimeout.current = setTimeout(() => {
      cancelAnimationFrame(refRaf.current);

      const interpolate = refConfig.current.interpolate;
      const timingFunction = refConfig.current.timingFunction;
      const raf = (handler) =>
        (refRaf.current = requestAnimationFrame(handler));

      const slice = 1 / (refConfig.current.duration / FPS);

      const isForward = toValue > time.current;

      function animate() {
        const nextStyle = {};
        for (let prop in interpolate) {
          nextStyle[prop] = interpolate[prop](timingFunction(time.current));
        }

        setStyle(nextStyle, ref.current);

        if (isForward) {
          if (time.current < toValue) {
            time.current += slice;
            if (time.current > toValue) time.current = toValue;
            raf(animate);
          }
        } else {
          if (time.current > toValue) {
            time.current -= slice;
            if (time.current < toValue) time.current = toValue;
            raf(animate);
          }
        }
      }

      raf(animate);
    }, refConfig.current.delay);
  };

  const stop = () => {
    clearTimeout(refTimeout.current);
    cancelAnimationFrame(refRaf.current);
  };

  return [ref, start, stop];
};

export { useDancer, Dancer };
