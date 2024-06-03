import { useRef, useEffect } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import PlayController from '../components/PlayController';
import TimeInput from '../components/TimeInput';
import InputWrapper from '@/wrappers/InputWrapper';
import {
  absolutePlayStateAtom,
  currentTimeLeftAtom,
  maxTimeAtom,
} from '@/atoms';
import { useAtom, useSetAtom } from 'jotai';

const AbsoluteTimer = () => {
  const countdownRef = useRef<Countdown>(null);
  const countdownApiRef: React.MutableRefObject<CountdownApi | null> =
    useRef<CountdownApi>(null);

  const [absolutePlayState, setAbsolutePlayState] = useAtom(
    absolutePlayStateAtom
  );
  const [maxTime, setMaxTime] = useAtom(maxTimeAtom);

  const setCurrentTimeLeft = useSetAtom(currentTimeLeftAtom);

  const onTick = (totalTimeLeft: number) => {
    setCurrentTimeLeft(totalTimeLeft);
  };

  useEffect(() => {
    if (countdownRef.current) {
      countdownApiRef.current = countdownRef.current.getApi();
    }
  }, []);

  useEffect(() => {
    if (countdownApiRef.current) {
      if (absolutePlayState === 'playing') {
        countdownApiRef.current.start();
      } else if (absolutePlayState === 'pause') {
        countdownApiRef.current.pause();
      } else if (absolutePlayState === 'stopped') {
        countdownApiRef.current.stop();
      }
    }
  }, [absolutePlayState]);

  return (
    <>
      <InputWrapper>
        <TimeInput
          inputTime={maxTime}
          onInputTimeChange={(newMaxTime) => setMaxTime(newMaxTime)}
        />
        <PlayController
          onPause={() => {
            setAbsolutePlayState('pause');
          }}
          onStart={() => {
            setAbsolutePlayState('playing');
          }}
          onStop={() => {
            setAbsolutePlayState('stopped');
          }}
          playState={absolutePlayState}
        />
      </InputWrapper>
      <Countdown
        ref={countdownRef}
        date={Date.now() + maxTime}
        autoStart={false}
        daysInHours={true}
        controlled={false}
        onTick={({ total }) => onTick(total)}
        intervalDelay={1000}
      />
    </>
  );
};

export default AbsoluteTimer;
