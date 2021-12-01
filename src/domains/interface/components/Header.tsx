import { getActiveRepository } from '@domains/git/api';
import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
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
          style={{ height: 40, width: 70, marginRight: 20 }}
        />
        <Text>{getActiveRepository()}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: theme.button.primary.background,
          borderColor: theme.button.primary.border,
          borderWidth: 1,
          borderRadius: 4,
          padding: 12,
          alignItems: 'center',
          width: 140,
          height: 42,
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
  );
}
