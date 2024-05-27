import { useState } from 'react';
import TimeInput from './TimeInput';
import ControllsWrapper from '@/wrappers/ControllsWrapper';
import InputWrapper from '@/wrappers/InputWrapper';
import { MILLIS_IN_MINUTE } from './consts';
import TogglableButton from './TogglableButton';
import MemberSelector from './MemberSelector';

const TimeChangeController = ({
  onDelta,
  disabled,
}: {
  onDelta: (delta: number) => void;
  disabled?: boolean;
}) => {
  const [inputTime, setInputTime] = useState(2 * MILLIS_IN_MINUTE);

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
        <MemberSelector />
        <TogglableButton
          disabled={disabled}
          onClick={() => {
            onDelta(inputTime);
          }}
        >
          ↑
        </TogglableButton>
        <TogglableButton
          disabled={disabled}
          onClick={() => {
            onDelta(-inputTime);
          }}
        >
          ↓
        </TogglableButton>
      </ControllsWrapper>
    </InputWrapper>
  );
};

export default TimeChangeController;
