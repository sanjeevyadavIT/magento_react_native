import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { magento } from '../../../../magento';
import { ImageSlider } from '../../../../common';
import { DIMENS } from '../../../../constants';

/**
 * Container component for {@link ImageSlider} mounted to HomeScreen
 *
 * @param {Object} props          - props related to component
 * @param {Object[]} props.slider - Array containing image url to be displayed
 */
const HomeSliderContainer = ({ slider }) => {
  return (
    <ImageSlider
      autoplay
      media={slider.map(slide => ({
        source: { uri: `${magento.getMediaUrl()}${slide.image}` },
      }))}
      height={DIMENS.homeScreen.sliderHeight}
    />
  );
};

HomeSliderContainer.propTypes = {
  slider: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = ({ home }) => {
  const { slider } = home;
  return {
    slider,
  };
};

export default connect(mapStateToProps)(HomeSliderContainer);
