import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
import { withTheme } from '../../../config';

const MaterialAppbarButton = withTheme(({ theme, ...props }) => (
  <HeaderButton
    IconComponent={MaterialIcons}
    iconSize={theme.dimens.appbarButtonHeight}
    color={theme.colors.appbarTintColor}
    {...props}
  />
));

const MaterialAppbarButtons = withTheme(({ theme, ...props }) => (
  <HeaderButtons
    HeaderButtonComponent={MaterialAppbarButton}
    OverflowIcon={<MaterialIcons name="more-vert" size={theme.dimens.appbarButtonHeight} color={theme.colors.appbarTintColor} />}
    {...props}
  />
));

const { Item } = HeaderButtons;
export { MaterialAppbarButtons, Item };
