import { getHistory } from '@domains/git/api';
import { HistoryRecord } from '@domains/git/types';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

import RNFS from 'react-native-fs';

export default function MainInterface() {
  const isDarkMode = useColorScheme() === 'dark';
  const [listResults, setListResults] = useState<RNFS.ReadDirItem[]>([]);
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>();

  const syncGitStatus = async () => {
    setHistoryRecords(await getHistory());
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
        }}
      >
        <Image source={require('@app/assets/images/gitgit-logo.png')} style={{ height: 50, width: 87 }} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'tomato', padding: 20 }}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
              {listResults.map((r) => (
                <Text key={r.name} style={{ marginBottom: 4 }}>
                  {r.name}
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 2, backgroundColor: 'purple', padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'limegreen',
              borderRadius: 4,
              padding: 12,
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={syncGitStatus}
          >
            <Text>Sync</Text>
          </TouchableOpacity>
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
