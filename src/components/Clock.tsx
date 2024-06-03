import { formatTime, pad } from '@/timeUtil';

const Clock = ({ time }: { time: number }) => {
  const { minutes, seconds } = formatTime(time);

  return (
    <span>
      {pad(minutes)}:{pad(seconds)}
    </span>
  );
};

export default Clock;
