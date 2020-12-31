type start = (toValue: number) => void;
type stop = () => void;

declare function useDancer(config: {
  defaultValue?: number;
  duration?: number;
  timingFunction?: (x: number) => number;
  delay?: number;
  interpolate: object;
}): [object, start, stop];

export { useDancer };
