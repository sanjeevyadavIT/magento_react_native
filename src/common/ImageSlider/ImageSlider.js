import React from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Image from '../Image/Image';

const propTypes = {
  height: PropTypes.number.isRequired,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      source: PropTypes.shape({
        uri: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  resizeMode: PropTypes.oneOf([
    'cover',
    'contain',
    'stretch',
    'repeat',
    'center',
  ]),
  /**
   * Set it to true, for auto rotate of image,
   * default value is false
   */
  autoplay: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
};

const defaultProps = {
  resizeMode: 'cover',
  containerStyle: {},
  autoplay: false,
  onPress: null,
};

// Documentation: https://github.com/leecade/react-native-swiper
const ImageSlider = ({
  height,
  media,
  autoplay,
  resizeMode,
  containerStyle,
  onPress,
  /**
   * Rest of the props from 'react-native-swiper'
   */
  ...props
}) => {
  const ViewGroup = onPress ? TouchableWithoutFeedback : React.Fragment;
  return (
    <View style={[{ height }, containerStyle]}>
      <Swiper height={height} autoplay={autoplay} {...props}>
        {media.map((item, index) => (
          <ViewGroup
            key={String(item.id)}
            {...(onPress && { onPress: () => onPress(index) })}
          >
            <Image
              key={String(item.id)}
              style={[styles.imageStyle, { height }]}
              resizeMode={resizeMode}
              source={item.source}
            />
          </ViewGroup>
        ))}
      </Swiper>
    </View>
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
