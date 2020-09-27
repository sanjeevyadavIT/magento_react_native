import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { GenericTemplate, Spinner, ProductListItem } from '../../common';
import { magento } from '../../magento';
import { SPACING } from '../../constants';
import Status from '../../magento/Status';
import { translate } from '../../i18n';

const columnCount = 2;

const propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
};

const defaultProps = {};

// TODO: Add sort functionality
const CategoryProductsScreen = ({
  route: {
    params: { id = -1 },
  },
  currencySymbol,
  currencyRate,
}) => {
  const [apiStatus, setApiStatus] = useState(Status.DEFAULT);
  const [errorMessage, setErrorMessage] = useState('');
  const [moreApiStatus, setMoreApiStatus] = useState(Status.DEFAULT);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchProducts(true);
  }, []);

  const fetchProducts = (firstPage = false) => {
    if (firstPage) {
      setApiStatus(Status.LOADING);
    } else {
      setMoreApiStatus(Status.LOADING);
    }
    magento.admin
      .getCategoryProducts(id, firstPage ? 0 : products.length)
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
        if (firstPage) {
          setApiStatus(Status.ERROR);
          setErrorMessage(error.message);
        } else {
          setMoreApiStatus(Status.ERROR);
          Toast.show(
            error.message || translate('errors.genericError'),
            Toast.LONG,
          );
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
      fetchProducts();
    }
  };

  return (
    <GenericTemplate status={apiStatus} errorMessage={errorMessage}>
      <FlatList
        numColumns={columnCount}
        data={products}
        renderItem={renderRow}
        keyExtractor={item => String(item.sku)}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        ListFooterComponent={renderFooter}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  spinner: {
    margin: SPACING.small,
  },
});

CategoryProductsScreen.propTypes = propTypes;

CategoryProductsScreen.defaultProps = defaultProps;

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

export default connect(mapStateToProps)(CategoryProductsScreen);
