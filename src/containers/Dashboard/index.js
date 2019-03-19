import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect} from 'react-redux';
import { initMagento } from '../../actions/RestActions';

class DashboardScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      storeConfigs: null
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(initMagento());
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>{JSON.stringify(this.state.storeConfigs)}</Text>
        <Button onPress={() => {
          this.props.navigation.navigate('CategoryTree')
        }}
          title="Categories"
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DashboardScreen)
