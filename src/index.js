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
  const keyDancer = 0;
  const keyRaf = 1;
  const keyTime = 2;
  const keyConfig = 3;
  const keyTimeout = 4;
  const keyCurrentDancer = 5;
  const { current: refs } = useRef(new Map());

  const getRef = (key) => refs.get(key);
  const setRef = (key, value) => refs.set(key, value);

  useLayoutEffect(() => {
    if (!getRef(keyDancer)) return;

    if (getRef(keyDancer) === getRef(keyCurrentDancer)) return;

    setRef(keyCurrentDancer, getRef(keyDancer));

    config = config || {};
    config.duration = config.duration == null ? 200 : config.duration;
    config.delay = config.delay || 0;
    config.timingFunction = config.timingFunction || ((x) => x);
    config.interpolate = config.interpolate || {};
    config.defaultValue = config.defaultValue || 0;

    const { defaultValue, interpolate, timingFunction } = config;

    setRef(keyTime, defaultValue);
    setRef(keyConfig, config);

    const defaultStyle = {};
    for (let key in interpolate)
      defaultStyle[key] = interpolate[key](timingFunction(defaultValue));

    setStyle(defaultStyle, getRef(keyDancer));
  });

  const start = (toValue) => {
    if (!getRef(keyDancer)) return;

    if (toValue < 0 || toValue > 1) return;

    const { interpolate, timingFunction, duration } = getRef(keyConfig);

    clearTimeout(getRef(keyTimeout));
    setRef(
      keyTimeout,
      setTimeout(() => {
        cancelAnimationFrame(getRef(keyRaf));

        const raf = (handler) =>
          setRef(keyRaf, requestAnimationFrame(handler));

        const slice = 1 / (duration / FPS);

        const isForward = toValue > getRef(keyTime);

        function animate() {
          const nextStyle = {};

          for (let key in interpolate)
            nextStyle[key] = interpolate[key](timingFunction(getRef(keyTime)));

          setStyle(nextStyle, getRef(keyDancer));

          if (isForward) {
            if (getRef(keyTime) < toValue) {
              setRef(keyTime, getRef(keyTime) + slice);
              if (getRef(keyTime) > toValue) setRef(keyTime, toValue);
              raf(animate);
            }
          } else {
            if (getRef(keyTime) > toValue) {
              setRef(keyTime, getRef(keyTime) - slice);
              if (getRef(keyTime) < toValue) setRef(keyTime, toValue);
              raf(animate);
            }
          }
        }

        raf(animate);
      }, config.delay)
    );
  };

  const stop = () => {
    clearTimeout(getRef(keyTimeout));
    cancelAnimationFrame(getRef(keyRaf));
  };

  return [(ref) => setRef(keyDancer, ref), start, stop];
};

export { useDancer, Dancer };
