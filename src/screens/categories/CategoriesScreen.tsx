import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title?: string;
}

const CategoriesScreen: React.FC<Props> = ({ title = 'Categories Screen' }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default CategoriesScreen;