import { LogsContext } from '@/MemberContext';
import { useContext } from 'react';
import { formatTime, pad } from '@/timeUtil';
import React from 'react';

const LogDisplay = () => {
  const { logs } = useContext(LogsContext);
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-2">Log</h1>
      <div className="grid gap-2 grid-cols-[4rem_4rem_4rem_4rem]">
        <span>이름</span>
        <span>추가</span>
        <span>절대시간</span>
        <span>상대시간</span>
        {logs.map(({ member, delta, absoluteTimestamp, currentTimestamp }) => {
          const { minutes: absMin, seconds: absSec } =
            formatTime(absoluteTimestamp);
          const { minutes: curMin, seconds: curSec } =
            formatTime(currentTimestamp);

          return (
            <React.Fragment key={absoluteTimestamp}>
              <span>{member}</span>
              <span>{formatTime(delta).minutes}분</span>
              <span>{`${pad(absMin)}:${pad(absSec)}`}</span>
              <span>{`${pad(curMin)}:${pad(curSec)}`}</span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LogDisplay;
