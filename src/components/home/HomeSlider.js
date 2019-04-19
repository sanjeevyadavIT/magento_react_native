import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { magento } from '../../magento';

class HomeSlider extends React.Component {
  renderImages() {
    const { images } = this.props;

    images.forEach(a => console.log(`${magento.getProductMediaUrl()}${a.image}`))

    return images.map((item, index) => (
      <Image
        key={String(index)}
        style={styles.imageStyle}
        resizeMode="cover"
        source={{ uri: `${magento.getMediaUrl()}${item.image}` }}
      />
    ));
  }

  renderSlider() {
    return (
      <Swiper>
        {this.renderImages()}
      </Swiper>
    );
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        {this.renderSlider()}
      </View>
    )
  }
}

const styles = {
  imageContainer: {
    height: 180,
  },
  imageStyle: {
    height: 180,
    top: 0
  }
};

HomeSlider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  images: PropTypes.array.isRequired
};

export default HomeSlider;
