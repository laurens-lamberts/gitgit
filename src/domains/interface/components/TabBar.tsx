import Icon from '@app/components/base/Icon';
import Text from '@app/components/base/Text';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export default function TabBar({ activeTab, setActiveTab }: Props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TabBarButton
        setActiveTab={setActiveTab}
        index={0}
        activeIndex={activeTab}
        icon={'clock-outline'}
        label={'History'}
      />
      <TabBarButton
        setActiveTab={setActiveTab}
        index={1}
        activeIndex={activeTab}
        icon={'bandage'}
        label={'Changes'}
      />
    </View>
  );
}

interface TabBarButtonProps {
  setActiveTab: (index: number) => void;
  index: number;
  activeIndex: number;
  icon: string;
  label: string;
}
function TabBarButton({ setActiveTab, index, activeIndex, icon, label }: TabBarButtonProps) {
  const theme = useTheme();
  const selected = index === activeIndex;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? theme.button.primary.background : undefined,
      }}
      onPress={() => {
        setActiveTab(index);
      }}
    >
      <Icon
        name={icon}
        color={selected ? theme.button.primary.text : theme.button.primary.inactive}
        style={{ marginRight: 8 }}
      />
      <Text
        style={{
          color: selected ? theme.button.primary.text : theme.button.primary.inactive,
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
