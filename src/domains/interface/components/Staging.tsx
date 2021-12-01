import Button from '@app/components/base/Button';
import Text from '@app/components/base/Text';
import { stageUndo, stage, stageAll } from '@domains/git/api';
import React from 'react';
import { View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  unstagedFiles?: string[];
  stagedFiles?: string[];
  syncStagedFiles: () => void;
}

export default function Staging({ unstagedFiles, stagedFiles, syncStagedFiles }: Props) {
  const theme = useTheme();

  return (
    <>
      <View
        style={{
          flex: 1,
          marginBottom: 20,
          padding: 8,
          borderWidth: 2,
          borderRadius: 4,
          borderColor: 'white',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Unstaged</Text>
          {(unstagedFiles?.length || 0) > 0 && (
            <Button
              style={{
                marginBottom: 8,
              }}
              onPress={async () => {
                await stageAll();
                syncStagedFiles();
              }}
            >
              <Button.Text style={{ color: theme.button.primary.text }}>Stage all</Button.Text>
            </Button>
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
            <Button
              style={{
                marginBottom: 8,
              }}
              onPress={async () => {
                await stage(name);
                syncStagedFiles();
              }}
            >
              <Button.Text style={{ color: theme.button.primary.text }}>Stage</Button.Text>
            </Button>
          </View>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: 20,
          padding: 8,
          borderWidth: 2,
          borderRadius: 4,
          borderColor: 'white',
        }}
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
            <Button
              style={{
                marginBottom: 8,
              }}
              onPress={async () => {
                await stageUndo(name);
                syncStagedFiles();
              }}
            >
              <Text style={{ color: theme.button.primary.text }}>Unstage</Text>
            </Button>
          </View>
        ))}
      </View>
    </>
  );
}
