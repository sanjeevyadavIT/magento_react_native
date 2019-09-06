import React, { useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { magento } from '../../../../../magento';
import { ImageSlider, ImageSliderItem, GenericTemplate } from '../../../..';
import { getProductMedia } from '../../../../../store/actions';
import Status from '../../../../../magento/Status';
import { ThemeContext } from '../../../../../config';

const SliderContainer = ({
  /**
   * @redux Currently selected product sku
   */
  sku,
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
   * @redux if all available option has been selected for `configurable` type product,
   * selectedProductUrl will reflect the `simple` product image deduce from those options
   */
  selectedProductUrl,
  /**
   * @redux function to fetch images of the product based on the sku
   */
  getProductMedia: _getProductMedia,
  /**
   * Style to modify GenericTemplateView
   */
  style,
}) => {
  console.log('^^^^^^^^^^^^^^^^')
  console.log('SliderContainer', slider, selectedProductUrl);
  const theme = useContext(ThemeContext);
  useEffect(() => {
    // componentDidMount
    if (!slider || !slider.length) {
      _getProductMedia(sku);
    }
  }, []);

  return (
    <GenericTemplate
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={style}
    >
      <ImageSlider
        style={styles.imageContainer(theme)}
        imageHeight={theme.dimens.productDetailPageSliderHeight}
        slider={(selectedProductUrl ? slider.unshift(new ImageSliderItem('', selectedProductUrl, '')) && slider : slider)}
        baseUrl={magento.getProductMediaUrl()}
        resizeMode="contain"
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  imageContainer: theme => ({
    backgroundColor: theme.colors.white,
  })
});

SliderContainer.propTypes = {
  sku: PropTypes.string.isRequired, // redux
  status: PropTypes.oneOf(Object.values(Status)).isRequired, // redux
  errorMessage: PropTypes.string, // redux
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)), // redux
  selectedProductUrl: PropTypes.string, // redux
  getProductMedia: PropTypes.func.isRequired, // redux
  style: PropTypes.object,
};

SliderContainer.defaultProps = {
  errorMessage: '',
  style: {},
  slider: null,
  selectedProductUrl: undefined,
};

/**
 * @todo - mapStateToProps has become too complex, functionality can be extracted out
 */
const mapStateToProps = (state) => {
  const {
    detail: { sku, children, options },
    mediaStatus: status,
    mediaErrorMessage: errorMessage,
    medias: { [sku]: sliderData },
    selectedProduct,
  } = state.product;
  let slider;
  if (sliderData && sliderData.length > 0) {
    slider = [...sliderData];
  }
  let selectedProductUrl;
  if (selectedProduct) {
    const { value } = selectedProduct.custom_attributes.find(customAttribute => customAttribute.attribute_code === 'image');
    selectedProductUrl = value;
  }

  if (slider && slider.some(sliderItem => sliderItem.imageUrl === selectedProductUrl)) {
    selectedProductUrl = undefined;
  }
  return {
    sku,
    children,
    options,
    slider,
    status: slider ? Status.SUCCESS : status,
    errorMessage,
    selectedProductUrl,
  };
};

export default connect(mapStateToProps, {
  getProductMedia
})(SliderContainer);
