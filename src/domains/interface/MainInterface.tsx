import Button from '@app/components/base/Button';
import Icon from '@app/components/base/Icon';
import Text from '@app/components/base/Text';
import { getBranches, getHistory, getStaged, getUnstaged, getStashList } from '@domains/git/api';
import { BranchRecord, HistoryRecord, StashRecord } from '@domains/git/types';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import Branches from './components/Branches';
import Commit from './components/Commit';
import Header from './components/Header';
import History from './components/History';
import Staging from './components/Staging';
import TabBar from './components/TabBar';
import useTheme from './hooks/useTheme';

export default function MainInterface() {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const [syncing, setSyncing] = useState(false);

  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>();
  const [localBranches, setLocalBranches] = useState<BranchRecord[]>();
  const [remoteBranches, setRemoteBranches] = useState<BranchRecord[]>();
  const [unstagedFiles, setUnstagedFiles] = useState<string[]>();
  const [stagedFiles, setStagedFiles] = useState<string[]>();
  const [stashes, setStashes] = useState<StashRecord[]>();
  const [activeTab, setActiveTab] = useState(0);

  const syncStagedFiles = async () => {
    setUnstagedFiles(await getUnstaged());
    setStagedFiles(await getStaged());
  };

  const syncGitStatus = useCallback(async () => {
    setSyncing(true);
    setHistoryRecords(await getHistory('LIMITED'));
    setLocalBranches(await getBranches());
    setRemoteBranches(await getBranches(true));
    setStashes(await getStashList());
    await syncStagedFiles();
    setSyncing(false);
  }, []);

  useEffect(() => {
    syncGitStatus();
  }, [syncGitStatus]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <Header syncGitStatus={syncGitStatus} syncing={syncing} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: theme.sidebarLeft.background }}>
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <Branches
              syncGitStatus={syncGitStatus}
              localBranches={localBranches}
              remoteBranches={remoteBranches}
              stashes={stashes}
              filesModified={(unstagedFiles?.length || 0) + (stagedFiles?.length || 0) > 0}
            />
          </ScrollView>
        </View>
        <View style={{ flex: 2, backgroundColor: theme.center.background }}>
          <TabBar setActiveTab={setActiveTab} activeTab={activeTab} />
          <View
            style={{
              padding: 20,
            }}
          >
            {activeTab === 0 && (
              <ScrollView
                contentContainerStyle={{
                  padding: 12,
                }}
              >
                <History historyRecords={historyRecords} />
              </ScrollView>
            )}
            {activeTab === 1 && <View />}
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: theme.sidebarRight.background, padding: 20 }}>
          <Staging
            syncStagedFiles={syncStagedFiles}
            unstagedFiles={unstagedFiles}
            stagedFiles={stagedFiles}
          />
          <Commit />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 4,
          alignItems: 'flex-end',
          backgroundColor: theme.footer.background,
        }}
      >
        <Text>0.1</Text>
      </View>
    </SafeAreaView>
  );
}
