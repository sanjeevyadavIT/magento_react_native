import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title?: string;
}

const CartScreen: React.FC<Props> = ({ title = 'Cart Screen' }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default CartScreen;