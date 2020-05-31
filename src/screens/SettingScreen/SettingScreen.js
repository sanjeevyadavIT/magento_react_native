import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { CurrencyPicker } from './containers';

const SettingScreen = ({ currencies, navigation }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      {currencies.length > 1 && <CurrencyPicker />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SettingScreen.navigationOptions = {};

SettingScreen.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
};

SettingScreen.defaultProps = {
  currencies: [],
};

const mapStateToProps = ({ magento }) => {
  const { available_currency_codes: currencies } = magento.currency;
  return {
    currencies,
  };
};

export default connect(mapStateToProps)(SettingScreen);
