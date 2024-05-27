import { MILLIS_IN_MINUTE } from './components/consts';

export const formatTime = (
  time: number
): {
  minutes: number;
  seconds: number;
} => {
  const minutes = Math.floor(time / MILLIS_IN_MINUTE);
  const seconds = (time % MILLIS_IN_MINUTE) / 1000;
  console.log('format', time, minutes, seconds);

  return { minutes, seconds };
};

export const pad = (num: number): string => num.toString().padStart(2, '0');
