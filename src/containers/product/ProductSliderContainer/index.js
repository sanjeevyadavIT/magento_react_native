import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { magento } from '../../../magento';
import { ImageSlider, GenericTemplate } from '../../../components';
import { getProductMedia } from '../../../store/actions';

const ProductSliderContainer = ({
  sku,
  imageHeight,
  style,
  ...props
}) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.product.mediaStatus);
  const errorMessage = useSelector(state => state.product.mediaErrorMessage);
  const slider = useSelector(state => (sku in state.product.medias ? state.product.medias[sku] : []));

  useEffect(() => {
    // componentDidMount
    if (!slider.length) {
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
