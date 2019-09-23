import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GenericTemplate } from '../..';
import Status from '../../../magento/Status';
import { ThemeContext } from '../../../theme';

/**
 * This template describes the layout of Product Detail page
 */
const ProductDetailPageTemplate = ({
  sliderContainer,
  priceContainer,
  hasOptions,
  optionsContainer,
  descriptionContainer,
  footer,
  children,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <GenericTemplate
      isScrollable
      status={Status.SUCCESS}
      footer={footer}
    >
      <View style={styles.imageContainer(theme.dimens.productDetailPageSliderHeight)}>
        {sliderContainer}
      </View>
      <View style={styles.defaultStyles(theme)}>
        {priceContainer}
      </View>
      {hasOptions && (
        <View style={[styles.defaultStyles(theme), styles.optionsContainer(theme)]}>
          {optionsContainer}
        </View>
      )}
      <View style={styles.defaultStyles(theme)}>
        {descriptionContainer}
      </View>
      {children}
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

ProductDetailPageTemplate.propTypes = {
  sliderContainer: PropTypes.element.isRequired,
  priceContainer: PropTypes.element.isRequired,
  hasOptions: PropTypes.bool.isRequired,
  optionsContainer: PropTypes.element.isRequired,
  descriptionContainer: PropTypes.element.isRequired,
  footer: PropTypes.element,
  children: PropTypes.element,
};

ProductDetailPageTemplate.defaultProps = {
  children: <></>,
  footer: <></>
};

export default ProductDetailPageTemplate;
