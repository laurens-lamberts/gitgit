import Button from '@app/components/base/Button';
import Text from '@app/components/base/Text';
import Logo from '@app/components/Logo';
import { getActiveRepository } from '@domains/git/api';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  syncGitStatus: () => void;
  syncing: boolean;
}

export default function Header({ syncGitStatus, syncing }: Props) {
  const theme = useTheme();

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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Logo width={70} height={40} style={{ marginRight: 8 }} />
        <Text>{getActiveRepository()}</Text>
      </View>
      <Button
        style={{
          height: 42,
        }}
        onPress={syncGitStatus}
      >
        {syncing ? (
          <ActivityIndicator color={theme.button.primary.text} />
        ) : (
          <Button.Text
            style={{ color: theme.button.primary.text, fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Sync git status
          </Button.Text>
        )}
      </Button>
    </View>
  );
}
