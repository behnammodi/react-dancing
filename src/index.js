/* eslint-disable react/prop-types, react/display-name */
import {
  memo,
  useRef,
  forwardRef,
  createElement,
  useLayoutEffect,
  useImperativeHandle,
} from 'react';

const Dancer = memo(
  forwardRef((props, ref) => {
    const innerRef = useRef();

    useImperativeHandle(ref, () => {
      function applyStyle(key, value) {
        innerRef.current && (innerRef.current.style[key] = value);
      }

      const perfix = 'transition';

      return {
        setStyle: (style) => {
          if (!style) return;

          const keys = Object.keys(style);
          keys.forEach((key) => {
            applyStyle(key, style[key]);
          });
        },
        setDuration: (duration) => {
          applyStyle(perfix + 'Duration', duration || '0.2s');
        },
        setTimingFunction: (timingFunction) => {
          if (!timingFunction) return;

          applyStyle(perfix + 'TimingFunction', timingFunction);
        },
        setDelay: (delay) => {
          if (!delay) return;

          applyStyle(perfix + 'Delay', delay);
        },
        getElement: () => innerRef.current,
      };
    });

    const cloneProps = {};
    for (let prop in props) {
      cloneProps[prop] = props[prop];
    }
    cloneProps.ref = innerRef;
    delete cloneProps.children;

    return createElement('div', cloneProps, props.children);
  })
);

const useDancer = (config) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const current = ref.current;
    config = config || {};
    current.setStyle(config.defaultStyle);
    current.setDuration(config.duration);
    current.setTimingFunction(config.timingFunction);
    current.setDelay(config.delay);
  }, []);

  const play = (style) => {
    ref.current.setStyle(style);
  };

  return [ref, play];
};

export { useDancer, Dancer };
