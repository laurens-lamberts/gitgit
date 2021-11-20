import {
  branchSwitch,
  getBranches,
  getHistory,
  push,
  commit,
  getStaged,
  getUnstaged,
  getStashList,
  getActiveRepository,
  stageUndo,
  stage,
  stageAll,
} from '@domains/git/api';
import { BranchRecord, HistoryRecord, StashRecord } from '@domains/git/types';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const theme = {
  background: '#222',
  button: {
    primary: {
      background: '#666',
      text: 'white',
    },
  },
  list: {
    spacing: {
      vertical: 4,
    },
  },
  active: '#666',
  footer: {
    background: '#000',
  },
  header: {
    background: '#000',
  },
  sidebarLeft: {
    background: '#111',
  },
  sidebarRight: {
    background: '#111',
  },
  center: {
    background: '#222',
  },
};

export default function MainInterface() {
  const isDarkMode = useColorScheme() === 'dark';
  const [syncing, setSyncing] = useState(false);
  const [performingCommit, setPerformingCommit] = useState(false);
  const [performingPush, setPerformingPush] = useState(false);
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>();
  const [localBranches, setLocalBranches] = useState<BranchRecord[]>();
  const [remoteBranches, setRemoteBranches] = useState<BranchRecord[]>();
  const [unstagedFiles, setUnstagedFiles] = useState<string[]>();
  const [stagedFiles, setStagedFiles] = useState<string[]>();
  const [stashes, setStashes] = useState<StashRecord[]>();

  const [commitMessage, setCommitMessage] = useState('');

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
      <View
        style={{
          height: 80,
          width: '100%',
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.header.background,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('@app/assets/images/gitgit-logo.png')}
            style={{ height: 50, width: 87, marginRight: 20 }}
          />
          <Text>{getActiveRepository()}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.button.primary.background,
            borderRadius: 4,
            padding: 12,
            alignItems: 'center',
            width: 140,
            height: 40,
          }}
          onPress={syncGitStatus}
        >
          {syncing ? (
            <ActivityIndicator color={theme.button.primary.text} />
          ) : (
            <Text style={{ color: theme.button.primary.text }}>Sync git status</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: theme.sidebarLeft.background, paddingVertical: 20 }}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Text style={{ fontWeight: 'bold', paddingHorizontal: 20, fontSize: 18, marginBottom: 8 }}>
              LOCAL
            </Text>
            <View style={{ marginBottom: 20 }}>
              {localBranches?.map((b) => (
                <TouchableOpacity
                  key={b.name}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: theme.list.spacing.vertical,
                    backgroundColor: b.active ? theme.active : undefined,
                  }}
                  onPress={async () => {
                    await branchSwitch(b.name);
                    syncGitStatus();
                  }}
                >
                  <Text key={b.name}>{b.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={{ fontWeight: 'bold', paddingHorizontal: 20, fontSize: 18, marginBottom: 8 }}>
              REMOTE
            </Text>
            <View>
              {remoteBranches?.map((b) => (
                <TouchableOpacity
                  key={b.name}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: theme.list.spacing.vertical,
                    backgroundColor: b.active ? 'green' : undefined,
                  }}
                  onPress={async () => {
                    await branchSwitch(b.name);
                    syncGitStatus();
                  }}
                >
                  <Text>{b.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={{ fontWeight: 'bold', paddingHorizontal: 20, fontSize: 18, marginBottom: 8 }}>
              STASHES
            </Text>
            <View>
              {stashes?.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: theme.list.spacing.vertical,
                  }}
                  onPress={async () => {}}
                >
                  <Text>{s.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 2, backgroundColor: theme.center.background, padding: 20 }}>
          <ScrollView
            contentContainerStyle={{
              padding: 12,
            }}
          >
            {historyRecords?.map((r) => (
              <Text
                key={r.commitId}
                style={{
                  marginBottom: 16,
                }}
              >
                {r.commitMessage}
              </Text>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1, backgroundColor: theme.sidebarRight.background }}>
          <View
            style={{ flex: 1, margin: 20, padding: 8, borderWidth: 2, borderRadius: 4, borderColor: 'white' }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Unstaged</Text>
              {(unstagedFiles?.length || 0) > 0 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.button.primary.background,
                    borderRadius: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                  onPress={async () => {
                    await stageAll();
                    syncStagedFiles();
                  }}
                >
                  <Text>Stage all</Text>
                </TouchableOpacity>
              )}
            </View>
            {unstagedFiles?.map((name) => (
              <View
                key={name}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Text
                  style={{
                    marginBottom: 16,
                    flexShrink: 1,
                  }}
                >
                  {name}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.button.primary.background,
                    borderRadius: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                  onPress={async () => {
                    await stage(name);
                    syncStagedFiles();
                  }}
                >
                  <Text>Stage</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View
            style={{ flex: 1, margin: 20, padding: 8, borderWidth: 2, borderRadius: 4, borderColor: 'white' }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Staged</Text>
            {stagedFiles?.map((name) => (
              <View
                key={name}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Text
                  style={{
                    marginBottom: 16,
                    flexShrink: 1,
                  }}
                >
                  {name}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.button.primary.background,
                    borderRadius: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                  onPress={async () => {
                    await stageUndo(name);
                    syncStagedFiles();
                  }}
                >
                  <Text>Unstage</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View
            style={{ flex: 1, margin: 20, padding: 8, borderWidth: 2, borderRadius: 4, borderColor: 'white' }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Commit</Text>
            <TextInput
              style={{ flex: 1, marginBottom: 8, borderWidth: 1, padding: 8 }}
              selectionColor={'transparent'}
              placeholder="Commit message"
              placeholderTextColor="#fff"
              onChangeText={(text) => setCommitMessage(text)}
              value={commitMessage}
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.button.primary.background,
                  borderRadius: 4,
                  padding: 12,
                  alignItems: 'center',
                  flex: 1,
                  height: 40,
                  marginRight: 16,
                }}
                onPress={async () => {
                  await commit(commitMessage);
                  alert('commit performed');
                }}
              >
                {performingCommit ? (
                  <ActivityIndicator color={theme.button.primary.text} />
                ) : (
                  <Text style={{ color: theme.button.primary.text }}>Commit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.button.primary.background,
                  borderRadius: 4,
                  padding: 12,
                  alignItems: 'center',
                  flex: 1,
                  height: 40,
                }}
                onPress={async () => {
                  await push();
                  alert('pushed');
                }}
              >
                {performingPush ? (
                  <ActivityIndicator color={theme.button.primary.text} />
                ) : (
                  <Text style={{ color: theme.button.primary.text }}>Push</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
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
