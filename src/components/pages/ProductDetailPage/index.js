import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ProductDetailPageTemplate,
  Button,
  MaterialAppbarButtons,
  Item,
} from '../..';
import {
  SliderContainer,
  PriceContainer,
  OptionsContainer,
  DescriptionContainer,
  CTAButtons
} from './containers';
import { magento } from '../../../magento';
import { PRODUTC_DETAIL_PAGE_TITLE } from '../../../constants';
import {
  NAVIGATION_LOGIN_SCREEN,
  NAVIGATION_CART_SCREEN,
} from '../../../navigation/types';

/**
 * Screen to display product description and detail.
 * Uses {@link ProductDetailPageTemplate} for styling and structuring
 * and indivdiual containers component that have access to state
 *
 * @todo - Fix WebView height
 *
 * @todo - No check in `configurable` type product to disable certain
 *         options which are not available
 *         Example: suppose in size `s` color `red` is not avilable,
 *         so when user select size `s`, `red` option should be disabled.
 *
 * @todo - No check written to check whether product is out of stock or not,
 *         if out of stock, disable `add-to-cart` button
 *
 * @todo - Add input box to let user enter quantity of that product for cart
 *         currently defaults to 1
 *
 * @param {Object}  props            - props associated with the component
 * @param {boolean} props.hasOptions - (From Redux) In case of `configurable` type product,
 *                                     show picker to choose options.
 */
const ProductDetailPage = ({
  hasOptions
}) => (
  <ProductDetailPageTemplate
    sliderContainer={<SliderContainer />}
    priceContainer={<PriceContainer />}
    hasOptions={hasOptions}
    optionsContainer={<OptionsContainer />}
    descriptionContainer={<DescriptionContainer />}
    footer={<CTAButtons />}
  />
);

ProductDetailPage.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', PRODUTC_DETAIL_PAGE_TITLE),
  headerRight: (
    <MaterialAppbarButtons>
      <Item title="Cart" iconName="shopping-cart" onPress={() => (magento.isCustomerLogin() ? navigation.navigate(NAVIGATION_CART_SCREEN) : navigation.navigate(NAVIGATION_LOGIN_SCREEN))} />
    </MaterialAppbarButtons>
  ),
});

ProductDetailPage.propTypes = {
  hasOptions: PropTypes.bool.isRequired, // Redux
};

ProductDetailPage.defaultProps = {};

const mapStateToProps = (state) => {
  const { hasOptions } = state.product;
  return {
    hasOptions
  };
};

export default connect(mapStateToProps)(ProductDetailPage);
