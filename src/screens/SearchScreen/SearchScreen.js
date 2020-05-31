import React from 'react';
import { View, Text, TextInput, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { SearchProductList } from './containers';
import { getSearchProducts, setCurrentProduct } from '../../store/actions';
import { Spinner } from '../../common';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

// TODO: Code need to be refactor into functional component
// TODO: using same business logic as in CategoryList, extract common code
// FIXME: Extremely dirty code
class Search extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      sortDialogVisible: false,
      sortOrder: null,
    };
    this.setSearchText = this.setSearchText.bind(this);
    this.showSortDialog = this.showSortDialog.bind(this);
    this.onSubmitted = this.onSubmitted.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ setSearchText: this.setSearchText });
    navigation.setParams({ onSubmitted: this.onSubmitted });
    navigation.setParams({ showSortDialog: this.showSortDialog });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // TODO: find a better solution to stop rerendering
    const { loading, products, error, totalCount } = this.props;
    const { sortDialogVisible } = this.state;

    if (
      sortDialogVisible !== nextState.sortDialogVisible ||
      loading !== nextProps.loading ||
      products !== nextProps.products ||
      error !== nextProps.error ||
      totalCount !== nextProps.totalCount
    ) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    this.setState({ sortDialogVisible: false });
  }

  onSubmitted() {
    const { getSearchProducts: _getSearchProducts } = this.props;
    const { searchText } = this.state;
    _getSearchProducts(searchText);
  }

  onEndReached() {
    const {
      products,
      loadingMore,
      canLoadMoreContent,
      getSearchProducts: _getSearchProducts,
    } = this.props;
    const { searchText, sortOrder } = this.state;

    if (!loadingMore && canLoadMoreContent) {
      _getSearchProducts(searchText, products.length, sortOrder);
    }
  }

  setSearchText(searchText) {
    this.setState({ searchText });
  }

  performSort(val) {
    const { getSearchProducts: _getSearchProducts } = this.props;
    const { searchText } = this.state;
    _getSearchProducts(searchText, null, val);
    this.setState({ sortOrder: val, sortDialogVisible: false });
  }

  showSortDialog() {
    console.log('showSortDialog clicked!');
    this.setState({ sortDialogVisible: true });
  }

  // TODO: Dirty code, need to abstract it into a dialog
  renderSortDialog() {
    const { sortDialogVisible } = this.state;
    const { theme } = this.context;
    return (
      <Modal transparent animationType="slide" visible={sortDialogVisible}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0000004d',
          }}
        >
          <View style={{ backgroundColor: '#fff', padding: 8 }}>
            <TouchableHighlight
              style={styles.option(theme)}
              onPress={() => this.performSort('0')}
            >
              <Text>{translate('common.sortOption.aToZ')}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.option(theme)}
              onPress={() => this.performSort('1')}
            >
              <Text>{translate('common.sortOption.zToA')}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.option(theme)}
              onPress={() => this.performSort('2')}
            >
              <Text>{translate('common.sortOption.priceLowToHigh')}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.option(theme)}
              onPress={() => this.performSort('3')}
            >
              <Text>{translate('common.sortOption.priceHighToLow')}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }

  renderContent = () => {
    const { loading, error, totalCount, products } = this.props;

    const { searchText } = this.state;

    if (searchText === '') {
      return null;
    }

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }

    if (totalCount > 0 && products) {
      return <SearchProductList columnCount={2} />;
    }

    return (
      <View>
        <Text>{translate('searchScreen.noProduct')}</Text>
      </View>
    );
  };

  render() {
    console.log('PROBLEM: Rerendering entire Search component');
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
        {/* {this.renderSortDialog()} */}
      </View>
    );
  }
}

const styles = {
  option: theme => ({
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderColor: theme.borderColor,
  }),
};

const mapStateToProps = ({ search }) => {
  const { products, totalCount, loading, loadingMore, error } = search;
  const canLoadMoreContent = products ? products.length < totalCount : false;
  return {
    products,
    totalCount,
    canLoadMoreContent,
    loading,
    loadingMore,
    error,
  };
};

export default connect(mapStateToProps, {
  getSearchProducts,
  setCurrentProduct,
})(Search);
