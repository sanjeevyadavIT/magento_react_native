import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CartListItem from './CartListItem';

// TODO: Make it a functional component
class CartList extends React.Component {
  renderChild = ({ item, index }) => {
    return (
      <CartListItem
        item={item}
        index={index}
      />
    );
  }

  renderTotal() {
    const { items } = this.props;

    let sum = 0;
    if (items) {
      items.forEach((item) => {
        sum += item.price * item.qty;
      });
    }

    return sum.toFixed(2);
  }


  renderFooter = () => {
    return <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total : {this.renderTotal()}</Text>;
  }

  renderList = () => {
    const { items } = this.props;

    return (
      <FlatList
        style={{ paddingTop: 8 }}
        data={items}
        renderItem={this.renderChild}
        keyExtractor={(item, index) => String(item.item_id)}
        ListFooterComponent={this.renderFooter}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderList()}
      </View>
    );
  }
}

CartList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
};

export default CartList;
