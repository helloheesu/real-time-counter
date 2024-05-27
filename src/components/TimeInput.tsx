import { MILLIS_IN_MINUTE } from './consts';

const TimeInput = ({
  onInputTimeChange,
  inputTime,
}: {
  onInputTimeChange: (maxTimeInMilliseconds: number) => void;
  inputTime: number;
}) => {
  const timeInMinutes = Math.floor(inputTime / MILLIS_IN_MINUTE);
  const timeInSeconds = (inputTime % MILLIS_IN_MINUTE) / 1000;

  return (
    <div className="flex gap-4">
      <div className="flex">
        <input
          className="w-10 mr-1"
          type="number"
          value={timeInMinutes || ''}
          placeholder="0"
          onChange={(e) => {
            const minutes = parseInt(e.target.value) || 0;

            onInputTimeChange(
              minutes * MILLIS_IN_MINUTE + timeInSeconds * 1000
            );
          }}
        />
        <label>분</label>
      </div>
      <div className="flex">
        <input
          className="w-10 mr-1"
          type="number"
          value={timeInSeconds || ''}
          placeholder="0"
          onChange={(e) => {
            const seconds = parseInt(e.target.value) || 0;

            onInputTimeChange(
              timeInMinutes * MILLIS_IN_MINUTE + seconds * 1000
            );
          }}
        />
        <label>초</label>
      </div>
    </div>
  );
};

export default TimeInput;
