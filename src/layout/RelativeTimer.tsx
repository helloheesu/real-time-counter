import TimeChangeController from '@/components/TimeChangeController';
import { Log } from '@/consts';
import { useCallback, useMemo, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  currentTimePassedAtom,
  logsAtom,
  maxTimeAtom,
  selectedMemberAtom,
} from '@/atoms';
import Clock from '@/components/Clock';
import { circle } from '@/timeUtil';

const RelativeTimer = () => {
  const [accDelta, setAccDelta] = useState(0);
  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom);
  const setLogs = useSetAtom(logsAtom);
  const currentTimePassed = useAtomValue(currentTimePassedAtom);
  const maxTime = useAtomValue(maxTimeAtom);

  const timePassedInCircle = useMemo(
    () => circle(currentTimePassed + accDelta, maxTime),
    [accDelta, currentTimePassed, maxTime]
  );

  const handleDelta = useCallback(
    (delta: number) => {
      setAccDelta((prev) => prev + delta);
      const newLog: Log = {
        member: selectedMember,
        delta,
        absoluteTimestamp: currentTimePassed,
        currentTimestamp: timePassedInCircle,
        currentTimestampAfterChange: circle(
          timePassedInCircle + delta,
          maxTime
        ),
      };
      setLogs((prevLogs) => [newLog, ...prevLogs]);
      setSelectedMember('');
    },
    [
      currentTimePassed,
      maxTime,
      selectedMember,
      setLogs,
      setSelectedMember,
      timePassedInCircle,
    ]
  );

  return (
    <>
      <TimeChangeController onDelta={handleDelta} disabled={!selectedMember} />
      <Clock time={timePassedInCircle} />
    </>
  );
};

export default RelativeTimer;
