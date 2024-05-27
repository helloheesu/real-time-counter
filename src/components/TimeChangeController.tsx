import { useState } from 'react';
import TimeInput from './TimeInput';
import ControllsWrapper from '@/wrappers/ControllsWrapper';
import InputWrapper from '@/wrappers/InputWrapper';

const TimeChangeController = ({
  onDelta,
}: {
  onDelta: (delta: number) => void;
}) => {
  const [inputTime, setInputTime] = useState(0);

  console.log('TimeChangeController rendered', inputTime);

  return (
    <InputWrapper>
      <TimeInput
        inputTime={inputTime}
        onInputTimeChange={(time) => {
          console.log('change', time);
          setInputTime(time);
        }}
      />
      <ControllsWrapper>
        <button
          onClick={() => {
            onDelta(inputTime);
          }}
        >
          ⏮️
        </button>
        <button
          onClick={() => {
            onDelta(-inputTime);
          }}
        >
          ⏭️
        </button>
      </ControllsWrapper>
    </InputWrapper>
  );
};

export default TimeChangeController;
