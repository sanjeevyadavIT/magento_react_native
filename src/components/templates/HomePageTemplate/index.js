import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GenericTemplate } from '../..';
import Status from '../../../magento/Status';
import { HOME_PAGE_SLIDER_HEIGHT } from '../../../constants';

const HomePageTemplate = ({
  imageSlider,
  featuredCategories,
  children,
  status,
  errorMessage,
  ...props,
}) => (
  <GenericTemplate isScrollable status={status} errorMessage={errorMessage} {...props}>
    <View style={styles.imageSliderContainer}>
      {imageSlider}
    </View>
    <View style={styles.featuredCategoriesContainer}>
      {featuredCategories}
    </View>
    {children}
  </GenericTemplate>
);

const styles = StyleSheet.create({
  imageSliderContainer: {
    height: HOME_PAGE_SLIDER_HEIGHT,
  },
  featuredCategoriesContainer: {}
});

HomePageTemplate.propTypes = {
  imageSlider: PropTypes.element.isRequired,
  featuredCategories: PropTypes.element.isRequired,
  children: PropTypes.any,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
};

HomePageTemplate.defaultProps = {
  children: <></>,
  status: Status.SUCCESS,
  errorMessage: '',
};

export default HomePageTemplate;
