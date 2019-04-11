import React from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ProductList from '../../components/common/ProductList';
import { SEARCH_PAGE_TITLE } from '../../constants';
import { getSearchProducts, setCurrentProduct } from '../../actions';
import { SEARCH } from '../../reducers/types';
import { Spinner } from '../../components/common';

class Search extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View>
        <TextInput
          autoFocus
          placeholder="Search for products"
          onChangeText={navigation.getParam('setSearchText')}
          onSubmitEditing={navigation.getParam('onSubmitted')}
        />
      </View>
    )
  })

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.setSearchText = this.setSearchText.bind(this);
    this.onSubmitted = this.onSubmitted.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ setSearchText: this.setSearchText });
    navigation.setParams({ onSubmitted: this.onSubmitted });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // TODO: find a better solution to stop rerendering
    const { loading, products, error, totalCount } = this.props;

    if (loading !== nextProps.loading || products !== nextProps.products || error !== nextProps.error || totalCount !== nextProps.totalCount) {
      return true;
    }

    return false;
  }


  onSubmitted() {
    const { getSearchProducts: _getSearchProducts } = this.props;
    const { searchText } = this.state;
    _getSearchProducts(searchText);
  }

  setSearchText(searchText) {
    this.setState({ searchText });
  }

  renderContent = () => {
    const {
      navigation,
      loading,
      error,
      totalCount,
      products,
      setCurrentProduct: _setCurrentProduct,
    } = this.props;

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
      return (
        <ProductList
          products={products}
          navigate={navigation.navigate}
          setCurrentProduct={_setCurrentProduct}
          columnCount={2}
        />
      );
    }

    return (
      <View><Text>No product found!</Text></View>
    );
  }

  render() {
    console.log('PROBLEM: Rerendering entire Search component');
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { products, totalCount, loading, error } = state[SEARCH];
  return {
    loading,
    products,
    totalCount,
    error,
  };
};

export default connect(mapStateToProps, {
  getSearchProducts,
  setCurrentProduct,
})(Search);
