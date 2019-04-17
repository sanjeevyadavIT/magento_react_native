import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
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
    const { media, loading, error } = this.props;

    if (error) {
      return <Text>{error}</Text>;
    }

    if (loading) {
      return <Spinner />;
    }

    if (media) {
      return (
        <Swiper
          showsPagination
          pagingEnabled
        >
          {this.renderMediaItems()}
        </Swiper>
      );
    }
    return null;
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

ProductMedia.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  media: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ProductMedia.defaultProps = {
  media: null,
  error: null,
};

export default ProductMedia;
