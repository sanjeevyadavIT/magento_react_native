import React from 'react';
import { Text, GenericTemplate } from '../..';

const WishlistPage = () => (
  <GenericTemplate isScrollable={false}>
    <Text style={{ fontSize: 24 }}>Work in progress...</Text>
  </GenericTemplate>
);

WishlistPage.navigationOptions = {
  title: 'Wishlist'
};

WishlistPage.propTypes = {};

WishlistPage.defaultProps = {};

export default WishlistPage;
