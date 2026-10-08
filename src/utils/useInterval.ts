import * as React from "react";

interface UseIntervalProps {
  /**
   * Callback to run when interval reached.
   * @return true to repeat, false to stop and clear the interval
   */
  callback: () => boolean;
  intervalRateInMs: number;
  initialStart?: boolean;
}
interface UseIntervalResult {
  start: () => void;
}
export const useInterval = ({
  initialStart,
  callback,
  intervalRateInMs
}: UseIntervalProps): UseIntervalResult => {

  const [mounted, setMounted] = React.useState<boolean>(false);
  const [intervalFn, setIntervalFn] = React.useState<NodeJS.Timeout>();

  const thisCallback = (): void => {
    const result = callback();
    if (!result) {
      clearInterval(intervalFn);
    }
  }

  const start = (): void => {
    let interval = setInterval(thisCallback, intervalRateInMs);
    setIntervalFn(interval);
  }

  React.useEffect(() => {
    if (!mounted && initialStart) {
      start();
    }
  }, [mounted, initialStart]);

  React.useEffect(() => {
    return () => { if (intervalFn) clearInterval(intervalFn); };
  }, [intervalFn]);

  React.useEffect(() => setMounted(true), []);
  return { start }
}