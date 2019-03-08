import React from 'react';
import { View, Text, Button} from 'react-native';

class DetailScreen extends React.Component{

  render(){
    return (
      <View style={{flex:1}}>
        <Text>This is a detail screen</Text>
        <Button onPress={()=>{
            this.props.navigation.goBack()
          }}
          title="Home"
        />
      </View>
    )
  }
}

export default DetailScreen
