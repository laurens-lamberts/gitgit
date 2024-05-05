import { NativeModules } from 'react-native';
import { BranchRecord, DiffLine, GetHistoryType, HistoryRecord, StashRecord } from './types';

const repositoryPath = '~/ws/react-native/gitgit';
const { ShellTools } = NativeModules;

export const getHistory = async (): Promise<HistoryRecord[]> => {
  const LIMIT = 100;
  let command = `cd ${repositoryPath} && git log --branches --remotes --tags --date-order --date=relative --format="%s||%an||%ad||%h" -${LIMIT} HEAD `;
  const output: string = await ShellTools.executeCommand(command);
  return output
    .split('\n')
    .filter((e: string) => e)
    .map((l) => {
      const parts = l.split('||');
      return {
        commitMessage: parts[0],
        author: parts[1],
        timestamp: parts[2],
        commitId: parts[3],
        full: l,
      };
    });
};
export const getDiff = async (name?: string): Promise<DiffLine[]> => {
  const output = await ShellTools.executeCommand(`cd ${repositoryPath} && git diff` + (name && ` ${name}`));
  const outputLines = output.split('\n').filter((e: string) => e);

  if (outputLines.length < 5) {
    return [];
  }

  let lineNumber = 1;
  return outputLines.slice(5).map((l: string, index: number) => {
    const added = l[0] === '+';
    const removed = l[0] === '-';
    const mutation = added ? '+' : removed ? '-' : undefined;

    return {
      index,
      text: l.substring(added || removed ? 1 : 0, l.length).trim(),
      mutation,
      lineNumber: !removed && lineNumber++,
    };
  });
};
export const getStatus = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git status`);
};
export const getStaged = async () => {
  const output = await ShellTools.executeCommand(`cd ${repositoryPath} && git diff --name-only --cached`); // OR git diff HEAD --name-only
  return output.split('\n').filter((e) => e);
};
export const getUnstaged = async () => {
  const output = await ShellTools.executeCommand(`cd ${repositoryPath} && git diff --name-only`);
  return output.split('\n').filter((e) => e);
};
export const commit = async (message: string) => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git commit -m ${message}`);
};
export const push = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git push`);
};
export const pull = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git pull`);
};
export const fetch = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git fetch`);
};
export const stageAll = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git add .`);
};
export const stage = async (fileName: string) => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git add ${fileName}`);
};
export const stageUndo = async (fileName: string) => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git reset HEAD ${fileName}`);
};
export const branchCreate = async (name: string) => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git checkout -b ${name}`);
};
export const branchSwitch = async (name: string) => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git checkout ${name}`);
};
export const getBranches = async (remote?: boolean): Promise<BranchRecord[]> => {
  const output: string = await ShellTools.executeCommand(
    `cd ${repositoryPath} && git branch${remote ? ' -r' : ''}`
  );
  return output
    .split('\n')
    .filter((e) => e)
    .map((l) => {
      const active = l.indexOf('*') > -1;
      return {
        name: l.substring(active ? 2 : 0, l.length).trim(),
        active,
      };
    });
};
export const deleteMainMergedBranches = async () => {
  await ShellTools.executeCommand(
    `cd ${repositoryPath} && git branch --merged main | grep -v \"^\\* main\" | xargs -n 1 -r git branch -d`
  );
};

export const stash = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git stash`);
};
export const stashPop = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git stash pop`);
};
export const stashApply = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git stash apply`);
};
export const getStashList = async (): Promise<StashRecord[]> => {
  const output: string = await ShellTools.executeCommand(`cd ${repositoryPath} && git stash list`);
  return output
    .split('\n')
    .filter((e) => e)
    .map((l) => {
      const endOfId = l.indexOf(' ');
      return {
        id: l.substring(0, endOfId - 1),
        name: l.substring(endOfId + 1, l.length).trim(),
      };
    });
};
export const getActiveRepository = () => {
  return repositoryPath;
};
