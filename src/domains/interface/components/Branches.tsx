import Text from '@app/components/base/Text';
import { branchSwitch } from '@domains/git/api';
import { BranchRecord, StashRecord } from '@domains/git/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  syncGitStatus: () => void;
  localBranches?: BranchRecord[];
  remoteBranches?: BranchRecord[];
  stashes?: StashRecord[];
}

export default function Branches({ syncGitStatus, localBranches, remoteBranches, stashes }: Props) {
  const theme = useTheme();

  return (
    <>
      <Text style={{ fontWeight: 'bold', paddingHorizontal: 20, fontSize: 18, marginBottom: 8 }}>LOCAL</Text>
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
            <Text
              style={{
                color: b.active ? theme.activeText : 'white',
                fontWeight: b.active ? 'bold' : undefined,
              }}
            >
              {b.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ fontWeight: 'bold', paddingHorizontal: 20, fontSize: 18, marginBottom: 8 }}>REMOTE</Text>
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
            <Text style={{ color: b.active ? theme.activeText : 'white' }}>{b.name}</Text>
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
    </>
  );
}
