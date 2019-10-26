import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { magento } from '../../../../magento';
import { ImageSlider, ImageSliderItem, GenericTemplate } from '../../../../components';
import Status from '../../../../magento/Status';
import { ThemeContext } from '../../../../theme';

const SliderContainer = ({
  /**
   * Currently selected product sku
   * used in connect function
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
   * Style to modify GenericTemplateView
   */
  style,
}) => {
  console.log('^^^^^^^^^^^^^^^^');
  console.log('SliderContainer', slider);
  const theme = useContext(ThemeContext);

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
        slider={slider}
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
  sku: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(Status)).isRequired, // redux
  errorMessage: PropTypes.string, // redux
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)), // redux
  style: PropTypes.object,
};

SliderContainer.defaultProps = {
  errorMessage: '',
  style: {},
  slider: null,
};

const mapStateToProps = ({ product }, ownProps) => {
  const {
    current: {
      [ownProps.sku]: {
        medias: slider,
        mediaStatus: status,
        mediaErrorMessage: errorMessage,
      }
    }
  } = product;
  return {
    slider,
    status,
    errorMessage,
  };
};

export default connect(mapStateToProps)(SliderContainer);
