export const AttackOptions = [0, 1, 2] as const;

export type AttackOptionsType = (typeof AttackOptions)[number];
