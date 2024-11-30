import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title?: string;
}

const ProfileScreen: React.FC<Props> = ({ title = 'Profile Screen' }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default ProfileScreen;