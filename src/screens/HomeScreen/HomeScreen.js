import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate } from '../../common';
import { HomeSliderContainer, FeaturedCategoriesContainer } from './containers';
import Status from '../../magento/Status';
import { DIMENS } from '../../constants';

const propTypes = {
  /**
   * Tells about the status of the fetch cmsBlockData api call
   * cmsBlockData contains the data need to be shown in HomeScreen
   *
   * if status === Status.DEFAULT => api hasn't been hit yet
   * if status === Status.LOADING => api is currently being executed
   * if status === Status.SUCCESS => success response from api
   * if status === Status.ERROR   => error response from api or error
   *                                 in initMagento generator function in appSagas.js
   *
   * @source redux
   */
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  /**
   * error message if status === Status.ERROR
   *
   * @source redux
   */
  errorMessage: PropTypes.string,
};

const defaultProps = {
  errorMessage: '',
};

const HomeScreen = ({ status, errorMessage }) => {
  return (
    <GenericTemplate scrollable status={status} errorMessage={errorMessage}>
      <View style={styles.imageSliderContainer}>
        <HomeSliderContainer />
      </View>
      <FeaturedCategoriesContainer />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  imageSliderContainer: {
    height: DIMENS.homePageSliderHeight,
  },
});

HomeScreen.propTypes = propTypes;

HomeScreen.defaultProps = defaultProps;

const mapStatetoProps = ({ home }) => {
  const { status, errorMessage } = home;
  return {
    status,
    errorMessage,
  };
};

export default connect(mapStatetoProps)(HomeScreen);
