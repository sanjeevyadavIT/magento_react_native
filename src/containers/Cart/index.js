import React from 'react';
import { View, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../../components/common';
import { CART } from '../../reducers/types';
import { CART_PAGE_TITLE } from '../../constants';
import CartList from '../../components/cart/CartList';
import { getCustomerCart, getCartItemProduct } from '../../actions';

class Cart extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: CART_PAGE_TITLE,
  })

  componentDidMount() {
    const {
      items,
      products,
      getCartItemProduct: _getCartItemProduct,
    } = this.props;
    if (!items) {
      return;
    }
    items.forEach((item) => {
      if (!item.thumbnail) {
        if (!products[item.sku]) {
          _getCartItemProduct(item.sku);
        }
      }
    });
  }

  renderCartProductList() {
    const { items } = this.props;

    if (items.length === 0) {
      return <Text>Cart Empty! Add some products.</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <CartList items={items} />
        <Button title="Place order" onPress={() => console.log('Do something')} />
      </View>
    );
  }

  renderContent() {
    const {
      loading,
      error,
      items,
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }

    if (items) {
      return this.renderCartProductList();
    }

    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { cart, products, loading, error } = state[CART];
  const { items } = cart;
  return {
    loading,
    error,
    items, // Product list from cart API
    products, // Product Detail data, fetched manually
  };
};

export default connect(mapStateToProps, {
  getCustomerCart,
  getCartItemProduct,
})(Cart);
