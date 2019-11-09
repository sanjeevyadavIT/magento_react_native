import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Image from '../../atoms/Image';

// TODO: Show title over the image
// TODO: Open url, when image pressed
class ImageSliderItem {
  constructor(title, image, onPressLink) {
    this.imageTitle = title;
    this.imageUrl = image;
    this.callToAction = onPressLink;
  }
}

const ImageSlider = ({
  imageHeight, // Required prop
  slider, // Required prop
  baseUrl, // Required prop
  /**
   * Set it to true, for auto rotate of image,
   * default value is true
   */
  autoplay,
  showTitle,
  resizeMode,
  style,
}) => {
  const renderImages = () => (
    slider.map((item, index) => (
      <Image
        key={String(index)}
        style={[styles.imageStyle, { height: imageHeight }]}
        resizeMode={resizeMode}
        source={{ uri: `${baseUrl}${item.imageUrl}` }}
      />
    ))
  );

  return (
    <Swiper
      autoplay={autoplay}
      containerStyle={[{ height: imageHeight }, style]}
    >
      {renderImages()}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    top: 0
  }
});

ImageSlider.propTypes = {
  imageHeight: PropTypes.number.isRequired,
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)).isRequired,
  baseUrl: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
  autoplay: PropTypes.bool,
  style: PropTypes.object,
};

ImageSlider.defaultProps = {
  showTitle: false,
  resizeMode: 'cover',
  style: {},
  autoplay: true,
};

export default ImageSlider;
export { ImageSliderItem };
