import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { initMagento } from '../../actions';
import {
  NAVIGATION_CATEGORY_TREE_PATH,
  NAVIGATION_SEARCH_SCREEN_PATH,
} from '../../routes/types';

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initMagento());
  }

  openCategoryTreeScreen = () => {
    const { navigation } = this.props;
    navigation.navigate(NAVIGATION_CATEGORY_TREE_PATH);
  }

  onSearchClick = () => {
    const { navigation } = this.props;
    this.setState({ text: '' });
    navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH, {
      search: this.state.text
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={this.openCategoryTreeScreen}
          title="All Categories"
        />
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 7 }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            style={{ flex: 2 }}
            onPress={this.onSearchClick}
            title="Search"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(DashboardScreen);
