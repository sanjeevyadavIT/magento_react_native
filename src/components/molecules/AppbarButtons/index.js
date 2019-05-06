import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
import { ACCENT_COLOR } from '../../../constants';

// TODO: Extract size, color into constants folder
const MaterialAppbarButton = props => (
  <HeaderButton
    IconComponent={MaterialIcons}
    iconSize={23}
    color={ACCENT_COLOR}
    {...props}
  />
);

export const MaterialAppbarButtons = props => (
  <HeaderButtons
    HeaderButtonComponent={MaterialAppbarButton}
    OverflowIcon={<MaterialIcons name="more-vert" size={23} color="white" />}
    {...props}
  />
);

export const { Item } = HeaderButtons;
