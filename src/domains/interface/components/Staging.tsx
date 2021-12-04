import Button from '@app/components/base/Button';
import Text from '@app/components/base/Text';
import { stageUndo, stage, stageAll, getDiff } from '@domains/git/api';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  unstagedFiles?: string[];
  stagedFiles?: string[];
  syncStagedFiles: () => void;
}

export default function Staging({ unstagedFiles, stagedFiles, syncStagedFiles }: Props) {
  const theme = useTheme();
  const contextMenu = [{ key: 'foo', title: 'Foo' }, { isSeparator: true }, { key: 'bar', title: 'Bar' }];
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
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Unstaged</Text>
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
              <Button.Text>Stage all</Button.Text>
            </Button>
          )}
        </View>
        {unstagedFiles?.map((name) => (
          <FileListItem
            name={name}
            syncStagedFiles={syncStagedFiles}
            ctaText={'Stage'}
            ctaOnPress={async () => {
              await stage(name);
              syncStagedFiles();
            }}
          />
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Staged</Text>
          {(stagedFiles?.length || 0) > 0 && (
            <Button
              style={{
                marginBottom: 8,
              }}
              onPress={async () => {
                await stagedFiles?.forEach(async (file) => {
                  await stageUndo(file);
                });
                syncStagedFiles();
              }}
            >
              <Button.Text>Unstage all</Button.Text>
            </Button>
          )}
        </View>
        {stagedFiles?.map((name) => (
          <FileListItem
            name={name}
            syncStagedFiles={syncStagedFiles}
            ctaText={'Unstage'}
            ctaOnPress={async () => {
              await stageUndo(name);
              syncStagedFiles();
            }}
          />
        ))}
      </View>
    </>
  );
}

interface FileListItemProps {
  name: string;
  syncStagedFiles: () => void;
  ctaText: string;
  ctaOnPress: () => void;
}
function FileListItem({ name, syncStagedFiles, ctaText, ctaOnPress }: FileListItemProps) {
  return (
    <TouchableOpacity
      key={name}
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      /* contextMenu={contextMenu}
      onContextMenuItemClick={(event) => {
        alert('click');
      }} */
      onPress={async () => {
        await getDiff(name);
      }}
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
        onPress={ctaOnPress}
      >
        <Button.Text>{ctaText}</Button.Text>
      </Button>
    </TouchableOpacity>
  );
}
