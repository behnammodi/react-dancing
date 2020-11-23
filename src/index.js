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

const useDancer = (config) => {
  const ref = useRef();
  const prevRef = useRef();

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

    setStyle(
      Object.assign(
        {},
        {
          transitionDuration: config.duration + 'ms',
          transitionTimingFunction: config.timingFunction,
          transitionDelay: config.delay + 'ms',
        },
        config.defaultStyle
      ),
      ref.current
    );
  });

  const play = (style) => {
    if (!style) return;

    if (!ref.current) return;

    requestAnimationFrame(() => setStyle(style, ref.current));
  };

  return [ref, play];
};

export { useDancer, Dancer };
