import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { initMagento } from '../../actions';
import {
  NAVIGATION_CATEGORY_TREE_PATH,
} from '../../routes/types';

class DashboardScreen extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initMagento());
  }

  openCategoryTreeScreen = () => {
    const { navigation } = this.props;
    navigation.navigate(NAVIGATION_CATEGORY_TREE_PATH);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={this.openCategoryTreeScreen}
          title="All Categories"
        />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(DashboardScreen);
