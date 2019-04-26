import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageSlider, { ImageSliderItem } from '../../components/molecules/ImageSlider';
import FeaturedProductList from '../../components/home/FeaturedProductList';
import { initMagento, getCategoryTree, setCurrentProduct } from '../../actions';
import { HOME } from '../../reducers/types';
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

  renderFeaturedCategories() {
    const { featuredCategories, setCurrentProduct: _setCurrentProduct } = this.props;

    return Object.keys(featuredCategories).map(key => (
      <FeaturedProductList
        key={key}
        products={featuredCategories[key].items}
        title={featuredCategories[key].title}
        setCurrentProduct={_setCurrentProduct}
      />
    ));
  }

  renderHomeContent() {
    const { loading, error, slider } = this.props;

    if (loading === null) return null;

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

    return (
      <ScrollView>
        <ImageSlider loading={false} showTitle={false} imageHeight={180} slider={slider} />
        {this.renderFeaturedCategories()}
      </ScrollView>
    );
  }

  render() {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.log(this.props);
    return (
      <View style={styles.container}>
        {this.renderHomeContent()}
      </View>
    );
  }
}

const styles = {
  container: {
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
  const { loading, error, slider, featuredCategories } = state[HOME];

  return {
    loading,
    error,
    slider,
    featuredCategories,
  };
};

Home.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)),
  featuredCategories: PropTypes.object,
};

Home.defaultProps = {
  loading: null,
  error: null,
  slider: [],
  featuredCategories: {},
};

export default connect(mapStateToProps, {
  initMagento,
  getCategoryTree,
  setCurrentProduct,
})(Home);
