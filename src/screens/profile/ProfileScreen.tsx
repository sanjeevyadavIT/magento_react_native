import React from 'react';
import { View, Text, Button } from 'react-native';
import useUserStore from '../../store/useUserStore';

interface Props {
  title?: string;
}

const ProfileScreen: React.FC<Props> = ({ title = 'Profile Screen' }) => {
  const { logout } = useUserStore();
  return (
    <View>
      <Text>{title}</Text>
      <Button title='Logout' onPress={logout} />
    </View>
  );
};

export default ProfileScreen;