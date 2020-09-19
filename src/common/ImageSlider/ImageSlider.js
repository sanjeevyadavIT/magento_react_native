import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Image from '../Image/Image';

// TODO: Show title over the image
// TODO: Open url, when image pressed
class ImageSliderItem {
  constructor(title, image, onPressLink) {
    this.imageTitle = title;
    this.imageUrl = image;
    this.callToAction = onPressLink;
  }
}

const propTypes = {
  imageHeight: PropTypes.number.isRequired,
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)).isRequired,
  baseUrl: PropTypes.string.isRequired,
  resizeMode: PropTypes.oneOf([
    'cover',
    'contain',
    'stretch',
    'repeat',
    'center',
  ]),
  autoplay: PropTypes.bool,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
};

const defaultProps = {
  resizeMode: 'cover',
  style: {},
  autoplay: true,
  onPress: () => {},
};

const ImageSlider = ({
  imageHeight, // Required prop
  slider, // Required prop
  baseUrl, // Required prop
  /**
   * Set it to true, for auto rotate of image,
   * default value is true
   */
  autoplay,
  resizeMode,
  style,
  onPress,
}) => {
  const renderImages = () =>
    slider.map((item, index) => (
      <TouchableWithoutFeedback onPress={() => onPress(index)}>
        <Image
          key={String(index)}
          style={[styles.imageStyle, { height: imageHeight }]}
          resizeMode={resizeMode}
          source={{ uri: `${baseUrl}${item.imageUrl}` }}
        />
      </TouchableWithoutFeedback>
    ));

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
    top: 0,
  },
});

ImageSlider.propTypes = propTypes;

ImageSlider.defaultProps = defaultProps;

export default ImageSlider;
export { ImageSliderItem };
