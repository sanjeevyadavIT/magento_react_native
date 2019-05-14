import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { magento } from '../../../magento';
import { ImageSlider, GenericTemplate } from '../../../components';
import { PRODUCT } from '../../../reducers/types';
import { getProductMedia } from '../../../actions';

const ProductSliderContainer = ({
  sku,
  imageHeight,
  style,
  ...props
}) => {
  const dispatch = useDispatch();
  const { mediaStatus: status, mediaErrorMessage: errorMessage } = useSelector(state => state[PRODUCT]);
  const { [sku]: slider } = useSelector(state => state[PRODUCT].medias);

  useEffect(() => {
    // componentDidMount
    if (!slider) {
      dispatch(getProductMedia(sku));
    }
  }, []);

  return (
    <GenericTemplate
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={style}
      {...props}
    >
      <ImageSlider 
        style={styles.imageContainer}
        imageHeight={imageHeight}
        slider={slider}
        baseUrl={magento.getProductMediaUrl()}
        resizeMode="contain"
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'white',
  }
});

ProductSliderContainer.propTypes = {
  sku: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
};

ProductSliderContainer.defaultProps = {};

export default ProductSliderContainer;
