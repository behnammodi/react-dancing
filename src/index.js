/* eslint-disable react/prop-types, react/display-name */
import {
  memo,
  useRef,
  forwardRef,
  createElement,
  useLayoutEffect,
} from 'react';

const Dancer = memo(
  forwardRef((props, ref) => {
    const cloneProps = Object.assign({}, props);
    cloneProps.ref = ref;
    delete cloneProps.children;

    return createElement('div', cloneProps, props.children);
  })
);

const useDancer = ({
  delay = 0,
  duration = 200,
  defaultValue = 0,
  interpolate = {},
  timingFunction = (x) => x,
} = {}) => {
  const KEY_DANCER = 0;
  const KEY_RAF = 1;
  const KEY_TIME = 2;
  const KEY_TIMEOUT = 3;
  const KEY_CURRENT_DANCER = 4;
  const { current: refs } = useRef(new Map());

  const getRef = (key) => refs.get(key);
  const setRef = (key, value) => refs.set(key, value);

  const setStyle = (style, element) => {
    for (let key in style) element.style[key] = style[key];
  };

  const raf = (handler) => setRef(KEY_RAF, requestAnimationFrame(handler));

  useLayoutEffect(() => {
    if (!getRef(KEY_DANCER)) return;

    if (getRef(KEY_DANCER) === getRef(KEY_CURRENT_DANCER)) return;

    setRef(KEY_CURRENT_DANCER, getRef(KEY_DANCER));

    setRef(KEY_TIME, defaultValue);

    const defaultStyle = {};
    for (let key in interpolate)
      defaultStyle[key] = interpolate[key](timingFunction(defaultValue));

    setStyle(defaultStyle, getRef(KEY_DANCER));
  });

  const start = (toValue) => {
    if (!getRef(KEY_DANCER)) return;

    if (toValue < 0 || toValue > 1) return;

    clearTimeout(getRef(KEY_TIMEOUT));
    setRef(
      KEY_TIMEOUT,
      setTimeout(() => {
        cancelAnimationFrame(getRef(KEY_RAF));
        const FPS = 1000 / 60;
        const slice = 1 / (duration / FPS);

        const isForward = toValue > getRef(KEY_TIME);

        function animate() {
          const nextStyle = {};

          for (let key in interpolate)
            nextStyle[key] = interpolate[key](timingFunction(getRef(KEY_TIME)));

          setStyle(nextStyle, getRef(KEY_DANCER));

          if (isForward) {
            if (getRef(KEY_TIME) < toValue) {
              setRef(KEY_TIME, getRef(KEY_TIME) + slice);
              if (getRef(KEY_TIME) > toValue) setRef(KEY_TIME, toValue);
              raf(animate);
            }
          } else {
            if (getRef(KEY_TIME) > toValue) {
              setRef(KEY_TIME, getRef(KEY_TIME) - slice);
              if (getRef(KEY_TIME) < toValue) setRef(KEY_TIME, toValue);
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

export { useDancer, Dancer };
