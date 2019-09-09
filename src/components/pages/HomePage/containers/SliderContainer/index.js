import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { magento } from '../../../../../magento';
import { ImageSlider, ImageSliderItem } from '../../../..';
import { ThemeContext } from '../../../../../config';

/**
 * State aware container to show Image Slider
 * on Home Page
 *
 * @param {Object} props          - Props related to the component
 * @param {Object[]} props.slider - (From Redux) Array containing Image data
 */
const SliderContainer = ({
  slider,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <ImageSlider
      imageHeight={theme.dimens.homePageSliderHeight}
      slider={slider}
      baseUrl={magento.getMediaUrl()}
    />
  );
};

SliderContainer.propTypes = {
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)), // redux
};

SliderContainer.defaultProps = {
  slider: [],
};

const mapStateToProps = ({ home }) => {
  const { slider } = home;
  return {
    slider,
  };
};

export default connect(mapStateToProps)(SliderContainer);
