import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import HomeSlider from '../../components/home/HomeSlider';
import FeaturedProductList from '../../components/home/FeaturedProductList';
import { initMagento, getCategoryTree, setCurrentProduct } from '../../actions';
import { HOME, CATEGORY_TREE } from '../../reducers/types';
import { BRAND_NAME } from '../../constants';
import { Spinner, MaterialHeaderButtons, Item } from '../../components/common';
import { magento } from '../../magento';
import {
  NAVIGATION_SEARCH_SCREEN_PATH,
  NAVIGATION_WISHLIST_SCREEN_PATH,
  NAVIGATION_LOGIN_SCREEN_PATH,
  NAVIGATION_CART_SCREEN_PATH,
} from '../../navigation/types';

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: BRAND_NAME,
    headerLeft: (
      <MaterialHeaderButtons>
        <Item title="menu" iconName="menu" onPress={navigation.getParam('toggleDrawer')} />
      </MaterialHeaderButtons>
    ),
    headerRight: (
      <MaterialHeaderButtons>
        <Item title="Search" iconName="search" onPress={() => navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH)} />
        <Item title="Wishlist" iconName="bookmark" onPress={() => magento.isCustomerLogin() ? navigation.navigate(NAVIGATION_WISHLIST_SCREEN_PATH) : navigation.navigate(NAVIGATION_LOGIN_SCREEN_PATH)} />
        <Item title="Cart" iconName="shopping-cart" onPress={() => magento.isCustomerLogin() ? navigation.navigate(NAVIGATION_CART_SCREEN_PATH) : navigation.navigate(NAVIGATION_LOGIN_SCREEN_PATH)} />
      </MaterialHeaderButtons>
    ),
  })

  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    const { navigation, initMagento: _initMagento } = this.props;
    _initMagento();
    navigation.setParams({ toggleDrawer: this.toggleDrawer });
  }

  // FIXME: Having catgeory state here, causes Home to rerender, not needed
  toggleDrawer() {
    const {
      navigation,
      categoryTreeData,
      categoryLoading,
      getCategoryTree: _getCategoryTree,
    } = this.props;
    if (!categoryTreeData && !categoryLoading) {
      _getCategoryTree();
    }
    navigation.toggleDrawer();
  }

  renderSlider() {
    const { content } = this.props;
    const homeData = JSON.parse(content);
    return <HomeSlider images={homeData.slider} />
  }

  renderFeaturedCategories() {
    const { featuredProducts, setCurrentProduct: _setCurrentProduct } = this.props;

    return Object.keys(featuredProducts).map(key => (
      <FeaturedProductList
        key={key}
        products={featuredProducts[key].items}
        title={featuredProducts[key].categoryTitle}
        setCurrentProduct={_setCurrentProduct}
      />
    ));
  }

  renderHomeContent() {
    const { loading, error, content } = this.props;

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (loading) {
      return <Spinner />;
    }

    if (content) {
      return (
        <ScrollView>
          {this.renderSlider()}
          {this.renderFeaturedCategories()}
        </ScrollView>
      );
    }

    return null;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHomeContent()}
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7F6F4'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  errorText: {
    textAlign: 'center',
  },
};

const mapStateToProps = (state) => {
  const { loading, error, content, featuredProducts } = state[HOME];
  const { children_data: categoryTreeData, loading: categoryLoading } = state[CATEGORY_TREE];

  return {
    loading,
    error,
    content,
    featuredProducts,
    categoryTreeData,
    categoryLoading
  };
};

export default connect(mapStateToProps, {
  initMagento,
  getCategoryTree,
  setCurrentProduct,
})(Home);
