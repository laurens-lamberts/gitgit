import { getBranches, getHistory } from '@domains/git/api';
import { BranchRecord, HistoryRecord } from '@domains/git/types';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function MainInterface() {
  const isDarkMode = useColorScheme() === 'dark';
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>();
  const [localBranches, setLocalBranches] = useState<BranchRecord[]>();
  const [remoteBranches, setRemoteBranches] = useState<BranchRecord[]>();

  const syncGitStatus = async () => {
    setHistoryRecords(await getHistory('LIMITED'));
    setLocalBranches(await getBranches());
    setRemoteBranches(await getBranches(true));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#222' : '#fff',
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
        }}
      >
        <Image source={require('@app/assets/images/gitgit-logo.png')} style={{ height: 50, width: 87 }} />
        <TouchableOpacity
          style={{
            backgroundColor: 'limegreen',
            borderRadius: 4,
            padding: 12,
            alignItems: 'center',
            width: 140,
          }}
          onPress={syncGitStatus}
        >
          <Text>Sync</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'tomato', padding: 20 }}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Text style={{ fontWeight: 'bold' }}>LOCAL</Text>
            <View>
              {localBranches?.map((b) => (
                <Text key={b.name} style={{ marginBottom: 4, color: b.active ? 'purple' : 'white' }}>
                  {b.name}
                </Text>
              ))}
            </View>
            <Text style={{ fontWeight: 'bold' }}>REMOTE</Text>
            <View>
              {remoteBranches?.map((b) => (
                <Text key={b.name} style={{ marginBottom: 4 }}>
                  {b.name}
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 2, backgroundColor: 'purple', padding: 20 }}>
          <ScrollView
            contentContainerStyle={{
              padding: 12,
            }}
          >
            {historyRecords?.map((r) => (
              <Text
                key={r.commitId}
                style={{
                  marginBottom: 4,
                }}
              >
                {r.commitMessage}
              </Text>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1, backgroundColor: 'red', padding: 20 }} />
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 4, alignItems: 'flex-end' }}>
        <Text>0.1</Text>
      </View>
    </SafeAreaView>
  );
}
