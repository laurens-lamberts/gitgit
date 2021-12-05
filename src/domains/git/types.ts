export type GetHistoryType = 'FULL' | 'LIMITED' | 'EXTENDED';

export type DiffLine = {
  index: number;
  lineNumber: string;
  mutation?: '+' | '-';
  text: string;
};

export type HistoryRecord = {
  commitId: string;
  commitMessage: string;
  author: string;
  timestamp: string;
  full: string;
};

export type BranchRecord = {
  name: string;
  active: boolean;
};
export type StashRecord = {
  id: string;
  name: string;
};
