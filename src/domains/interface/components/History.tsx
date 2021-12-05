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
                fontFamily: theme.fonts.monospace,
                lineHeight: 20,
                fontSize: 16,
              }}
            >
              {r.commitMessage}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: theme.fonts.monospace,
                lineHeight: 20,
              }}
            >
              {`${r.author} @ `}
            </Text>
            <Text
              style={{
                fontFamily: theme.fonts.monospace,
                lineHeight: 20,
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
