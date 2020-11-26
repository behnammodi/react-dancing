import * as React from 'react';

type start = (toValue: number) => void;
type stop = () => void;

declare function useDancer(config: {
  defaultValue?: number;
  duration?: number;
  timingFunction?: (x: number) => number;
  delay?: number;
  interpolate?: object;
  // TODO: need to complete
}): [object, start, stop];

// TODO: need to complete
interface DancerProps extends React.HTMLAttributes<HTMLDivElement> {
  ref: object;
}

// TODO: need to complete
declare function Dancer(props: DancerProps);

export { useDancer, Dancer };
