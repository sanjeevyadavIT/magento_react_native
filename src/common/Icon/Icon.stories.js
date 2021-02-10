import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Icon from './Icon';

storiesOf('Icon', module)
  .add('default(material icons)', () => <Icon name="account-circle" />)
  .add('AntDesign icons', () => <Icon type="antdesign" name="meh" />)
  .add('Entypo icons', () => <Icon type="entypo" name="emoji-flirt" />)
  .add('EvilIcons icons', () => <Icon type="evilicon" name="gear" />)
  .add('Feather icons', () => <Icon type="feather" name="gitlab" />)
  .add('FontAwesome icons', () => <Icon type="font-awesome" name="gift" />)
  .add('FontAwesome5 icons', () => (
    <Icon type="font-awesome-5" name="archway" />
  ))
  .add('Foundation icons', () => <Icon type="foundation" name="mountains" />)
  .add('Ionicons icons', () => <Icon type="ionicon" name="ios-chatbubbles" />)
  .add('MaterialCommunityIcons icons', () => (
    <Icon type="material-community" name="coffee" />
  ))
  .add('MaterialIcons icons', () => <Icon type="material" name="face" />)
  .add('SimpleLineIcons icons', () => (
    <Icon type="simple-line-icon" name="rocket" />
  ))
  .add('Fontisto icons', () => <Icon type="fontisto" name="google" />)
  .add('when icon is disabled', () => (
    <Icon type="material" name="face" disabled />
  ))
  .add('custom size & color & onPress', () => (
    <Icon
      type="material"
      name="face"
      size={100}
      color="pink"
      style={{ backgroundColor: 'yellow' }}
      onPress={() => console.log('On Press')}
    />
  ));
