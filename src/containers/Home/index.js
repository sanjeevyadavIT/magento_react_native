import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { initMagento, getCategoryTree } from '../../actions';
import { HOME, CATEGORY_TREE } from '../../reducers/types';
import { BRAND_NAME } from '../../constants';
import { MaterialHeaderButtons, Item } from '../../components/common';
import {
  NAVIGATION_CATEGORY_TREE_PATH,
  NAVIGATION_SEARCH_SCREEN_PATH,
  NAVIGATION_WISHLIST_SCREEN_PATH,
  NAVIGATION_CART_SCREEN_PATH,
} from '../../routes/types';
import { magento } from '../../magento';

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
        <Item title="Wishlist" iconName="bookmark" onPress={() => navigation.navigate(NAVIGATION_WISHLIST_SCREEN_PATH)} />
        <Item title="cart" iconName="shopping-cart" onPress={() => navigation.navigate(NAVIGATION_CART_SCREEN_PATH)} />
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

  openCategoryTreeScreen = () => {
    const { navigation } = this.props;
    navigation.navigate(NAVIGATION_CATEGORY_TREE_PATH);
  }

  toggleDrawer() {
    const {
      navigation,
      getCategoryTree: _getCategoryTree,
      [CATEGORY_TREE]: categoryTree,
    } = this.props;
    if (!categoryTree) {
      _getCategoryTree();
    }
    navigation.toggleDrawer();
  }

  renderHomeContent = () => {
    if (this.props[HOME].content) {
      return (
        <Text>{JSON.stringify(this.props[HOME])}</Text>
      );
    }

    if (this.props[HOME].loading === false) return null;

    return <ActivityIndicator />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 16 }}>
          {this.renderHomeContent()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  [HOME]: state[HOME],
  [CATEGORY_TREE]: state[CATEGORY_TREE],
});

export default connect(mapStateToProps, {
  initMagento,
  getCategoryTree
})(Home);
