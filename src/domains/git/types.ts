export type GetHistoryType = 'FULL' | 'LIMITED' | 'EXTENDED';

export type DiffLine = {
  lineNumber: string;
  mutation?: '+' | '-';
  text: string;
};

export type HistoryRecord = {
  commitId: string;
  commitMessage: string;
};

export type BranchRecord = {
  name: string;
  active: boolean;
};
export type StashRecord = {
  id: string;
  name: string;
};
