import { LogsContext } from '@/MemberContext';
import { useContext } from 'react';
import { formatTime, pad } from '@/timeUtil';

const LogDisplay = () => {
  const { logs } = useContext(LogsContext);
  return (
    <div className="flex flex-col items-center">
      <h1>Log</h1>
      <div className="flex flex-col items-center">
        {logs.map(({ member, delta, absoluteTimestamp, currentTimestamp }) => {
          const { minutes: absMin, seconds: absSec } =
            formatTime(absoluteTimestamp);
          const { minutes: curMin, seconds: curSec } =
            formatTime(currentTimestamp);

          return (
            <div key={absoluteTimestamp}>
              <span>{member}</span> / <span>{formatTime(delta).seconds}초</span>{' '}
              / <span>{`${pad(absMin)}:${pad(absSec)}`}</span> /{' '}
              <span>{`${pad(curMin)}:${pad(curSec)}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogDisplay;
