/* eslint-disable react/prop-types, react/display-name */
import {
  memo,
  useRef,
  forwardRef,
  createElement,
  useLayoutEffect,
} from 'react';

const FPS = 1000 / 60;

const setStyle = (style, element) => {
  for (let key in style) element.style[key] = style[key];
};

const Dancer = memo(
  forwardRef((props, ref) => {
    const cloneProps = Object.assign({}, props);
    cloneProps.ref = ref;
    delete cloneProps.children;

    return createElement('div', cloneProps, props.children);
  })
);

const useDancer = (config) => {
  const ref = useRef();
  const refRaf = useRef();
  const refTime = useRef();
  const refConfig = useRef();
  const refTimeout = useRef();
  const refCurrentDancer = useRef();

  useLayoutEffect(() => {
    if (!ref.current) return;

    if (ref.current === refCurrentDancer.current) return;

    refCurrentDancer.current = ref.current;

    config = config || {};
    config.duration = config.duration == null ? 200 : config.duration;
    config.delay = config.delay || 0;
    config.timingFunction = config.timingFunction || ((x) => x);
    config.interpolate = config.interpolate || {};
    
    refTime.current = config.defaultValue = config.defaultValue || 0;
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

      const isForward = toValue > refTime.current;

      function animate() {
        const nextStyle = {};
        for (let prop in interpolate) {
          nextStyle[prop] = interpolate[prop](timingFunction(refTime.current));
        }

        setStyle(nextStyle, ref.current);

        if (isForward) {
          if (refTime.current < toValue) {
            refTime.current += slice;
            if (refTime.current > toValue) refTime.current = toValue;
            raf(animate);
          }
        } else {
          if (refTime.current > toValue) {
            refTime.current -= slice;
            if (refTime.current < toValue) refTime.current = toValue;
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
