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
    this.onRowPress = this.onRowPress.bind(this);
  }

  onExpandPress = () => {
    this.setState(prevState => ({
      ...prevState,
      expanded: !prevState.expanded
    }));
  }

  onRowPress() {
    const { category, setCurrentCategory: _setCurrentCategory, navigate } = this.props;
    _setCurrentCategory(category.id);
    navigate(NAVIGATION_CATEGORY_PATH, {
      title: category.name,
    });
  }

  renderExpandButton() {
    const { category } = this.props;
    const { expanded } = this.state;
    if (category.children_data.length) {
      const icon = expanded ? 'caret-up' : 'caret-down';
      return (
        <Icon
          style={{ padding: 2, paddingTop: 8, paddingRight: 15 }}
          name={icon}
          color="#222"
          size={20}
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
      <View style={{ height: 40, borderBottomWidth: 1, borderColor: '#222' }}>
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
