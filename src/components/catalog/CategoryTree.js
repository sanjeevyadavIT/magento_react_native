import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import CategoryTreeList from './CategoryTreeList';
import { getCategoryTree } from '../../actions';
import { CATEGORY_TREE_PAGE_TITLE } from '../../constants';
import { CATEGORY_TREE } from '../../reducers/types';


class CategoryTree extends React.Component {
  static navigationOptions = {
    title: CATEGORY_TREE_PAGE_TITLE,
  };

  renderContent() {
    const { [CATEGORY_TREE]: categories, navigation, dispatch } = this.props;
    if (categories) {
      return <CategoryTreeList categories={categories} navigate={navigation.navigate} />;
    }
    dispatch(getCategoryTree());
    return <ActivityIndicator />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  [CATEGORY_TREE]: state[CATEGORY_TREE],
});

export default connect(mapStateToProps)(CategoryTree);
