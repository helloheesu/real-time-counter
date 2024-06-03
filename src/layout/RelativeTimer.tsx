import TimeChangeController from '@/components/TimeChangeController';
import { Log } from '@/consts';
import { useCallback, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currentTimePassedAtom, logsAtom, selectedMemberAtom } from '@/atoms';
import Clock from '@/components/Clock';

const RelativeTimer = () => {
  const [accDelta, setAccDelta] = useState(0);
  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom);
  const setLogs = useSetAtom(logsAtom);
  const currentTimePassed = useAtomValue(currentTimePassedAtom);

  const handleDelta = useCallback(
    (delta: number) => {
      setAccDelta((prev) => prev + delta);
      const newLog: Log = {
        member: selectedMember,
        delta,
        absoluteTimestamp: currentTimePassed,
        currentTimestamp: currentTimePassed + accDelta,
      };
      setLogs((prevLogs) => [newLog, ...prevLogs]);
      setSelectedMember('');
    },
    [accDelta, currentTimePassed, selectedMember, setLogs, setSelectedMember]
  );

  return (
    <>
      <TimeChangeController onDelta={handleDelta} disabled={!selectedMember} />
      <Clock time={currentTimePassed + accDelta} />
    </>
  );
};

export default RelativeTimer;
