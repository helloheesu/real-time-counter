export const MILLIS_IN_MINUTE = 60 * 1000;
export const DEFAULT_MAX_TIME = 60 * MILLIS_IN_MINUTE;
export const DEFAULT_MEMBERS = ['사람1', '사람2', '사람3'];

export type PlayState = 'playing' | 'pause' | 'stopped';
export type Log = {
  member: string;
  delta: number;
  absoluteTimestamp: number;
  currentTimestamp: number;
  currentTimestampAfterChange: number;
};
