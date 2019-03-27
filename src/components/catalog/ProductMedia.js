import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Spinner } from '../common';
import { magento } from '../../magento';

class ProductMedia extends React.Component {
  renderMediaItems() {
    const { media } = this.props;

    return media.map(item => (
      <Image
        key={item.id}
        style={styles.imageStyle}
        resizeMode="contain"
        source={{ uri: `${magento.getProductMediaUrl()}${item.file}` }}
      />
    ));
  }

  renderMedia() {
    const { media } = this.props;
    if (!media) {
      return <Spinner />;
    }
    return (
      <Swiper
        showsPagination
        pagingEnabled
      >
        {this.renderMediaItems()}
      </Swiper>
    );
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        {this.renderMedia()}
      </View>
    );
  }
}

const styles = {
  imageContainer: {
    height: 300,
  },
  imageStyle: {
    height: 290,
    top: 0
  }
};

export default ProductMedia;
