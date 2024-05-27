import { useContext, useState } from 'react';
import TimeInput from './TimeInput';
import ControllsWrapper from '@/wrappers/ControllsWrapper';
import InputWrapper from '@/wrappers/InputWrapper';
import { MILLIS_IN_MINUTE } from './consts';
import TogglableButton from './TogglableButton';
import MemberSelector from './MemberSelector';
import { SelectedMemberContext } from '@/MemberContext';

const TimeChangeController = ({
  onDelta,
}: {
  onDelta: (delta: number) => void;
}) => {
  const [inputTime, setInputTime] = useState(2 * MILLIS_IN_MINUTE);
  const { selectedMember, setSelectedMember } = useContext(
    SelectedMemberContext
  );

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
          disabled={!selectedMember}
          onClick={() => {
            onDelta(inputTime);
            setSelectedMember('');
          }}
        >
          뒤로
        </TogglableButton>
        <TogglableButton
          disabled={!selectedMember}
          onClick={() => {
            onDelta(-inputTime);
            setSelectedMember('');
          }}
        >
          앞으로
        </TogglableButton>
      </ControllsWrapper>
    </InputWrapper>
  );
};

export default TimeChangeController;
