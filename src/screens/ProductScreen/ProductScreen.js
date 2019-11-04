import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import {
  NAVIGATION_LOGIN_SCREEN,
  NAVIGATION_CART_SCREEN,
} from '../../navigation/types';
import { ThemeContext } from '../../theme';
import Status from '../../magento/Status';
import { ProductType } from '../../types';
import { translate } from '../../i18n';

/**
 * Screen to display product description and detail.
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
 */
const ProductScreen = ({
  children,
  attributes,
  options,
  navigation, // From react-navigation
}) => {
  const theme = useContext(ThemeContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const params = navigation && navigation.state.params ? navigation.state.params : {};
  const {
    product: {
      sku,
      custom_attributes: customAttributes,
      type_id: productType,
      price,
    }
  } = params;
  console.log('---');
  console.log('Selected Product', selectedProduct);

  useEffect(() => {
    calculatedSelectedProduct();
  }, [selectedOptions]);

  function calculatedSelectedProduct() {
    let _selectedProduct = null;
    if (options.length !== 0 && options.length === Object.keys(selectedOptions).length) {
      _selectedProduct = findSelectedProduct();
    }
    if (_selectedProduct != null) {
      setSelectedProduct(_selectedProduct);
    }
  }

  function findSelectedProduct() {
    const selectedOptionsWithNameAsKey = Object.keys(selectedOptions).reduce((total, selectedOptionKey) => ({
      ...total,
      [attributes[selectedOptionKey].attributeCode]: selectedOptions[selectedOptionKey],
    }), {});
    return children.find(child => Object.keys(selectedOptionsWithNameAsKey).every(attributeKey => isAttributeAndValuePresent(child, attributeKey, selectedOptionsWithNameAsKey[attributeKey])));
  }

  function isAttributeAndValuePresent(child, attributeCode, attributeValue) {
    return child.custom_attributes.some(customAttribute => customAttribute.attribute_code === attributeCode && customAttribute.value === attributeValue)
  }

  return (
    <GenericTemplate
      isScrollable
      status={Status.SUCCESS}
      footer={(
        <CTAButtons
          sku={sku}
          productType={productType}
          selectedProduct={selectedProduct}
          selectedOptions={selectedOptions}
          quantity={quantity}
        />
      )}
    >
      <View style={styles.imageContainer(theme.dimens.productDetailPageSliderHeight)}>
        <SliderContainer sku={sku} />
      </View>
      <View style={styles.defaultStyles(theme)}>
        <PriceContainer
          sku={sku}
          productType={productType}
          price={price}
          selectedProduct={selectedProduct}
        />
      </View>
      {productType === 'configurable' && (
        <View style={[styles.defaultStyles(theme), styles.optionsContainer(theme)]}>
          <OptionsContainer
            sku={sku}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            setSelectedProduct={setSelectedProduct}
          />
        </View>
      )}
      <View style={styles.defaultStyles(theme)}>
        <DescriptionContainer customAttributes={customAttributes} />
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
  title: navigation.getParam('title', translate('productScreen.title')),
  headerRight: (
    <MaterialAppbarButtons>
      <Item title={translate('productScreen.menu.cart')} iconName="shopping-cart" onPress={() => (magento.isCustomerLogin() ? navigation.navigate(NAVIGATION_CART_SCREEN) : navigation.navigate(NAVIGATION_LOGIN_SCREEN))} />
    </MaterialAppbarButtons>
  ),
});

ProductScreen.propTypes = {
  children: PropTypes.arrayOf(ProductType),
  options: PropTypes.arrayOf(PropTypes.shape({
    attribute_id: PropTypes.string,
    id: PropTypes.number,
    label: PropTypes.string,
    position: PropTypes.number,
    product_id: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.shape({
      value_index: PropTypes.number.isRequired,
    })),
  })),
  attributes: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

ProductScreen.defaultProps = {
  children: [],
  options: [],
  attributes: {},
};

const mapStateToProps = ({ product }, { navigation }) => {
  const {
    state: { params: { product: { sku } } }
  } = navigation;
  const {
    current: {
      [sku]: {
        children,
        options,
      }
    },
    attributes
  } = product;
  return {
    children,
    options,
    attributes,
  };
};

export default connect(mapStateToProps)(ProductScreen);
