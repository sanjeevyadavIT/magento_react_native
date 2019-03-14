import React from 'react';
import {View, Text, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {getProducts} from '../../magento';

class CategoryList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            products: null,
        }
    }

    componentDidMount(){

        const {navigation} = this.props;
        const categoryId = navigation.getParam('categoryId',0);
        //const categoryName = navigation.getParam('categoryName', '-')
    
        getProducts(categoryId).then( data => {
            this.setState({products: data })
          })
          .catch(function(error){
            console.log(error)
          })
    }

    rowPressed = (sku) => {
        const {navigation} = this.props;
        navigation.navigate('product', {
            sku
        });
    }

    renderItem(product){
        const {item} = product;
        return (
            <TouchableOpacity style={{borderWidth:1,borderColor:'#222',height:48}} onPress={() => this.rowPressed(item.sku)}>
                <Text>
                {item.name}
                </Text>
            </TouchableOpacity>
        )
    }


    renderContent(){
        if(this.state.products){
            return <FlatList
                style={{flex:1}}
                data={this.state.products.items}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item, index) => index.toString()}
                />
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

export default CategoryList;