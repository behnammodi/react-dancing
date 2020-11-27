/* eslint-disable react/prop-types, react/display-name */
import { useRef, useLayoutEffect } from 'react';

const useDancer = ({
  delay = 0,
  duration = 200,
  defaultValue = 0,
  interpolate = {},
  timingFunction = (x) => x,
} = {}) => {
  const KEY_DANCER = 0;
  const KEY_RAF = 1;
  const KEY_VALUE = 2;
  const KEY_TIMEOUT = 3;
  const KEY_CURRENT_DANCER = 4;
  const { current: refs } = useRef(new Map());

  const getRef = (key) => refs.get(key);
  const setRef = (key, value) => refs.set(key, value);

  const setStyle = (style, element) => {
    for (let key in style) element.style[key] = style[key];
  };

  const raf = (handler) => setRef(KEY_RAF, requestAnimationFrame(handler));

  const setStyleByTranslatedValue = (value) => {
    const nextStyle = {};
    for (let key in interpolate)
      nextStyle[key] = interpolate[key](timingFunction(value));

    setStyle(nextStyle, getRef(KEY_DANCER));
  };

  useLayoutEffect(() => {
    if (!getRef(KEY_DANCER)) return;

    if (getRef(KEY_DANCER) === getRef(KEY_CURRENT_DANCER)) return;

    setRef(KEY_CURRENT_DANCER, getRef(KEY_DANCER));

    setRef(KEY_VALUE, defaultValue);

    setStyleByTranslatedValue(defaultValue);
  });

  const start = (toValue) => {
    if (!getRef(KEY_DANCER)) return;

    if (toValue < 0 || toValue > 1) return;

    clearTimeout(getRef(KEY_TIMEOUT));
    setRef(
      KEY_TIMEOUT,
      setTimeout(() => {
        cancelAnimationFrame(getRef(KEY_RAF));
        const isForward = toValue > getRef(KEY_VALUE);

        const previousValue =
          getRef(KEY_VALUE) === 0 ? 0 : duration * getRef(KEY_VALUE);

        let firstTime = null;
        function animate(time) {
          if (firstTime === null) {
            firstTime = time;
          } else {
            setStyleByTranslatedValue(getRef(KEY_VALUE));
          }

          let now = time - firstTime;

          if (isForward) {
            if (getRef(KEY_VALUE) < toValue) {
              now = now + previousValue;
              let value = now / duration;
              if (value > toValue) value = toValue;
              setRef(KEY_VALUE, value);
              raf(animate);
            }
          } else {
            if (getRef(KEY_VALUE) > toValue) {
              now = previousValue - now;
              let value = now / duration;
              if (value < toValue) value = toValue;
              setRef(KEY_VALUE, value);
              raf(animate);
            }
          }
        }

        raf(animate);
      }, delay)
    );
  };

  const stop = () => {
    clearTimeout(getRef(KEY_TIMEOUT));
    cancelAnimationFrame(getRef(KEY_RAF));
  };

  return [(ref) => setRef(KEY_DANCER, ref), start, stop];
};

export { useDancer };
