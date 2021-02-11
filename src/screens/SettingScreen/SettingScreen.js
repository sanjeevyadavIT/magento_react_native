import React, { useReducer, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Appearance } from 'react-native-appearance';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme, ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { DARK_THEME_LK, LIGHT_THEME_LK } from '../../constants';
import { GenericTemplate, ModalSelect } from '../../common';
import CurrencyPicker from './CurrencyPicker';
import { loadThemeType, saveThemeType } from '../../utils';

const propTypes = {
  /**
   * Number of currency website supports
   */
  currencies: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  currencies: [],
};

const SettingScreen = ({ currencies, navigation }) => {
  const [state, setState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    { userThemePreference: null },
  );
  const { theme, setTheme } = useContext(ThemeContext);
  const themeOptions = [
    { key: 0, label: translate('settingScreen.systemDefault') },
    { key: LIGHT_THEME_LK, label: translate('settingScreen.lightTheme') },
    { key: DARK_THEME_LK, label: translate('settingScreen.darkTheme') },
  ];

  useEffect(() => {
    async function getUserThemePreference() {
      const preference = await loadThemeType();
      setState({ userThemePreference: preference });
    }
    getUserThemePreference();
  }, []);

  const handleThemeChange = async key => {
    const value = key !== 0 ? key : null;
    await saveThemeType(value);
    if (value) {
      setTheme(value === DARK_THEME_LK ? darkTheme : lightTheme);
    } else {
      setTheme(
        Appearance.getColorScheme() === DARK_THEME_LK ? darkTheme : lightTheme,
      );
    }
    setState({ userThemePreference: value });
  };

  return (
    <GenericTemplate scrollable>
      <ModalSelect
        label={`${translate('settingScreen.changeTheme')}${
          state.userThemePreference != null
            ? ` : ${state.userThemePreference}`
            : ''
        }`}
        attribute={translate('settingScreen.changeTheme')}
        data={themeOptions}
        onChange={handleThemeChange}
        style={styles.currencyContainer(theme)}
        textStyle={styles.textStyle}
      />
      <View style={styles.container}>
        {currencies.length > 1 && <CurrencyPicker />}
      </View>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currencyContainer: theme => ({
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  }),
  textStyle: {
    textAlign: 'left',
  },
});

SettingScreen.propTypes = propTypes;

SettingScreen.defaultProps = defaultProps;

const mapStateToProps = ({ magento }) => {
  const { available_currency_codes: currencies } = magento.currency;
  return {
    currencies,
  };
};

export default connect(mapStateToProps)(SettingScreen);
