import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { GenericTemplate, Spinner, ProductListItem, Text } from '../../common';
import { magento } from '../../magento';
import { SPACING } from '../../constants';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import SearchBar from './SearchBar';

const columnCount = 2;
const ESCAPE_CLAUSE = '(%$##$%@)';

const propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
};

const defaultProps = {};

// TODO: Add sort functionality
const SearchScreen = ({ currencySymbol, currencyRate }) => {
  const [searchText, setSearchText] = useState('');
  const [apiStatus, setApiStatus] = useState(Status.DEFAULT);
  const [moreApiStatus, setMoreApiStatus] = useState(Status.DEFAULT);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  console.log({ searchText });

  useEffect(() => {
    if (searchText.trim() === '' || searchText.endsWith(ESCAPE_CLAUSE)) return;
    const task = setTimeout(() => fetchProducts(searchText), 2000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(task);
    };
  }, [searchText]);

  const fetchProducts = (_searchText, firstPage = true) => {
    if (firstPage) {
      setApiStatus(Status.LOADING);
    } else {
      setMoreApiStatus(Status.LOADING);
    }
    magento.admin
      .getProductsWithAttribute(
        'name',
        `%${_searchText.trim()}%`,
        firstPage ? 0 : products.length,
      )
      .then(response => {
        if (firstPage) {
          setProducts(response.items);
          setTotalCount(response.total_count);
          setApiStatus(Status.SUCCESS);
          setMoreApiStatus(Status.DEFAULT);
        } else {
          setMoreApiStatus(Status.SUCCESS);
          setProducts(prevState => [...prevState, ...response.items]);
        }
      })
      .catch(error => {
        Toast.show(
          error.message || translate('errors.genericError'),
          Toast.LONG,
        );
        if (firstPage) {
          setApiStatus(Status.ERROR);
        } else {
          setMoreApiStatus(Status.ERROR);
        }
      });
  };

  const renderRow = ({ item }) => (
    <ProductListItem
      columnCount={columnCount}
      product={item}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
    />
  );

  const renderFooter = () => {
    if (moreApiStatus === Status.LOADING) {
      return <Spinner style={styles.spinner} size="small" />;
    }
    return <></>;
  };

  const onEndReached = () => {
    if (
      apiStatus !== Status.LOADING &&
      moreApiStatus !== Status.LOADING &&
      moreApiStatus !== Status.ERROR && // Error in previous pagination, don't hit
      products.length < totalCount
    ) {
      fetchProducts(searchText.replace(ESCAPE_CLAUSE, ''), false);
    }
  };

  return (
    <GenericTemplate>
      <SearchBar
        placeholder={translate('searchScreen.searchHint')}
        onChangeText={setSearchText}
        loading={apiStatus === Status.LOADING}
        onSubmitEditing={({ nativeEvent: { text } = {} }) => {
          if (text.trim() === '') {
            Toast.show(translate('searchScreen.pleaseTypeSomething'));
          } else {
            setSearchText(prevState => `${prevState}${ESCAPE_CLAUSE}`);
            fetchProducts(text);
            Keyboard.dismiss();
          }
        }}
      />
      <FlatList
        numColumns={columnCount}
        data={products}
        renderItem={renderRow}
        keyExtractor={item => String(item.sku)}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        ListEmptyComponent={
          apiStatus === Status.SUCCESS && (
            <Text style={styles.empty}>
              {translate('searchScreen.noProduct')}
            </Text>
          )
        }
        ListFooterComponent={renderFooter}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  spinner: {
    margin: SPACING.small,
  },
  empty: {
    textAlign: 'center',
    flex: 1,
    marginVertical: SPACING.extraLarge,
    marginHorizontal: SPACING.large,
  },
});

SearchScreen.propTypes = propTypes;

SearchScreen.defaultProps = defaultProps;

const mapStateToProps = ({ magento: magentoReducer }) => {
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    } = {},
  } = magentoReducer;
  return {
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps)(SearchScreen);
