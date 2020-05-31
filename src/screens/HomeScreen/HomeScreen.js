import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate } from '../../common';
import { HomeSliderContainer, FeaturedCategoriesContainer } from './containers';
import { ThemeContext } from '../../theme';
import Status from '../../magento/Status';
import { DIMENS } from '../../constants';

/**
 * First screen which is shown to user.
 *
 * @param {Object} props              - props related to the component
 * @param {Object} props.status       - (From redux) status of the network
 *                                      request to fetch store information
 * @param {Object} props.errorMessage - (From redux) error message if network request
 *                                       failed.
 */
const HomeScreen = ({ status, errorMessage }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <GenericTemplate scrollable status={status} errorMessage={errorMessage}>
      <View style={styles.imageSliderContainer(theme)}>
        <HomeSliderContainer />
      </View>
      <FeaturedCategoriesContainer />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  imageSliderContainer: theme => ({
    height: DIMENS.homePageSliderHeight,
  }),
});

HomeScreen.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  errorMessage: PropTypes.string,
};

HomeScreen.defaultProps = {
  errorMessage: '',
};

const mapStatetoProps = ({ home }) => {
  const { status, errorMessage } = home;
  return {
    status,
    errorMessage,
  };
};

export default connect(mapStatetoProps)(HomeScreen);
