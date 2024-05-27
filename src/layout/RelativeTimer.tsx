import TimeChangeController from '@/components/TimeChangeController';
import { PlayState } from '../components/consts';
import { useMemo, useState } from 'react';
import Countdown from 'react-countdown';

const RelativeTimer = ({
  currentTimeLeft,
  absolutePlayState,
  members,
}: {
  currentTimeLeft: number;
  absolutePlayState: PlayState;
  members: string[];
}) => {
  const [accDelta, setAccDelta] = useState(0);

  const memoizedTimeChangeController = useMemo(() => {
    return (
      <TimeChangeController
        onDelta={(delta) => {
          setAccDelta((prev) => prev + delta);
        }}
        members={members}
      />
    );
  }, []);

  return (
    <>
      {memoizedTimeChangeController}
      <Countdown
        controlled={true}
        date={currentTimeLeft + accDelta}
        autoStart={absolutePlayState === 'playing'}
        daysInHours={true}
      />
    </>
  );
};

export default RelativeTimer;
