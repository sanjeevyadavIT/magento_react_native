import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNetInfo } from '@react-native-community/netinfo';
import { HomePageTemplate, MaterialAppbarButtons, Item } from '../..';
import {
  SliderContainer,
  FeaturedCategoriesContainer
} from './containers';
import { onAppStart } from '../../../store/actions';
import { BRAND_NAME } from '../../../constants';
import { magento } from '../../../magento';
import Status from '../../../magento/Status';
import {
  NAVIGATION_SEARCH_SCREEN_PATH,
  NAVIGATION_LOGIN_SCREEN_PATH,
  NAVIGATION_CART_SCREEN_PATH,
} from '../../../navigation/types';

/**
 * ===================================================================
 * ========================= GUIDELINES ==============================
 * ===================================================================
 *
 * 1. Don't use destructring while accessing state from useSelector
 * 2. In any page, access only those variable from store that don't change again and again
 * for state that change often, extract it into a container, to reduce entire rendering of page
 *
 * @param {Object}  props               - props associated with the component
 * @param {boolean} props.status        - (From Redux) state of the {@link HomePage} component
 *                                        whether in loading, completed or failed condition, to
 *                                        display data accordingly
 * @param {string} props.errorMessage   - (From Redux) message to display, in case app failed to load
 * @param {function} props.onAppStart   - (From Redux) perform internet check, and app configuration to call API
 */
const HomePage = ({
  status,
  errorMessage,
  onAppStart: _onAppStart
}) => {
  const netInfo = useNetInfo();
  useEffect(() => {
    // componentDidMount
    if ((status === Status.DEFAULT || status === Status.ERROR)) {
      _onAppStart();
    }
  }, [netInfo.isConnected]);

  return (
    <HomePageTemplate
      networkConnected={netInfo.isConnected}
      status={status}
      errorMessage={errorMessage}
      imageSlider={<SliderContainer />}
      featuredCategories={<FeaturedCategoriesContainer />}
    />
  );
};

HomePage.navigationOptions = ({ navigation }) => ({
  title: BRAND_NAME,
  headerLeft: (
    <MaterialAppbarButtons>
      <Item title="menu" iconName="menu" onPress={() => navigation.toggleDrawer()} />
    </MaterialAppbarButtons>
  ),
  headerRight: (
    <MaterialAppbarButtons>
      <Item title="Search" iconName="search" onPress={() => navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH)} />
      <Item title="Cart" iconName="shopping-cart" onPress={() => (magento.isCustomerLogin() ? navigation.navigate(NAVIGATION_CART_SCREEN_PATH) : navigation.navigate(NAVIGATION_LOGIN_SCREEN_PATH))} />
    </MaterialAppbarButtons>
  ),
});

HomePage.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired, // redux
  errorMessage: PropTypes.string, // redux
};

HomePage.defaultProps = {
  errorMessage: '',
};

const mapStateToProps = ({ home }) => {
  const { status, errorMessage } = home;
  return {
    status,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  onAppStart
})(HomePage);
