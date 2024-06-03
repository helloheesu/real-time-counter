import TimeChangeController from '@/components/TimeChangeController';
import { Log } from '@/consts';
import { useCallback, useState } from 'react';
import Countdown from 'react-countdown';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  absolutePlayStateAtom,
  currentTimeLeftAtom,
  logsAtom,
  selectedMemberAtom,
} from '@/atoms';

const RelativeTimer = () => {
  const [accDelta, setAccDelta] = useState(0);
  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom);
  const setLogs = useSetAtom(logsAtom);
  const currentTimeLeft = useAtomValue(currentTimeLeftAtom);
  const absolutePlayState = useAtomValue(absolutePlayStateAtom);

  const handleDelta = useCallback(
    (delta: number) => {
      setAccDelta((prev) => prev + delta);
      const newLog: Log = {
        member: selectedMember,
        delta,
        absoluteTimestamp: currentTimeLeft,
        currentTimestamp: currentTimeLeft + accDelta,
      };
      setLogs((prevLogs) => [newLog, ...prevLogs]);
      setSelectedMember('');
    },
    [accDelta, currentTimeLeft, selectedMember, setLogs, setSelectedMember]
  );

  return (
    <>
      <TimeChangeController onDelta={handleDelta} disabled={!selectedMember} />
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
