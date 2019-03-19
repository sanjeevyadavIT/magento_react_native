import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import CategoryTreeList from './CategoryTreeList';
import { getCategoryTree } from '../../actions/RestActions';
import {
    CATEGORY_TREE,
} from '../../reducers/types';

import { connect } from 'react-redux';

class CategoryTree extends React.Component {

    renderContent() {
        const categories = this.props[CATEGORY_TREE];
        if (categories) {
            return <CategoryTreeList categories={categories} navigate={this.props.navigation.navigate} />
        }
        this.props.dispatch(getCategoryTree());
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

const mapStateToProps = (state) => {
    return {
        [CATEGORY_TREE]: state[CATEGORY_TREE],
    }
}

export default connect(mapStateToProps)(CategoryTree);