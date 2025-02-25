import { membersAtom, selectedMemberAtom } from '@/atoms';
import { useAtom, useAtomValue } from 'jotai';
import styled from 'styled-components';

const Select = styled.select`
  height: 2.5rem;
  font-size: 1.2rem;
  text-align: center;
`;

const MemberSelector = () => {
  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom);
  const members = useAtomValue(membersAtom);

  return (
    <div>
      <Select
        onChange={(e) => {
          const selectedMember = e.target.value;
          setSelectedMember(selectedMember);
        }}
        value={selectedMember}
      >
        <option
          disabled
          value=""
          style={{
            display: 'none',
          }}
        >
          -- 사람 선택 --
        </option>
        {members.map((member) => {
          return (
            <option key={member} value={member}>
              {member}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default MemberSelector;
