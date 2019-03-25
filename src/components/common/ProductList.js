import React from 'react';
import { View, FlatList, ActivityIndicator} from 'react-native';
import ProductListItem from '../catalog/ProductListItem';

class ProductList extends React.Component{

	renderChild = (product) => {
		return <ProductListItem product={product.item} navigate={this.props.navigate} setCurrentProductSku={this.props.setCurrentProductSku}/>
	}

	renderContent = () => {
		const {products} = this.props;

		if(products.length){
			return (
				<View style={{}}>
					<FlatList
					data={products}
					renderItem={this.renderChild}
					keyExtractor={(item,index) => index.toString()}
					numColumns={2}
				/>
				</View>

			)
		}
	}

  render(){
		return (
			<View style={{flex:1}}>
				{this.renderContent()}
			</View>
		)
  }
}

export default ProductList;
