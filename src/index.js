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

    useImperativeHandle(
      ref,
      () => ({
        setStyle: (style) => {
          if (!style) return;

          if (!innerRef.current) return;

          for (let key in style) innerRef.current.style[key] = style[key];
        },
        getElement: () => innerRef.current,
      }),
      []
    );

    const cloneProps = Object.assign({}, props);
    cloneProps.ref = innerRef;
    delete cloneProps.children;

    return createElement('div', cloneProps, props.children);
  })
);

const useDancer = (config) => {
  const ref = useRef();
  const prevRef = useRef();

  useLayoutEffect(() => {
    if (!ref.current) return;

    if (ref.current === prevRef.current) return;

    prevRef.current = ref.current;

    const perfix = 'transition';

    config = config || {};

    const cloneDefaultStyle = Object.assign({}, config.defaultStyle);

    cloneDefaultStyle[perfix + 'Duration'] = config.duration || '0.2s';

    if ('timingFunction' in config)
      cloneDefaultStyle[perfix + 'TimingFunction'] = config.timingFunction;

    if ('delay' in config) cloneDefaultStyle[perfix + 'Delay'] = config.delay;

    ref.current.setStyle(cloneDefaultStyle);
  });

  const play = (style) => {
    if (!ref.current) return;

    requestAnimationFrame(() => ref.current.setStyle(style));
  };

  return [ref, play];
};

export { useDancer, Dancer };
