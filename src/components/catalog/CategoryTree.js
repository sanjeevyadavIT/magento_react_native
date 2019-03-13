import React from 'react';
import { View, ActivityIndicator} from  'react-native';
import CategoryTreeList from './CategoryTreeList';
import {getCategories} from '../../magento';

class CategoryTree extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: null,
        }
    }

    componentDidMount(){
    
        getCategories().then( data => {
            this.setState({categories: data })
          })
          .catch(function(error){
            console.log(error)
          })
    }


    renderContent(){
        if(this.state.categories){
            return <CategoryTreeList categories={this.state.categories} navigate={this.props.navigation.navigate} />
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

export default CategoryTree;