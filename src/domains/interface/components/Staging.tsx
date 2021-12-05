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
  selectedFile: string;
  setSelectedFile: (name: string) => void;
}

export default function Staging({
  unstagedFiles,
  stagedFiles,
  syncStagedFiles,
  selectedFile,
  setSelectedFile,
}: Props) {
  const theme = useTheme();
  //const contextMenu = [{ key: 'foo', title: 'Foo' }, { isSeparator: true }, { key: 'bar', title: 'Bar' }];
  return (
    <>
      <View
        style={{
          flex: 1,
          marginBottom: 20,
          padding: 8,
          borderWidth: 2,
          borderRadius: 4,
          borderColor: theme.button.primary.background,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, textTransform: 'uppercase' }}>
            Unstaged
          </Text>
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
            ctaText={'Stage'}
            ctaOnPress={async () => {
              await stage(name);
              syncStagedFiles();
            }}
            selected={selectedFile === name}
            setSelected={setSelectedFile}
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
          borderColor: theme.button.primary.background,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, textTransform: 'uppercase' }}>
            Staged
          </Text>
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
            ctaText={'Unstage'}
            ctaOnPress={async () => {
              await stageUndo(name);
              syncStagedFiles();
            }}
            selected={selectedFile === name}
            setSelected={setSelectedFile}
          />
        ))}
      </View>
    </>
  );
}

interface FileListItemProps {
  name: string;
  ctaText: string;
  ctaOnPress: () => void;
  selected: boolean;
  setSelected: (name: string) => void;
}
function FileListItem({ name, ctaText, ctaOnPress, selected, setSelected }: FileListItemProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      key={name}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: selected ? theme.active : undefined,
        marginBottom: 4,
        marginHorizontal: selected ? -8 : 0,
        paddingHorizontal: selected ? 8 : 0,
        paddingVertical: 2,
      }}
      /* contextMenu={contextMenu}
      onContextMenuItemClick={(event) => {
        alert('click');
      }} */
      onPress={async () => {
        setSelected(name);
      }}
    >
      <Text
        style={{
          flexShrink: 1,
          color: selected ? theme.activeText : 'white',
          fontWeight: selected ? 'bold' : undefined,
        }}
      >
        {name}
      </Text>
      <Button
        style={{
          height: 28,
        }}
        backgroundColor={selected ? 'black' : undefined}
        onPress={ctaOnPress}
      >
        <Button.Text style={{ color: selected ? 'white' : 'black' }}>{ctaText}</Button.Text>
      </Button>
    </TouchableOpacity>
  );
}
