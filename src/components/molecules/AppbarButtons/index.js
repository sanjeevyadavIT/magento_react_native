import React, { useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
import { ThemeContext } from '../../../config';

const MaterialAppbarButton = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <HeaderButton
      IconComponent={MaterialIcons}
      iconSize={theme.dimens.appbarButtonHeight}
      color={theme.colors.appbarTintColor}
      {...props}
    />
  );
};

const MaterialAppbarButtons = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <HeaderButtons
      HeaderButtonComponent={MaterialAppbarButton}
      OverflowIcon={<MaterialIcons name="more-vert" size={theme.dimens.appbarButtonHeight} color={theme.colors.appbarTintColor} />}
      {...props}
    />
  );
};

const { Item } = HeaderButtons;
export { MaterialAppbarButtons, Item };
