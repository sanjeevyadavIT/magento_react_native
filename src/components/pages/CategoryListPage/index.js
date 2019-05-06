import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { BRAND_NAME} from '../../../constants';
import { MaterialAppbarButtons, Item } from '../..';
import { CategoryListContainer } from '../../../containers';

// FIXME: Code not optimized and not modularized properly
const CategoryListPage = ({
  navigation,
}) => {
  useEffect(() => {
    // componentDidMount
    navigation.setParams({ showSortDialog });
  }, []);

  const showSortDialog = () => {
    console.log('WIP: Show short dialog');
  };

  return (
    <CategoryListContainer style={styles.container} categoryId={navigation.getParam('id', -1)} />
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
});

CategoryListPage.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', BRAND_NAME),
  headerRight: (
    <MaterialAppbarButtons>
      <Item title="sort" iconName="sort" onPress={navigation.getParam('showSortDialog')} />
    </MaterialAppbarButtons>
  ),
});

CategoryListPage.propTypes = {};

export default CategoryListPage;
/*
class CategoryList extends React.Component {
  
    constructor(props) {
      super(props);
      this.onEndReached = this.onEndReached.bind(this);
      this.showSortDialog = this.showSortDialog.bind(this);
      this.state = {
        categoryId: props.,
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
        extra,
        canLoadMoreContent,
        setCurrentProduct: _setCurrentProduct,
      } = this.props;
  
      if (!products) {
        return <Spinner />;
      }
  
      return (
        <View style={{ flex: 1 }}>
          <ProductList
            extra={extra}
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
      extra,
      loadingMore,
    } = state[CATEGORY_LIST];
    const canLoadMoreContent = products ? products.length < totalCount : false;
  
    return {
      products, extra, totalCount, canLoadMoreContent, loadingMore
    };
  };
  
  export default connect(mapStateToProps, {
    getCategoryProducts,
    setCurrentProduct,
  })(CategoryList);
*/
