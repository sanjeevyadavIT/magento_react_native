import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { magento } from '../../../magento';
import { ImageSlider } from '../../../components';
import { HOME } from '../../../reducers/types';

/**
 * Note: When using connect instead of creating it as a component,
 * it is rerendering multiple times despite, no chnage in state[HOME].slider object
 * 
 * const mapStateToProps = state => ({ slider: state[HOME].slider });
 * const HomeSliderContainer = connect(mapStateToProps)(ImageSlider);
 */
const HomeSliderContainer = ({ imageHeight }) => {
  const { slider } = useSelector(state => state[HOME]);
  return (
    <ImageSlider imageHeight={imageHeight} slider={slider} baseUrl={magento.getMediaUrl()} />
  );
};

HomeSliderContainer.propTypes = {
  imageHeight: PropTypes.number.isRequired,
};

export default HomeSliderContainer;
