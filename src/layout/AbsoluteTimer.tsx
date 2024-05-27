import { useRef, useEffect } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import PlayController from '../components/PlayController';
import TimeInput from '../components/TimeInput';
import { PlayState } from '../components/consts';
import InputWrapper from '@/wrappers/InputWrapper';

const AbsoluteTimer = ({
  playState,
  onStop,
  onPause,
  onStart,
  maxTime,
  onMaxTimeChange,
  onTick,
}: {
  onStop: () => void;
  onPause: () => void;
  onStart: () => void;
  maxTime: number;
  onMaxTimeChange: (maxTimeInMilliseconds: number) => void;
  playState: PlayState;
  onTick: (totalTimeLeft: number) => void;
}) => {
  const countdownRef = useRef<Countdown>(null);
  const countdownApiRef: React.MutableRefObject<CountdownApi | null> =
    useRef<CountdownApi>(null);

  useEffect(() => {
    if (countdownRef.current) {
      countdownApiRef.current = countdownRef.current.getApi();
    }
  }, []);

  useEffect(() => {
    if (countdownApiRef.current) {
      if (playState === 'playing') {
        countdownApiRef.current.start();
      } else if (playState === 'pause') {
        countdownApiRef.current.pause();
      } else if (playState === 'stopped') {
        countdownApiRef.current.stop();
      }
    }
  }, [playState]);

  return (
    <>
      <InputWrapper>
        <TimeInput inputTime={maxTime} onInputTimeChange={onMaxTimeChange} />
        <PlayController
          onStop={() => onStop()}
          onPause={() => onPause()}
          onStart={() => onStart()}
          playState={playState}
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
