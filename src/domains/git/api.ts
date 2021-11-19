import { NativeModules } from 'react-native';
import { GetHistoryType, HistoryRecord } from './types';

const BASE_PATH = '~/ws/react-native/landal-park-app-v2';
const { ShellTools } = NativeModules;

export const getHistory = async (type: GetHistoryType = 'LIMITED') => {
  let command = `cd ${BASE_PATH} && git log`;
  switch (type) {
    case 'LIMITED': {
      command += ' --oneline';
      break;
    }
    case 'EXTENDED': {
      break;
    }
    case 'FULL': {
      command += ' --stat';
      break;
    }
  }
  command += ' -10';
  const output: string = await ShellTools.executeCommand(command);
  return output.split('\n').map((l) => {
    const endOfId = l.indexOf(' ');
    const historyRecord: HistoryRecord = {
      commitId: l.substring(0, endOfId),
      commitMessage: l.substring(endOfId + 1, l.length),
    };
    return historyRecord;
  });
};
export const getDiff = async () => await ShellTools.executeCommand(`cd ${BASE_PATH} && git diff`);
export const getStatus = async () => await ShellTools.executeCommand(`cd ${BASE_PATH} && git status`);
