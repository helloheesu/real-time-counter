import { useEffect } from 'react';
import PlayControlButtons from '../components/PlayControlButtons';
import TimeInput from '../components/TimeInput';
import InputWrapper from '@/wrappers/InputWrapper';
import {
  absolutePlayStateAtom,
  currentTimeLeftAtom,
  maxTimeAtom,
} from '@/atoms';
import { useAtom, useSetAtom } from 'jotai';
import useTimer from '@/useTimer';
import Clock from '@/components/Clock';

const AbsoluteTimer = () => {
  const [absolutePlayState, setAbsolutePlayState] = useAtom(
    absolutePlayStateAtom
  );
  const [maxTime, setMaxTime] = useAtom(maxTimeAtom);

  const setCurrentTimeLeft = useSetAtom(currentTimeLeftAtom);

  const { start, pause, stop, passed, left } = useTimer({
    maxTime,
  });

  useEffect(() => {
    setCurrentTimeLeft(left);
  }, [left, setCurrentTimeLeft]);

  return (
    <>
      <InputWrapper>
        <TimeInput
          inputTime={maxTime}
          onInputTimeChange={(newMaxTime) => setMaxTime(newMaxTime)}
        />
        <PlayControlButtons
          onPause={() => {
            setAbsolutePlayState('pause');
            pause();
          }}
          onStart={() => {
            setAbsolutePlayState('playing');
            start();
          }}
          onStop={() => {
            setAbsolutePlayState('stopped');
            stop();
          }}
          playState={absolutePlayState}
        />
      </InputWrapper>
      <Clock time={left} />
    </>
  );
};

export default AbsoluteTimer;
