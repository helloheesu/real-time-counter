import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import TogglableButton from './TogglableButton';
import { MembersContext } from '@/MemberContext';

const MembersInput = () => {
  const { members, setMembers } = useContext(MembersContext);
  const defaultValue = useMemo(() => members.join(','), [members]);

  const membersInputRef = useRef<HTMLTextAreaElement>(null);
  const [membersInputString, setMembersInputString] =
    useState<string>(defaultValue);

  const onApply = () => {
    const members = membersInputRef.current?.value?.trim() || '';
    if (!members) {
      return;
    }

    const parsedMembers = members
      .split(',')
      .filter((member) => member.trim() !== '');
    const set = new Set(parsedMembers);
    const membersArray = Array.from(set);
    membersArray.sort();

    setMembers(membersArray);
  };

  useEffect(() => {
    setMembersInputString(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex gap-2 w-full justify-center">
      <textarea
        className="flex-1 max-w-lg"
        ref={membersInputRef}
        value={membersInputString}
        onChange={(e) => setMembersInputString(e.target.value)}
        placeholder={defaultValue}
      />
      <TogglableButton onClick={() => onApply()}>반영</TogglableButton>
    </div>
  );
};

export default MembersInput;
