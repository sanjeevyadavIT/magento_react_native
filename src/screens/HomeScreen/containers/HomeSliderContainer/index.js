import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { magento } from '../../../../magento';
import { ImageSlider, ImageSliderItem } from '../../../../components';
import { ThemeContext } from '../../../../theme';

/**
 * Container component for {@link ImageSlider} mounted to HomeScreen
 *
 * @param {Object} props          - props related to component
 * @param {Object[]} props.slider - Array containing image url to be displayed
 */
const HomeSliderContainer = ({
  slider,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <ImageSlider
      slider={slider}
      baseUrl={magento.getMediaUrl()}
      imageHeight={theme.dimens.homePageSliderHeight}
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
