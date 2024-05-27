'use client';

import AbsoluteTimer from '@/layout/AbsoluteTimer';
import RelativeTimer from '@/layout/RelativeTimer';
import { MILLIS_IN_MINUTE, PlayState } from '@/components/consts';
import { useMemo, useState } from 'react';
import SectionWrapper from '@/wrappers/SectionWrapper';
import MembersInput from '@/components/MembersInput';

const DEFAULT_MEMBERS = ['사람1', '사람2', '사람3'];

export default function Home() {
  const [maxTime, setMaxTime] = useState(60 * MILLIS_IN_MINUTE);
  const [absolutePlayState, setAbsolutePlayState] =
    useState<PlayState>('stopped');
  const [currentTimeLeft, setCurrentTimeLeft] = useState<number>(maxTime);
  const [members, setMembers] = useState<string[]>(DEFAULT_MEMBERS);

  const memoizedAbsoluteTimer = useMemo(() => {
    return (
      <AbsoluteTimer
        playState={absolutePlayState}
        onPause={() => {
          setAbsolutePlayState('pause');
        }}
        onStart={() => {
          setAbsolutePlayState('playing');
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
        <SectionWrapper className="bg-slate-200">
          <MembersInput
            members={members}
            onChangeMembers={(members) => {
              setMembers(members);
            }}
          />
        </SectionWrapper>
        <SectionWrapper className="bg-green-200">
          {memoizedAbsoluteTimer}
        </SectionWrapper>
        <SectionWrapper className="bg-purple-200">
          <RelativeTimer
            members={members}
            currentTimeLeft={currentTimeLeft}
            absolutePlayState={absolutePlayState}
          />
        </SectionWrapper>
      </div>
    </div>
  );
}
