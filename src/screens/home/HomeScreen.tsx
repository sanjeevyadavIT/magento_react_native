import React from 'react';
import { View, Text } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';

interface Props {
  title?: string;
}

const HomeScreen: React.FC<BottomTabScreenProps<BottomTabParamList, "Home"> & Props> = ({ title = 'Home Screen', navigation }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default HomeScreen;