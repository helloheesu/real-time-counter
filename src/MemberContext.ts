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

export type Log = {
  member: string;
  delta: number;
  absoluteTimestamp: number;
  currentTimestamp: number;
};

export const LogsContext = createContext<{
  logs: Log[];
  addLog: (log: Log) => void;
}>({
  logs: [],
  addLog: () => {},
});
