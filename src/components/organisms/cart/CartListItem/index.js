import React, { useEffect, useContext } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getCartItemProduct, removeItemFromCart } from '../../../../store/actions';
import { getProductThumbnailFromAttribute } from '../../../../utils';
import { Card, Image, Text } from '../../..';
import { ThemeContext } from '../../../../theme';

// NOTE: Is it better to create a wapper around CartListItem and extract state in it?
// It is in organisms folder because it is state aware
// TODO: Extract strings in strings.js
const CartListItem = ({ item, currencySymbol }) => {
  const theme = useContext(ThemeContext);
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
    <Card style={styles.mainContainer(theme)}>
      <Image
        style={styles.image(theme)}
        resizeMode="contain"
        source={{ uri: getImageUrl() }}
      />
      <View style={styles.infoContainer}>
        <Text>{item.name}</Text>
        <Text>{`Price: ${currencySymbol}${product ? product.price : item.price}`}</Text>
        <Text>qty : {item.qty}</Text>
      </View>
      <Icon name="close" size={30} color="#000" onPress={onPressRemoveItem} />
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: theme => ({
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: theme.spacing.small,
    marginRight: theme.spacing.small,
    marginBottom: theme.spacing.small,
  }),
  image: theme => ({
    flex: 1,
    left: 0,
    height: theme.dimens.cartListImageHeight,
    width: theme.dimens.cartListImageWidth,
  }),
  infoContainer: {
    flex: 1,
  }
});

CartListItem.propTypes = {
  item: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

CartListItem.defaultProps = {};

export default CartListItem;
