import { formatTime } from '@/timeUtil';
import { MILLIS_IN_MINUTE } from './consts';

const TimeInput = ({
  onInputTimeChange,
  inputTime,
}: {
  onInputTimeChange: (maxTimeInMilliseconds: number) => void;
  inputTime: number;
}) => {
  const { minutes, seconds } = formatTime(inputTime);

  return (
    <div className="flex gap-4">
      <div className="flex">
        <input
          className="w-10 mr-1"
          type="number"
          value={minutes || ''}
          placeholder="0"
          step={2}
          onChange={(e) => {
            const inputMinutes = parseInt(e.target.value) || 0;

            onInputTimeChange(inputMinutes * MILLIS_IN_MINUTE + seconds * 1000);
          }}
        />
        <label>분</label>
      </div>
      <div className="flex">
        <input
          className="w-10 mr-1"
          type="number"
          value={seconds || ''}
          placeholder="0"
          onChange={(e) => {
            const inputSeconds = parseInt(e.target.value) || 0;

            onInputTimeChange(minutes * MILLIS_IN_MINUTE + inputSeconds * 1000);
          }}
        />
        <label>초</label>
      </div>
    </div>
  );
};

export default TimeInput;
