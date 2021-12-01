import { HistoryRecord } from '@domains/git/types';
import React from 'react';
import { Text } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  historyRecords?: HistoryRecord[];
}

export default function History({ historyRecords }: Props) {
  const theme = useTheme();

  return (
    <>
      {historyRecords?.map((r) => (
        <Text
          key={r.commitId}
          style={{
            marginBottom: 16,
          }}
        >
          {r.commitMessage}
        </Text>
      ))}
    </>
  );
}
