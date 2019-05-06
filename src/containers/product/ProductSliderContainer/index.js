import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useActions } from 'react-redux';
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
  const status = useSelector(state => state[PRODUCT].mediaStatus);
  const errorMessage = useSelector(state => state[PRODUCT].mediaErrorMessage);
  const slider = useSelector(state => sku in state[PRODUCT].medias ? state[PRODUCT].medias[sku] : null);
  const dispatchGetProductMediaAction = useActions(() => getProductMedia(sku), []);

  useEffect(() => {
    // componentDidMount
    if (!slider) {
      dispatchGetProductMediaAction();
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
        resizeMode="contain"
        baseUrl={magento.getProductMediaUrl()}
        slider={slider}
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
