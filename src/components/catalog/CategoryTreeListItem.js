import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryTreeList from './CategoryTreeList';
import { NAVIGATION_CATEGORY_PATH } from '../../routes/types';
import { setCurrentCategory } from '../../actions';

class CategoryTreeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  onExpandPress = () => {
    this.setState(prevState => ({
      ...prevState,
      expanded: !prevState.expanded
    }));
  }

  onRowPress = () => {
    const { category, navigate } = this.props;
    this.props.setCurrentCategory(category.id);
    navigate(NAVIGATION_CATEGORY_PATH, {
      categoryName: category.name,
    });
  }

  renderExpandButton() {
    const { category } = this.props;
    const { expanded } = this.state;
    if (category.children_data.length) {
      const icon = expanded ? 'arrow-circle-o-up' : 'arrow-circle-o-down';
      return (
        <Icon
          style={{ padding: 2, paddingRight: 15 }}
          name={icon}
          color="#999"
          size={30}
          onPress={this.onExpandPress}
        />
      );
    }
    return null;
  }


  renderItem = () => {
    const { category } = this.props;
    let space = '';
    for (let i = 0; i < category.level * 4; i += 1) {
      space += ' ';
    }
    return (
      <View style={{ height: 40, borderWidth: 1, borderColor: '#222' }}>
        <TouchableOpacity
          onPress={this.onRowPress}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text>
            {`${space}${category.name}`}
          </Text>
          {this.renderExpandButton()}
        </TouchableOpacity>
      </View>
    );
  }

  renderChildren() {
    const { category, navigate } = this.props;
    const { expanded } = this.state;
    if (expanded) {
      return (
        <View>
          <CategoryTreeList categories={category} navigate={navigate} />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View>
        {this.renderItem()}
        {this.renderChildren()}
      </View>
    );
  }
}


export default connect(null, { setCurrentCategory })(CategoryTreeListItem);
