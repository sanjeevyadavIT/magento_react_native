import React from 'react';
import {View, Text} from 'react-native';

class CategoryList extends React.Component{
    render(){
        const {navigation} = this.props;
        const categoryId = navigation.getParam('categoryId',0);
        const categoryName = navigation.getParam('categoryName', '-')
        return(
            <View style={{flex:1}}>
                <Text>{`${categoryName} :: ${categoryId}` }</Text>
            </View>
        )
    }
}

export default CategoryList;