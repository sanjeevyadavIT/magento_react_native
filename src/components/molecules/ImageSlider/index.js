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
    <Swiper style={[{ height: imageHeight }, style]}>
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
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)).isRequired, // redux prop
  baseUrl: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
  style: PropTypes.object,
};

ImageSlider.defaultProps = {
  showTitle: false,
  resizeMode: 'cover',
  style: {},
};

export default ImageSlider;
export { ImageSliderItem };
