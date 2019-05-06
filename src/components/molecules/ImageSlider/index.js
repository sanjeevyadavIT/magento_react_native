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
  showTitle,
  imageHeight,
  slider,
  baseUrl,
  resizeMode,
  style,
  ...props
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
  slider: PropTypes.arrayOf(
    PropTypes.instanceOf(ImageSliderItem)
  ), // redux prop
  imageHeight: PropTypes.number.isRequired,
  showTitle: PropTypes.bool,
  baseUrl: PropTypes.string.isRequired,
  resizeMode: PropTypes.string,
  style: PropTypes.object,
};

ImageSlider.defaultProps = {
  slider: [],
  showTitle: false,
  resizeMode: 'cover',
  style: {},
};

export default ImageSlider;
export { ImageSliderItem };
