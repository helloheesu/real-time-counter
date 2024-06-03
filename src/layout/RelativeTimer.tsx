import TimeChangeController from '@/components/TimeChangeController';
import { PlayState } from '@/consts';
import { useContext, useMemo, useState } from 'react';
import Countdown from 'react-countdown';
import { LogsContext, SelectedMemberContext } from '@/MemberContext';

const RelativeTimer = ({
  currentTimeLeft,
  absolutePlayState,
}: {
  currentTimeLeft: number;
  absolutePlayState: PlayState;
}) => {
  const [accDelta, setAccDelta] = useState(0);
  const { addLog } = useContext(LogsContext);
  const { selectedMember, setSelectedMember } = useContext(
    SelectedMemberContext
  );

  const memoizedTimeChangeController = useMemo(() => {
    return (
      <TimeChangeController
        onDelta={(delta) => {
          setAccDelta((prev) => prev + delta);
          addLog({
            member: selectedMember,
            delta,
            absoluteTimestamp: currentTimeLeft,
            currentTimestamp: currentTimeLeft + accDelta,
          });
          setSelectedMember('');
        }}
        disabled={!selectedMember}
      />
    );
  }, [accDelta, addLog, currentTimeLeft, selectedMember, setSelectedMember]);

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
