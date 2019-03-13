import React from 'react';
import { FlatList, Text } from 'react-native';
import CategoryTreeListItem from './CategoryTreeListItem'

class CategoryTreeList extends React.Component{

    renderItem(category){
        return <CategoryTreeListItem category={category.item} expanded={false} navigate={this.props.navigate} />;
    }

    render(){
        return (
            <FlatList
                style={{flex:1}}
                data={this.props.categories.children_data}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item, index) => index.toString()}
                />
        );
    }
}

export default CategoryTreeList;