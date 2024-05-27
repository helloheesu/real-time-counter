'use client';

import AbsoluteTimer from '@/layout/AbsoluteTimer';
import RelativeTimer from '@/layout/RelativeTimer';
import { MILLIS_IN_MINUTE, PlayState } from '@/components/consts';
import { useMemo, useState } from 'react';
import SectionWrapper from '@/wrappers/SectionWrapper';
import MembersInput from '@/components/MembersInput';
import {
  Log,
  LogsContext,
  MembersContext,
  SelectedMemberContext,
} from '@/MemberContext';
import LogDisplay from '@/components/LogDisplay';

const DEFAULT_MEMBERS = ['사람1', '사람2', '사람3'];

export default function Home() {
  const [maxTime, setMaxTime] = useState(60 * MILLIS_IN_MINUTE);
  const [absolutePlayState, setAbsolutePlayState] =
    useState<PlayState>('stopped');
  const [currentTimeLeft, setCurrentTimeLeft] = useState<number>(maxTime);
  const [members, setMembers] = useState<string[]>(DEFAULT_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [logs, setLogs] = useState<Log[]>([]);

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
      <MembersContext.Provider value={{ members, setMembers }}>
        <SelectedMemberContext.Provider
          value={{ selectedMember, setSelectedMember }}
        >
          <LogsContext.Provider
            value={{
              logs: logs,
              addLog: (log) => {
                setLogs((prevLogs) => [log, ...prevLogs]);
              },
            }}
          >
            <div className="h-full max-w-2xl mx-auto flex flex-col justify-center items-center">
              <SectionWrapper className="bg-slate-200">
                <MembersInput />
              </SectionWrapper>
              <SectionWrapper className="bg-green-200">
                {memoizedAbsoluteTimer}
              </SectionWrapper>
              <SectionWrapper className="bg-purple-200">
                <RelativeTimer
                  currentTimeLeft={currentTimeLeft}
                  absolutePlayState={absolutePlayState}
                />
              </SectionWrapper>
              <SectionWrapper className=" bg-yellow-50">
                <LogDisplay />
              </SectionWrapper>
            </div>
          </LogsContext.Provider>
        </SelectedMemberContext.Provider>
      </MembersContext.Provider>
    </div>
  );
}
