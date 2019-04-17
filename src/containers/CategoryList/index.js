import React from 'react';
import { View, Text, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import { getCategoryProducts, setCurrentProduct } from '../../actions';
import { CATEGORY_LIST } from '../../reducers/types';
import { BRAND_NAME, BORDER_COLOR } from '../../constants';
import { ProductList, Spinner, MaterialHeaderButtons, Item } from '../../components/common';

class CategoryList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', BRAND_NAME),
    headerRight: (
      <MaterialHeaderButtons>
        <Item title="sort" iconName="sort" onPress={navigation.getParam('showSortDialog')} />
      </MaterialHeaderButtons>
    ),
  })

  constructor(props) {
    super(props);
    this.onEndReached = this.onEndReached.bind(this);
    this.showSortDialog = this.showSortDialog.bind(this);
    this.state = {
      categoryId: props.navigation.getParam('id', -1),
      sortDialogVisible: false,
      sortOrder: null,
    };
  }

  componentDidMount() {
    const {
      navigation,
      getCategoryProducts: _getCategoryProducts,
    } = this.props;
    const { categoryId } = this.state;
    _getCategoryProducts(categoryId);
    navigation.setParams({ showSortDialog: this.showSortDialog });
  }

  componentWillUnmount() {
    this.setState({ sortDialogVisible: false });
  }

  onEndReached() {
    const {
      products,
      loadingMore,
      canLoadMoreContent,
      getCategoryProducts: _getCategoryProducts,
    } = this.props;
    const { categoryId } = this.state;
    const { sortOrder } = this.state;

    if (!loadingMore && canLoadMoreContent) {
      _getCategoryProducts(categoryId, products.length, sortOrder);
    }
  }

  showSortDialog() {
    console.log('muhaaa!')
    this.setState({ sortDialogVisible: true });
  }

  performSort(val) {
    const { getCategoryProducts: _getCategoryProducts } = this.props;
    const { categoryId } = this.state;
    _getCategoryProducts(categoryId, null, val);
    this.setState({ sortOrder: val, sortDialogVisible: false });
  }

  // TODO: Dirty code, need to abstract it into a dialog
  renderSortDialog() {
    const { sortDialogVisible } = this.state;
    return (
      <Modal
        transparent
        animationType="slide"
        visible={sortDialogVisible}
      >
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000004d' }}>
          <View style={{ backgroundColor: '#fff', padding: 8 }}>
            <TouchableHighlight style={{ height: 30, justifyContent: 'center', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderColor: BORDER_COLOR }} onPress={() => this.performSort('0')}>
              <Text>name: A to Z</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{ height: 30, justifyContent: 'center', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderColor: BORDER_COLOR }} onPress={() => this.performSort('1')}>
              <Text>name: Z to A</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{ height: 30, justifyContent: 'center', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderColor: BORDER_COLOR }} onPress={() => this.performSort('2')}>
              <Text>price: Low to High</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{ height: 30, justifyContent: 'center', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderColor: BORDER_COLOR }} onPress={() => this.performSort('3')}>
              <Text>price: High to Low</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {
      navigation,
      products,
      canLoadMoreContent,
      setCurrentProduct: _setCurrentProduct,
    } = this.props;

    if (!products) {
      return <Spinner />;
    }

    return (
      <View style={{ flex: 1 }}>
        <ProductList
          products={products}
          columnCount={2}
          onEndReached={this.onEndReached}
          navigate={navigation.navigate}
          setCurrentProduct={_setCurrentProduct}
          canLoadMoreContent={canLoadMoreContent}
        />
        {this.renderSortDialog()}
      </View>

    );
  }
}

const mapStateToProps = (state) => {
  const {
    totalCount,
    products,
    loadingMore,
  } = state[CATEGORY_LIST];
  const canLoadMoreContent = products ? products.length < totalCount : false;

  return {
    products, totalCount, canLoadMoreContent, loadingMore
  };
};

export default connect(mapStateToProps, {
  getCategoryProducts,
  setCurrentProduct,
})(CategoryList);
