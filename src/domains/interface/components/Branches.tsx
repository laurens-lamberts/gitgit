import Icon from '@app/components/base/Icon';
import Text from '@app/components/base/Text';
import { branchSwitch, stash, stashPop } from '@domains/git/api';
import { BranchRecord, StashRecord } from '@domains/git/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import useTheme from '../hooks/useTheme';

const ICON_SIZE = 12;

interface Props {
  syncGitStatus: () => void;
  localBranches?: BranchRecord[];
  remoteBranches?: BranchRecord[];
  stashes?: StashRecord[];
  filesModified: boolean;
}

export default function Branches({
  syncGitStatus,
  localBranches,
  remoteBranches,
  stashes,
  filesModified,
}: Props) {
  const theme = useTheme();

  const validateAndSwitchBranch = async (name: string) => {
    if (filesModified) {
      stash();
    }
    await branchSwitch(name);
    if (filesModified) {
      stashPop();
    }
  };

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
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={async () => {
              await validateAndSwitchBranch(b.name);
              syncGitStatus();
            }}
            disabled={b.active}
          >
            <Icon
              name="source-branch"
              style={{ marginRight: 8 }}
              size={ICON_SIZE}
              color={b.active ? theme.activeText : 'white'}
            />
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
      <View style={{ marginBottom: 20 }}>
        {remoteBranches?.map((b) => (
          <TouchableOpacity
            key={b.name}
            style={{
              paddingHorizontal: 20,
              paddingVertical: theme.list.spacing.vertical,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={async () => {
              await validateAndSwitchBranch(b.name);
              syncGitStatus();
            }}
          >
            <Icon name="source-branch" style={{ marginRight: 8 }} size={ICON_SIZE} color={'white'} />
            <Text style={{ color: 'white' }}>{b.name}</Text>
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
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={async () => {}}
          >
            <Icon name="briefcase-outline" style={{ marginRight: 8 }} size={ICON_SIZE} color={'white'} />
            <Text>{s.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
