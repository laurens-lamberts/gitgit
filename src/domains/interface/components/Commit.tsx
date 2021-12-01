import Button from '@app/components/base/Button';
import Text from '@app/components/base/Text';
import { push, commit } from '@domains/git/api';
import React, { useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {}

export default function Commit({}: Props) {
  const theme = useTheme();
  const [commitMessage, setCommitMessage] = useState('');
  const [performingCommit, setPerformingCommit] = useState(false);
  const [performingPush, setPerformingPush] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'white',
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Commit</Text>
      <TextInput
        style={{ flex: 1, marginBottom: 8, borderWidth: 1, padding: 8 }}
        selectionColor={'transparent'}
        placeholder="Commit message"
        placeholderTextColor="#fff"
        onChangeText={(text) => setCommitMessage(text)}
        value={commitMessage}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button
          style={{
            flex: 1,
            height: 42,
            marginRight: 16,
          }}
          onPress={async () => {
            setPerformingCommit(true);
            await commit(commitMessage);
            setPerformingCommit(false);
            alert('commit performed');
          }}
        >
          {performingCommit ? (
            <ActivityIndicator color={theme.button.primary.text} />
          ) : (
            <Text style={{ color: theme.button.primary.text }}>Commit</Text>
          )}
        </Button>
        <Button
          style={{
            flex: 1,
            height: 42,
          }}
          onPress={async () => {
            await push();
            alert('pushed');
          }}
        >
          {performingPush ? (
            <ActivityIndicator color={theme.button.primary.text} />
          ) : (
            <Text style={{ color: theme.button.primary.text }}>Push</Text>
          )}
        </Button>
      </View>
    </View>
  );
}
