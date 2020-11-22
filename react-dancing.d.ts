import * as React from 'react';

declare function useDancer(config: {
  defaultStyle?: object;
  duration?: number;
  timingFunction?: string;
  delay?: number;
  // TODO: need to complete
}): [object, (style: object) => void];

// TODO: need to complete
interface DancerProps extends React.HTMLAttributes<HTMLDivElement> {
  ref: object;
}

// TODO: need to complete
declare function Dancer(props: DancerProps);

export { useDancer, Dancer };
