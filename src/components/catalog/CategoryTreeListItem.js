import React from 'react';
import {
  UIManager,
  Platform,
  LayoutAnimation,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryTreeList from './CategoryTreeList';
import NavigationService from '../../navigation/NavigationService';
import { NAVIGATION_CATEGORY_LIST_PATH } from '../../navigation/types';
import { BORDER_COLOR } from '../../constants';

class CategoryTreeListItem extends React.Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      expanded: false,
    };
    this.onRowPress = this.onRowPress.bind(this);
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  onExpandPress = () => {
    this.setState(prevState => ({
      ...prevState,
      expanded: !prevState.expanded
    }));
  }

  onRowPress() {
    const { category } = this.props;
    NavigationService.navigate(NAVIGATION_CATEGORY_LIST_PATH, {
      title: category.name,
      id: category.id
    });
  }

  renderExpandButton() {
    const { category } = this.props;
    const { expanded } = this.state;
    if (category.children_data.length) {
      const icon = expanded ? 'caret-up' : 'caret-down';
      return (
        <Icon
          style={{ padding: 2, paddingRight: 15 }}
          name={icon}
          color="#888"
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
      <View style={{ height: 40, justifyContent: 'center', flex: 1, borderBottomWidth: 1, borderColor: BORDER_COLOR }}>
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
    const { category } = this.props;
    const { expanded } = this.state;
    if (expanded) {
      return (
        <View>
          <CategoryTreeList categories={category.children_data} />
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


export default CategoryTreeListItem;
