import React from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { getProducts } from '../../magento';
import ProductList from '../common/ProductList';

class CategoryList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			products: null,
		}
	}

	componentDidMount() {

		const { navigation } = this.props;
		const categoryId = navigation.getParam('categoryId', 0);
		console.log(categoryId)
		//const categoryName = navigation.getParam('categoryName', '-')

		getProducts(categoryId).then(data => {
			this.setState({ products: data })
		})
			.catch(function (error) {
				console.log(error)
			})
	}

	renderContent = () => {
		
		if (this.state.products) {
			return <ProductList
				products={this.state.products.items}
				navigate={this.props.navigation.navigate}
			/>
		}

		return <ActivityIndicator />

	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.renderContent()}
			</View>
		)
	}
}

export default CategoryList;