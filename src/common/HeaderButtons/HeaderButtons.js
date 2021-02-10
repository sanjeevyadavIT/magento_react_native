import React, { useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  HeaderButtons as HBS,
  HeaderButton as HB,
  Item,
} from 'react-navigation-header-buttons';
import { ThemeContext } from '../../theme';
import { DIMENS } from '../../constants';

const HeaderButton = props => {
  const { theme } = useContext(ThemeContext);
  return (
    <HB
      IconComponent={MaterialIcons}
      iconSize={DIMENS.common.iconSize}
      color={theme.navigation.colors.text}
      {...props}
    />
  );
};

const HeaderButtons = props => {
  const { theme } = useContext(ThemeContext);
  return (
    <HBS
      HeaderButtonComponent={HeaderButton}
      OverflowIcon={
        <MaterialIcons
          name="more-vert"
          size={DIMENS.common.iconSize}
          color={theme.navigation.colors.text}
        />
      }
      {...props}
    />
  );
};

HeaderButtons.Item = Item;

export default HeaderButtons;
