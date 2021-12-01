import { stageUndo, stage, stageAll } from '@domains/git/api';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
            <TouchableOpacity
              style={{
                backgroundColor: theme.button.primary.background,
                borderColor: theme.button.primary.border,
                borderWidth: 1,
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
                borderColor: theme.button.primary.border,
                borderWidth: 1,
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
              <Text style={{ color: theme.button.primary.text }}>Stage</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={{
                backgroundColor: theme.button.primary.background,
                borderColor: theme.button.primary.border,
                borderWidth: 1,
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
              <Text style={{ color: theme.button.primary.text }}>Unstage</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
}
