import React, { useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getCartItemProduct, removeItemFromCart } from '../../../../store/actions';
import { getProductThumbnailFromAttribute } from '../../../../utils';
import { Card, Image, Text } from '../../..';

// NOTE: Is it better to create a wapper around CartListItem and extract state in it?
// It is in organisms folder because it is state aware
// TODO: Extract strings in strings.js
const CartListItem = ({ item }) => {
  const dispatch = useDispatch();
  const { [item.sku]: product } = useSelector(state => state.cart.products);

  useEffect(() => {
    // componentDidMount
    if (!item.thumbnail && !product) {
      dispatch(getCartItemProduct(item.sku));
    }
  }, []);

  const onPressRemoveItem = () => {
    Alert.alert(
      'You sure?',
      `Just double-checking you wanted to remove the item: ${item.name}`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
        { text: 'Remove it', onPress: () => dispatch(removeItemFromCart(item.item_id)) },
      ],
      { cancelable: true }
    );
  };

  const getImageUrl = () => (product ? getProductThumbnailFromAttribute(product) : product);

  return (
    <Card style={styles.mainContainer}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: getImageUrl() }}
      />
      <View style={styles.infoContainer}>
        <Text>{item.name}</Text>
        <Text>price : {item.price}</Text>
        <Text>qty : {item.qty}</Text>
      </View>
      <Icon name="close" size={30} color="#000" onPress={onPressRemoveItem} />
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    flex: 1,
    left: 0,
    height: 120,
    width: 120,
  },
  infoContainer: {
    flex: 1,
  }
});

CartListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

CartListItem.defaultProps = {};

export default CartListItem;
