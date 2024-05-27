'use client';

import AbsoluteTimer from '@/layout/AbsoluteTimer';
import RelativeTimer from '@/layout/RelativeTimer';
import { MILLIS_IN_MINUTE, PlayState } from '@/components/consts';
import { useMemo, useState } from 'react';
import TimerWrapper from '@/wrappers/TimerWrapper';

export default function Home() {
  const [maxTime, setMaxTime] = useState(60 * MILLIS_IN_MINUTE);
  const [absolutePlayState, setAbsolutePlayState] =
    useState<PlayState>('stopped');
  const [currentTimeLeft, setCurrentTimeLeft] = useState<number>(maxTime);

  const memoizedAbsoluteTimer = useMemo(() => {
    return (
      <AbsoluteTimer
        playState={absolutePlayState}
        onPause={() => {
          setAbsolutePlayState('pause');
        }}
        onStart={() => {
          setAbsolutePlayState('play');
        }}
        onStop={() => {
          setAbsolutePlayState('stopped');
        }}
        maxTime={maxTime}
        onMaxTimeChange={(maxTime) => {
          setMaxTime(maxTime);
        }}
        onTick={(totalTimeLeft) => {
          setCurrentTimeLeft(totalTimeLeft);
        }}
      />
    );
  }, [maxTime, absolutePlayState]);

  return (
    <div className="h-screen">
      <div className="h-full max-w-2xl mx-auto flex flex-col justify-center items-center">
        <TimerWrapper classNames="bg-green-200">
          {memoizedAbsoluteTimer}
        </TimerWrapper>
        <TimerWrapper classNames="bg-purple-200">
          <RelativeTimer
            currentTimeLeft={currentTimeLeft}
            absolutePlayState={absolutePlayState}
          />
        </TimerWrapper>
      </div>
    </div>
  );
}
