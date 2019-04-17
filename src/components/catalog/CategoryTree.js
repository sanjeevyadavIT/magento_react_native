import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import CategoryTreeList from './CategoryTreeList';
import { Spinner } from '../common';
import { CATEGORY_TREE_PAGE_TITLE } from '../../constants';
import { CATEGORY_TREE } from '../../reducers/types';


class CategoryTree extends React.Component {
  static navigationOptions = {
    title: CATEGORY_TREE_PAGE_TITLE,
  };

  renderContent() {
    const { loading, error, childrenData } = this.props;

    if (error) {
      return <Text>{error}</Text>;
    }

    if (loading) {
      return <Spinner />;
    }

    if (childrenData) {
      return <CategoryTreeList categories={childrenData} />;
    }

    return null;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
  }
};

const mapStateToProps = (state) => {
  const { loading, error, children_data: childrenData } = state[CATEGORY_TREE];
  return {
    loading,
    error,
    childrenData,
  };
};

export default connect(mapStateToProps)(CategoryTree);
