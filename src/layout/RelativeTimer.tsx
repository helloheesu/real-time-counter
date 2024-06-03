import TimeChangeController from '@/components/TimeChangeController';
import { Log } from '@/consts';
import { useCallback, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  currentTimeLeftAtom,
  logsAtom,
  maxTimeAtom,
  selectedMemberAtom,
} from '@/atoms';
import Clock from '@/components/Clock';

const RelativeTimer = () => {
  const [accDelta, setAccDelta] = useState(0);
  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom);
  const setLogs = useSetAtom(logsAtom);
  const currentTimeLeft = useAtomValue(currentTimeLeftAtom);
  const maxTime = useAtomValue(maxTimeAtom);

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
      <Clock time={currentTimeLeft + accDelta} />
    </>
  );
};

export default RelativeTimer;
