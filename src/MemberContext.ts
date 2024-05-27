import { createContext } from 'react';

export const MembersContext = createContext<{
  members: string[];
  setMembers: (members: string[]) => void;
}>({
  members: [],
  setMembers: () => {},
});

export const SelectedMemberContext = createContext<{
  selectedMember: string;
  setSelectedMember: (member: string) => void;
}>({
  selectedMember: '',
  setSelectedMember: () => {},
});
