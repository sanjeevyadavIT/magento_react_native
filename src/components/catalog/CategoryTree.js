import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import CategoryTreeList from './CategoryTreeList';
import { CATEGORY_TREE_PAGE_TITLE } from '../../constants';
import { CATEGORY_TREE } from '../../reducers/types';


class CategoryTree extends React.Component {
  static navigationOptions = {
    title: CATEGORY_TREE_PAGE_TITLE,
  };

  renderContent() {
    const { [CATEGORY_TREE]: categories, navigate } = this.props;
    if (categories) {
      return <CategoryTreeList categories={categories} navigate={navigate} />;
    }
    // dispatch(getCategoryTree());
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
