import { useRef } from 'react';
import TogglableButton from './TogglableButton';

const MembersInput = ({
  members,
  onChangeMembers,
}: {
  members: string[];
  onChangeMembers: (members: string[]) => void;
}) => {
  const membersInputRef = useRef<HTMLTextAreaElement>(null);
  const membersString = members.join(',');
  const onApply = () => {
    const members = membersInputRef.current?.value?.trim();
    if (!members) {
      return;
    }

    const membersArray = members?.split(',') || [];

    onChangeMembers(membersArray);
  };

  return (
    <div className="flex gap-2 w-full justify-center">
      <textarea
        className="flex-1 max-w-lg"
        ref={membersInputRef}
        defaultValue={membersString}
        placeholder={membersString}
      />
      <TogglableButton onClick={() => onApply()}>반영</TogglableButton>
    </div>
  );
};

export default MembersInput;
