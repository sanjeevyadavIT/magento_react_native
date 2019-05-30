import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HomePageTemplate, MaterialAppbarButtons, Item } from '../..';
import { HomeSliderContainer, FeaturedCategoriesContainer } from '../../../containers';
import { initializeApp } from '../../../store/actions';
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
 */
// TODO: imageHeight should be referenced from theme.dimens

const HomePage = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.home.status);
  const errorMessage = useSelector(state => state.home.errorMessage);

  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      dispatch(initializeApp());
    }
  }, []);

  return (
    <HomePageTemplate
      status={status}
      errorMessage={errorMessage}
      imageSlider={<HomeSliderContainer imageHeight={200} />}
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

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
