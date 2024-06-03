import { useEffect } from 'react';
import PlayControlButtons from '../components/PlayControlButtons';
import TimeInput from '../components/TimeInput';
import InputWrapper from '@/wrappers/InputWrapper';
import {
  absolutePlayStateAtom,
  currentTimePassedAtom,
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

  const setCurrentTimePassed = useSetAtom(currentTimePassedAtom);

  const { start, pause, stop, passed } = useTimer();

  useEffect(() => {
    setCurrentTimePassed(passed);
  }, [passed, setCurrentTimePassed]);

  useEffect(() => {
    if (passed >= maxTime) {
      setAbsolutePlayState('stopped');
      stop();
    }
  }, [maxTime, passed, setAbsolutePlayState, stop]);

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
      <Clock time={passed} />
    </>
  );
};

export default AbsoluteTimer;
