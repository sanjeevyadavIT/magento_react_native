import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title?: string;
}

const SignupScreen: React.FC<Props> = ({ title = 'Signup Screen' }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default SignupScreen;