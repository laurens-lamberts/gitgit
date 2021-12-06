import Icon from '@app/components/base/Icon';
import Text from '@app/components/base/Text';
import { HistoryRecord } from '@domains/git/types';
import React from 'react';
import { View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  historyRecords?: HistoryRecord[];
}

export default function History({ historyRecords }: Props) {
  const theme = useTheme();

  return (
    <>
      {historyRecords?.map((r, index) => (
        <View
          key={r.commitId}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Icon name="source-commit" style={{ marginRight: 8 }} size={18} color={'white'} />

            <Text
              style={{
                lineHeight: 20,
              }}
            >
              {r.commitMessage}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                lineHeight: 20,
                fontStyle: 'italic',
              }}
            >
              {`${r.author} - `}
            </Text>
            <Text
              style={{
                lineHeight: 20,
                fontStyle: 'italic',
              }}
            >
              {r.timestamp}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
}
