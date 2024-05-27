import styled from 'styled-components';

const Select = styled.select`
  height: 2.5rem;
  font-size: 1.2rem;
  text-align: center;
`;

const MemberSelector = ({
  members,
  selectedMember,
  onSelect,
}: {
  members: string[];
  selectedMember: string;
  onSelect: (member: string) => void;
}) => {
  return (
    <div>
      <Select
        onChange={(e) => {
          onSelect(e.target.value);
        }}
        value={selectedMember}
      >
        <option
          disabled
          selected
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
