import React from 'react';
import { View, Text, Button} from 'react-native';
import {getCategories} from '../../magento'

class DashboardScreen extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      admin_auth_token: null,
    }
  }

  componentDidMount(){
    
  getCategories().then( data => {
      this.setState({admin_auth_token: JSON.stringify(data)})
    })
    .catch(function(error){
      console.log(error)
    })
  }

  render(){
    return (
      <View style={{flex:1}}>
        <Text>This is a dashboard screen</Text>
        <Text>{this.state.admin_auth_token}</Text>
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
