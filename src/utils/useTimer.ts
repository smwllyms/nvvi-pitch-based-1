import * as React from "react";

interface UseTimerResult {
  start: (timeInSeconds: number) => void;
  timeRemainingInSeconds: number;
  done: boolean;
}
interface UseTimerProps {
  callback: () => void;
}
export const useTimer = ({ callback }: UseTimerProps): UseTimerResult => {

  const [started, setStarted] = React.useState<boolean>(false);
  const [eta, setEta] = React.useState<number>(0);

  React.useEffect(() => {
    if (started) {
      if (eta > 0) {
        setTimeout(() => setEta(prev => prev - 1), 1000);
      } else if (eta === 0) {
        callback();
        setStarted(false);
      }
    }
  }, [eta, started]);

  const start = React.useCallback((timeInSeconds: number): void => {
    setStarted(true);
    setEta(timeInSeconds);
  }, []);

  return {
    start,
    timeRemainingInSeconds: eta,
    done: eta === 0
  }
}