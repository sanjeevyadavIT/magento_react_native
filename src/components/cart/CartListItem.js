import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BORDER_COLOR } from '../../constants';
import { removeItemFromCart } from '../../actions';
import { getProductThumbnailFromAttribute } from '../../utils';
import { CART } from '../../reducers/types';

class CartListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onPressRemoveItem = this.onPressRemoveItem.bind(this);
  }

  onPressRemoveItem() {
    const { item } = this.props;
    Alert.alert(
      'You sure?',
      `Just double-checking you wanted to remove the item: ${item.name}`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
        { text: 'Remove it', onPress: () => this.performRemoveItem() },
      ],
      { cancelable: true }
    );
  }

  getImageUrl = () => {
    const { products, item } = this.props;
    if (products[item.sku]) {
      return getProductThumbnailFromAttribute(products[item.sku]);
    }
    return null;
  }

  performRemoveItem() {
    const { item, removeItemFromCart: _removeItemFromCart } = this.props;
    _removeItemFromCart(item.item_id);
  }

  render() {
    const { item, products } = this.props;
    const { name, price, qty } = item;
    const { mainContainer, infoContainer } = styles;
    return (
      <View
        style={mainContainer}
      >
        <Image
          style={{ flex: 1, height: 120, width: 120 }}
          resizeMode="contain"
          source={{ uri: this.getImageUrl() }}
        />
        <View style={infoContainer}>
          <Text>{name}</Text>
          <Text>{`price :`}{price}</Text>
          <Text>{'qty : '}{qty}</Text>
        </View>
        <Icon name="close" size={30} color="#000" onPress={this.onPressRemoveItem} />
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  infoContainer: {
    flex: 1,
  }
};

CartListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { products } = state[CART];

  return {
    products,
  }
}

export default connect(mapStateToProps, {
  removeItemFromCart
})(CartListItem);
