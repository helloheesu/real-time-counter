import { atom } from 'jotai';
import { DEFAULT_MAX_TIME, DEFAULT_MEMBERS, Log, PlayState } from '@/consts';

export const membersAtom = atom<string[]>(DEFAULT_MEMBERS);
export const selectedMemberAtom = atom<string>('');

export const logsAtom = atom<Log[]>([]);

export const maxTimeAtom = atom<number>(DEFAULT_MAX_TIME);
export const absolutePlayStateAtom = atom<PlayState>('stopped');
export const currentTimeLeftAtom = atom<number>(DEFAULT_MAX_TIME);
