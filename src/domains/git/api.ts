import { NativeModules } from 'react-native';
import { BranchRecord, GetHistoryType, HistoryRecord } from './types';

const repositoryPath = '~/ws/react-native/landal-park-app-v2';
const { ShellTools } = NativeModules;

export const getHistory = async (type: GetHistoryType = 'LIMITED'): Promise<HistoryRecord[]> => {
  const LIMIT = 10;
  let command = `cd ${repositoryPath} && git log -${LIMIT}`;
  switch (type) {
    case 'LIMITED': {
      const output: string = await ShellTools.executeCommand(command + ' --oneline');
      return output.split('\n').map((l) => {
        const endOfId = l.indexOf(' ');
        return {
          commitId: l.substring(0, endOfId),
          commitMessage: l.substring(endOfId + 1, l.length),
        };
      });
    }
    case 'EXTENDED': {
      // Not implemented
      return [];
    }
    case 'FULL': {
      // Not implemented
      command += ' --stat';
      return [];
    }
  }
};
export const getDiff = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git diff`);
};
export const getStatus = async () => {
  await ShellTools.executeCommand(`cd ${repositoryPath} && git status`);
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
  return output.split('\n').map((l) => {
    const active = l.indexOf('*') > -1;
    return {
      name: l.substring(active ? 2 : 0, l.length).trim(),
      active,
    };
  });
};
