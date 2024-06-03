import { formatTime, pad } from '@/timeUtil';
import React from 'react';
import { useAtomValue } from 'jotai';
import { logsAtom } from '@/atoms';

const LogDisplay = () => {
  const logs = useAtomValue(logsAtom);
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-2">Log</h1>
      <div className="grid gap-2 grid-cols-5">
        <span>이름</span>
        <span>추가</span>
        <span>절대시간</span>
        <span>상대시간</span>
        <span>변경 후</span>
        {logs.map(
          ({
            member,
            delta,
            absoluteTimestamp,
            currentTimestamp,
            currentTimestampAfterChange,
          }) => {
            const { minutes: absMin, seconds: absSec } =
              formatTime(absoluteTimestamp);
            const { minutes: curMin, seconds: curSec } =
              formatTime(currentTimestamp);
            const { minutes: afterMin, seconds: afterSec } = formatTime(
              currentTimestampAfterChange
            );

            return (
              <React.Fragment key={absoluteTimestamp}>
                <span>{member}</span>
                <span>{formatTime(delta).minutes}분</span>
                <span>{`${pad(absMin)}:${pad(absSec)}`}</span>
                <span>{`${pad(curMin)}:${pad(curSec)}`}</span>
                <span>{`${pad(afterMin)}:${pad(afterSec)}`}</span>
              </React.Fragment>
            );
          }
        )}
      </div>
    </div>
  );
};

export default LogDisplay;
