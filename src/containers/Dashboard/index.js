import React from 'react';
import { View, Text, Button} from 'react-native';

class DashboardScreen extends React.Component{

  render(){
    return (
      <View style={{flex:1}}>
        <Text>This is a dashboard screen</Text>
        <Button onPress={()=>{
            this.props.navigation.navigate('DetailScreen')
          }}
          title="Detail Screen"
        />
      </View>
    )
  }
}

export default DashboardScreen
