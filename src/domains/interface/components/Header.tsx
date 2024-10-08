import Button from '@app/components/base/Button';
import Icon from '@app/components/base/Icon';
import Text from '@app/components/base/Text';
import Logo from '@app/components/Logo';
import { branchCreate, getActiveRepository, pull, stash, stashPop } from '@domains/git/api';
import React from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  syncGitStatus: () => void;
  syncing: boolean;
}

export default function Header({ syncGitStatus, syncing }: Props) {
  const theme = useTheme();

  const activeRepo = getActiveRepository();
  const activeRepoPathParts = activeRepo.split('/');
  const repoName = activeRepoPathParts[activeRepoPathParts.length - 1];

  return (
    <View
      style={{
        height: 100,
        width: '100%',
        padding: 20,
        paddingTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.header.background,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Logo width={70} height={40} style={{ marginRight: 16 }} />
        <TouchableOpacity
          onPress={() => {
            alert('not implemented: switch repo');
          }}
        >
          <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Repo: {repoName}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          style={{
            height: 42,
            marginRight: 8,
          }}
          onPress={() => {
            pull();
            syncGitStatus();
          }}
          is3D
        >
          <Icon name="download-outline" style={{ marginRight: 8 }} />
          <Button.Text>Pull</Button.Text>
        </Button>
        <Button
          style={{
            height: 42,
            marginRight: 8,
          }}
          onPress={() => {
            Alert.prompt('Branch', 'Enter a branch name', (name) => {
              if (name) {
                branchCreate(name);
                syncGitStatus();
              }
            });
          }}
          is3D
        >
          <Icon name="source-branch" style={{ marginRight: 8 }} />
          <Button.Text>Branch</Button.Text>
        </Button>
        <Button
          style={{
            height: 42,
            marginRight: 8,
          }}
          onPress={() => {
            stash();
            syncGitStatus();
          }}
          is3D
        >
          <Icon name="briefcase-download-outline" style={{ marginRight: 8 }} />
          <Button.Text>Stash</Button.Text>
        </Button>
        <Button
          style={{
            height: 42,
          }}
          onPress={() => {
            stashPop();
            syncGitStatus();
          }}
          is3D
        >
          <Icon name="briefcase-upload-outline" style={{ marginRight: 8 }} />
          <Button.Text>Pop</Button.Text>
        </Button>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          style={{
            height: 42,
            width: 54,
            alignSelf: 'flex-end',
          }}
          onPress={syncGitStatus}
          is3D
        >
          {syncing ? <ActivityIndicator color={theme.button.primary.text} /> : <Icon name="sync" />}
        </Button>
      </View>
    </View>
  );
}
