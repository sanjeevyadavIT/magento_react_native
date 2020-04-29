import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { CURRENCY_CODE } from '../../../../magento';
import { ModalSelect } from '../../../../common';
import { priceSignByCode } from '../../../../utils/price';
import { changeCurrency } from '../../../../store/actions';
import { translate } from '../../../../i18n';
import { ThemeContext } from '../../../../theme';

const CurrencyPicker = ({
  currencies,
  exchangeRates,
  selectedCurrencyCode,
  changeCurrency: _changeCurrency,
}) => {
  const theme = useContext(ThemeContext);
  const data = currencies.map(value => ({
    label: value,
    key: value,
  }));

  const currencyExchangeRateByCode = (code) => {
    const result = exchangeRates.find(exchangeRate => exchangeRate.currency_to === code);
    if (result) {
      return result.rate;
    }
    return 1;
  };

  const onChange = (itemKey, item) => {
    AsyncStorage.setItem(CURRENCY_CODE, itemKey);
    _changeCurrency(
      itemKey,
      priceSignByCode(itemKey),
      currencyExchangeRateByCode(itemKey, exchangeRates),
    );
  };

  return (
    <ModalSelect
      disabled={data.length === 0}
      label={`${translate('settingScreen.changeCurrency')} : ${selectedCurrencyCode}`}
      attribute={translate('settingScreen.changeCurrency')}
      data={data}
      onChange={onChange}
      style={styles.currencyContainer(theme)}
      textStyle={styles.textStyle}
    />
  );
};

const styles = {
  currencyContainer: theme => ({
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  }),
  textStyle: {
    textAlign: 'left',
  },
};

CurrencyPicker.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  exchangeRates: PropTypes.arrayOf(PropTypes.shape({
    currency_to: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
  })),
  selectedCurrencyCode: PropTypes.string,
  changeCurrency: PropTypes.func.isRequired,
};

CurrencyPicker.defaultProps = {
  currencies: [],
  exchangeRates: [],
  selectedCurrencyCode: '',
};

const mapStatetoProps = ({ magento }) => {
  const {
    available_currency_codes: currencies,
    exchange_rates: exchangeRates,
    displayCurrencyCode: selectedCurrencyCode
  } = magento.currency;
  return {
    currencies,
    exchangeRates,
    selectedCurrencyCode,
  };
};

export default connect(mapStatetoProps, { changeCurrency })(CurrencyPicker);
