import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GenericTemplate } from '../..';
import Status from '../../../magento/Status';
import { ThemeContext } from '../../../config';

/**
 * This template describes the layout of Home Page
 */
const HomePageTemplate = ({
  imageSlider,
  featuredCategories,
  children,
  status,
  networkConnected,
  errorMessage,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <GenericTemplate
      isScrollable
      status={status}
      networkConnected={networkConnected}
      errorMessage={errorMessage}
    >
      <View style={styles.imageSliderContainer(theme)}>
        {imageSlider}
      </View>
      <View style={styles.featuredCategoriesContainer}>
        {featuredCategories}
      </View>
      {children}
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  imageSliderContainer: theme => ({
    height: theme.dimens.homePageSliderHeight,
  }),
  featuredCategoriesContainer: {}
});

HomePageTemplate.propTypes = {
  imageSlider: PropTypes.element.isRequired,
  featuredCategories: PropTypes.element.isRequired,
  children: PropTypes.element,
  networkConnected: PropTypes.bool,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
};

HomePageTemplate.defaultProps = {
  children: <></>,
  status: Status.SUCCESS,
  networkConnected: false,
  errorMessage: '',
};

export default HomePageTemplate;
