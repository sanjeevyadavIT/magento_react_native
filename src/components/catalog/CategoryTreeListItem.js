import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import CategoryTreeList from './CategoryTreeList';
import Icon from 'react-native-vector-icons/FontAwesome';

class CategoryTreeListItem extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            expanded: false,
        }
    }

    onExpandPress(){
        this.setState({
            ...this.state,
            expanded: !this.state.expanded
        })
    }

    onRowPress = () => {
        const {category} = this.props;
        this.props.navigate('category', {
            categoryId: category.id,
            categoryName: category.name,
        });
    }

    renderExpandButton(){
        const {category} = this.props;
        if(category.children_data.length){
            const icon = this.state.expanded ? 'arrow-circle-o-up':'arrow-circle-o-down';
            return (
                <Icon 
                style={{  padding:2, paddingRight:15}}
                name={icon}
                color="#999"
                size={30}
                onPress={this.onExpandPress.bind(this)}/>
            )
        }
    }


    renderItem = () => {
        const { category } = this.props;
        console.log(category)
        let space = '';
        for(let i = 0; i < category.level*4; i++){
            space+=' ';
        }
        return (
            <View style={{height:40, borderWidth:1, borderColor:'#222'}}>
                <TouchableOpacity
                    onPress={this.onRowPress}
                    style={{flexDirection:'row',justifyContent:'space-between'}}
                >
                    <Text >
                        {`${space}${category.name}`}
                    </Text>
                    {this.renderExpandButton()}
                </TouchableOpacity>
            </View>
        )
    }

    renderChildren(){
        if(this.state.expanded){
            return (
                <View>
                    <CategoryTreeList categories={this.props.category} navigate={this.props.navigate} />
                </View>
            )
        }
    }

    render(){
        return (
            <View>
                {this.renderItem()}
                {this.renderChildren()}
            </View>
        )
    }
}


export default CategoryTreeListItem;