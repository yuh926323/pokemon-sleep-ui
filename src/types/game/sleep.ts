export type SleepSessions<T> = {
  primary: T,
  // Can't use `undefined` because `cloneMerge()` will not consider `null` as an actual value
  secondary: T | null,
};

export type SleepSessionTimes = {
  start: number,
  end: number,
};

export type SleepSessionInternal = {
  adjustedTiming: SleepSessionTimes,
  length: number,
  recovery: number,
};

export type SleepSessionInfo = {
  session: SleepSessions<SleepSessionInternal>,
  duration: {
    awake: number,
  },
};
