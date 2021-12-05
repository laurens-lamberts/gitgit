import Text from '@app/components/base/Text';
import { DiffLine } from '@domains/git/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  diff: DiffLine[];
}

export default function DiffViewer({ diff }: Props) {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={{ padding: 12 }} style={{ flex: 1 }}>
      {diff?.map((d) => (
        <View key={d.index} style={{ flexDirection: 'row' }}>
          <Text
            style={{ width: 32, fontFamily: theme.fonts.monospace, lineHeight: 20, color: theme.text.dimmed }}
          >
            {d.lineNumber}
          </Text>
          <Text
            style={{ width: 20, fontFamily: theme.fonts.monospace, lineHeight: 20, color: theme.text.dimmed }}
          >
            {d.mutation}
          </Text>
          <View
            style={{
              alignSelf: 'stretch',
              flexGrow: 1,
              backgroundColor:
                d.mutation === '+' ? theme.diff.added : d.mutation === '-' ? theme.diff.removed : undefined,
            }}
          >
            <Text
              style={{
                fontFamily: theme.fonts.monospace,
                lineHeight: 20,
                color: d.mutation ? 'black' : undefined,
              }}
            >
              {d.text}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
