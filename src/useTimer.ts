import { useEffect, useRef, useState } from 'react';
import { PlayState } from './consts';

const useTimer = () => {
  const from = useRef<Date | null>(null);

  const lastTimestamp = useRef<number>(0);
  const lastAnimationID = useRef<number>(0);

  const [passed, setPassed] = useState(0);
  const [playState, setPlayState] = useState<PlayState>('stopped');

  const start = () => {
    from.current = new Date();

    setPlayState('playing');
  };

  const pause = () => {
    setPlayState('pause');
  };

  const stop = () => {
    setPlayState('stopped');

    setPassed(0);

    from.current = null;
  };

  useEffect(() => {
    const tick = (timestamp: number) => {
      if (from.current === null) return;

      if (lastTimestamp.current !== 0) {
        const delta = timestamp - lastTimestamp.current;
        setPassed((prev) => prev + delta);
      }

      lastTimestamp.current = timestamp;

      if (playState === 'playing') {
        lastAnimationID.current = requestAnimationFrame(tick);
      }
    };

    if (playState === 'playing') {
      lastAnimationID.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(lastAnimationID.current);
      lastTimestamp.current = 0;
    }
  }, [playState]);

  return {
    start,
    pause,
    stop,
    passed,
  };
};

export default useTimer;
