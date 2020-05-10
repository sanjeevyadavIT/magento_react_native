import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { magento } from '../../../../magento';
import { ImageSlider, ImageSliderItem } from '../../../../common';
import { ThemeContext } from '../../../../theme';
import { DIMENS } from '../../../../constants';

/**
 * Container component for {@link ImageSlider} mounted to HomeScreen
 *
 * @param {Object} props          - props related to component
 * @param {Object[]} props.slider - Array containing image url to be displayed
 */
const HomeSliderContainer = ({
  slider,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ImageSlider
      slider={slider}
      baseUrl={magento.getMediaUrl()}
      imageHeight={DIMENS.homePageSliderHeight}
    />
  );
};

HomeSliderContainer.propTypes = {
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)).isRequired,
};

const mapStateToProps = ({ home }) => {
  const { slider } = home;
  return {
    slider
  };
};

export default connect(mapStateToProps)(HomeSliderContainer);
