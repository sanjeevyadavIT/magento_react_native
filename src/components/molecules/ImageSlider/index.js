import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Image from '../../atoms/Image';
import { LoadingView } from '..';
import { magento } from '../../../magento';

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
  loading,
  showTitle,
  imageHeight,
  slider,
}) => {
  const renderImages = () => (
    slider.map((item, index) => (
      <Image
        key={String(index)}
        style={[styles.imageStyle, { height: imageHeight }]}
        resizeMode="cover"
        source={{ uri: `${magento.getMediaUrl()}${item.imageUrl}` }}
      />
    ))
  );

  if (loading) {
    return <LoadingView />;
  }

  return (
    <Swiper style={{ height: imageHeight }}>
      {renderImages()}
    </Swiper>
  );
};

const styles = {
  imageStyle: {
    top: 0
  }
};

ImageSlider.propTypes = {
  showTitle: PropTypes.bool,
  imageHeight: PropTypes.number.isRequired,
  loading: PropTypes.bool, // redux prop
  slider: PropTypes.arrayOf(
    PropTypes.instanceOf(ImageSliderItem)
  ), // redux prop
};

ImageSlider.defaultProps = {
  slider: [],
  loading: false,
  showTitle: false,
};

export default ImageSlider;
export { ImageSliderItem };
