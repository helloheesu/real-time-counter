'use client';

import AbsoluteTimer from '@/layout/AbsoluteTimer';
import RelativeTimer from '@/layout/RelativeTimer';
import SectionWrapper from '@/wrappers/SectionWrapper';
import MembersInput from '@/components/MembersInput';
import LogDisplay from '@/components/LogDisplay';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="h-full max-w-2xl mx-auto flex flex-col justify-center items-center">
        <SectionWrapper className="bg-slate-200">
          <MembersInput />
        </SectionWrapper>
        <SectionWrapper className="bg-green-200">
          <AbsoluteTimer />
        </SectionWrapper>
        <SectionWrapper className="bg-purple-200">
          <RelativeTimer />
        </SectionWrapper>
        <SectionWrapper className=" bg-yellow-50 flex-1">
          <LogDisplay />
        </SectionWrapper>
      </div>
    </div>
  );
}
