import React from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import {getProduct} from '../../magento';

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            product: null,
        }
    }

    componentDidMount(){

        const {navigation} = this.props;
        const sku = navigation.getParam('sku',0);
        //const categoryName = navigation.getParam('categoryName', '-')
    
        getProduct(sku).then( data => {
            this.setState({product: data })
          })
          .catch(function(error){
            console.log(error)
          })
    }

    renderContent(){
        if(this.state.product){
            return <Text>{JSON.stringify(this.state.product)}</Text>
        }
        return <ActivityIndicator />
    }

    render(){
        return(
            <View style={{flex:1}}>
                {this.renderContent()}
            </View>
        )
    }
}

export default Product;