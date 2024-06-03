import { useEffect, useRef, useState } from 'react';
import { PlayState } from './consts';

type useTimerProps = {
  maxTime: number;
  interval?: number;
  overTime?: boolean;
};

const useTimer = ({
  maxTime,
  interval = 100,
  overTime = false,
}: useTimerProps) => {
  const from = useRef<Date | null>(null);
  const until = useRef<Date | null>(null);

  const [passed, setPassed] = useState(0);
  const [left, setLeft] = useState(maxTime);
  const [playState, setPlayState] = useState<PlayState>('stopped');

  const start = () => {
    from.current = new Date();
    until.current = new Date(from.current.getTime() + left);

    setPlayState('playing');
  };

  const pause = () => {
    setPlayState('pause');
  };

  const stop = () => {
    setPlayState('stopped');

    setPassed(0);
    setLeft(maxTime);

    from.current = null;
    until.current = null;
  };

  useEffect(() => {
    if (playState === 'playing') {
      const timer = setInterval(() => {
        if (from.current === null || until.current === null) return;

        setPassed(new Date().getTime() - from.current.getTime());
        setLeft(until.current.getTime() - new Date().getTime());
      }, interval);

      return () => {
        clearInterval(timer);
      };
    }
  }, [interval, left, passed, playState]);

  return {
    start,
    pause,
    stop,
    passed,
    left,
  };
};

export default useTimer;
