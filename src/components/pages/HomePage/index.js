import React, { useEffect } from 'react';
import { useSelector, useActions } from 'react-redux';
import { HomePageTemplate, MaterialAppbarButtons, Item } from '../..';
import { HomeSliderContainer, FeaturedCategoriesContainer } from '../../../containers';
import { initMagento } from '../../../actions';
import { HOME } from '../../../reducers/types';
import { BRAND_NAME, HOME_PAGE_SLIDER_HEIGHT } from '../../../constants';
import { magento } from '../../../magento';
import Status from '../../../magento/Status';
import {
  NAVIGATION_SEARCH_SCREEN_PATH,
  NAVIGATION_WISHLIST_SCREEN_PATH,
  NAVIGATION_LOGIN_SCREEN_PATH,
  NAVIGATION_CART_SCREEN_PATH,
} from '../../../navigation/types';

const HomePage = () => {
  const status = useSelector(state => state[HOME].status);
  const errorMessage = useSelector(state => state[HOME].errorMessage);
  const initializeApp = useActions(() => initMagento(), []);

  useEffect(() => {
    // componentDidMount
    if (status === Status.DEFAULT) {
      initializeApp();
    }
  }, []);

  return (
    <HomePageTemplate
      status={status}
      errorMessage={errorMessage}
      imageSlider={<HomeSliderContainer imageHeight={HOME_PAGE_SLIDER_HEIGHT} />}
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
      <Item title="Wishlist" iconName="bookmark" onPress={() => magento.isCustomerLogin() ? navigation.navigate(NAVIGATION_WISHLIST_SCREEN_PATH) : navigation.navigate(NAVIGATION_LOGIN_SCREEN_PATH)} />
      <Item title="Cart" iconName="shopping-cart" onPress={() => magento.isCustomerLogin() ? navigation.navigate(NAVIGATION_CART_SCREEN_PATH) : navigation.navigate(NAVIGATION_LOGIN_SCREEN_PATH)} />
    </MaterialAppbarButtons>
  ),
});

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
