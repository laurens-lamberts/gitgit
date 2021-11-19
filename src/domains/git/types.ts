export type GetHistoryType = 'FULL' | 'LIMITED' | 'EXTENDED';

export type HistoryRecord = {
  commitId: string;
  commitMessage: string;
};

export type BranchRecord = {
  name: string;
  active: boolean;
};
