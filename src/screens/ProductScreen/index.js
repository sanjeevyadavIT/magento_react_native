import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  MaterialAppbarButtons,
  Item,
  GenericTemplate,
} from '../../components';
import {
  SliderContainer,
  PriceContainer,
  OptionsContainer,
  DescriptionContainer,
  CTAButtons,
} from './containers';
import { magento } from '../../magento';
import { PRODUTC_DETAIL_PAGE_TITLE } from '../../constants';
import {
  NAVIGATION_LOGIN_SCREEN,
  NAVIGATION_CART_SCREEN,
} from '../../navigation/types';
import { ThemeContext } from '../../theme';
import Status from '../../magento/Status';

/**
 * Screen to display product description and detail.
 * Uses {@link ProductScreenTemplate} for styling and structuring
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
const ProductScreen = ({
  hasOptions
}) => {
  const theme = useContext(ThemeContext);
  return (
    <GenericTemplate
      isScrollable
      status={Status.SUCCESS}
      footer={<CTAButtons />}
    >
      <View style={styles.imageContainer(theme.dimens.productDetailPageSliderHeight)}>
        <SliderContainer />
      </View>
      <View style={styles.defaultStyles(theme)}>
        <PriceContainer />
      </View>
      {hasOptions && (
        <View style={[styles.defaultStyles(theme), styles.optionsContainer(theme)]}>
          <OptionsContainer />
        </View>
      )}
      <View style={styles.defaultStyles(theme)}>
        <DescriptionContainer />
      </View>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  defaultStyles: theme => ({
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing.large,
    padding: theme.spacing.large,
  }),
  imageContainer: height => ({
    height
  }),
  optionsContainer: theme => ({
    minHeight: theme.dimens.optionBoxMinHeight,
  }),
});

ProductScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', PRODUTC_DETAIL_PAGE_TITLE),
  headerRight: (
    <MaterialAppbarButtons>
      <Item title="Cart" iconName="shopping-cart" onPress={() => (magento.isCustomerLogin() ? navigation.navigate(NAVIGATION_CART_SCREEN) : navigation.navigate(NAVIGATION_LOGIN_SCREEN))} />
    </MaterialAppbarButtons>
  ),
});

ProductScreen.propTypes = {
  hasOptions: PropTypes.bool.isRequired, // Redux
};

ProductScreen.defaultProps = {};

const mapStateToProps = (state) => {
  const { hasOptions } = state.product;
  return {
    hasOptions
  };
};

export default connect(mapStateToProps)(ProductScreen);
