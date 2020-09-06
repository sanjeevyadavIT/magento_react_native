import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { magento } from '../../../../magento';
import {
  ImageSlider,
  ImageSliderItem,
  GenericTemplate,
} from '../../../../common';
import Status from '../../../../magento/Status';
import { ThemeContext } from '../../../../theme';
import { ProductType } from '../../../../types';
import { getValueFromAttribute } from '../../../../utils';
import { DIMENS } from '../../../../constants';

const SliderContainer = ({
  /**
   * Currently opened product sku
   * used in connect function
   */
  sku,
  /**
   * If product type === `configurable`,
   * and user has selected options, this will
   * point to one of the children
   */
  selectedProduct,
  /**
   * @redux status of the images loaded or not
   */
  status,
  /**
   * @redux error message if images wern't fetched
   */
  errorMessage,
  /**
   * Array containing images
   */
  slider,
  /**
   * Style to modify GenericTemplateView
   */
  style,
}) => {
  console.log('^^^^^^^^^^^^^^^^');
  console.log('SliderContainer', slider);
  const { theme } = useContext(ThemeContext);
  const selectedProductImage =
    selectedProduct && getValueFromAttribute(selectedProduct, 'image');
  if (selectedProductImage) {
    slider.unshift(new ImageSliderItem('', selectedProduct));
  }

  return (
    <GenericTemplate status={status} errorMessage={errorMessage} style={style}>
      <ImageSlider
        style={styles.imageContainer(theme)}
        imageHeight={DIMENS.productDetailPageSliderHeight}
        slider={slider}
        baseUrl={magento.getProductMediaUrl()}
        resizeMode="contain"
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  imageContainer: theme => ({
    backgroundColor: theme.white,
  }),
});

SliderContainer.propTypes = {
  sku: PropTypes.string.isRequired,
  selectedProduct: PropTypes.oneOfType([null, ProductType]),
  status: PropTypes.oneOf(Object.values(Status)).isRequired, // redux
  errorMessage: PropTypes.string, // redux
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)), // redux
  style: PropTypes.object,
};

SliderContainer.defaultProps = {
  errorMessage: '',
  style: {},
  slider: null,
  selectedProduct: null,
};

const mapStateToProps = ({ product }, ownProps) => {
  const {
    current: {
      [ownProps.sku]: {
        medias: slider,
        mediaStatus: status,
        mediaErrorMessage: errorMessage,
      },
    },
  } = product;
  return {
    slider,
    status,
    errorMessage,
  };
};

export default connect(mapStateToProps)(SliderContainer);
