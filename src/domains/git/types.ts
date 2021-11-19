export type GetHistoryType = 'FULL' | 'LIMITED' | 'EXTENDED';

export type HistoryRecord = {
  commitId: string;
  commitMessage: string;
};
