import React, { useState, useEffect } from 'react';
import {
  UIManager,
  Platform,
  LayoutAnimation,
  View,
  StyleSheet,
} from 'react-native';
import { useActions } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CategoryTree, Text, Card, CardMode } from '../..';
import NavigationService from '../../../navigation/NavigationService';
import { NAVIGATION_CATEGORY_LIST_PATH } from '../../../navigation/types';
import { BORDER_COLOR } from '../../../constants';
import { setNewCategory } from '../../../actions';

// TODO: Hide category which don't have product and children_data
const CategoryTreeItem = ({
  category,
  ...props,
}) => {
  const [expanded, setExpanded] = useState(0);
  const dispatchSetNewCategoryAction = useActions(() => setNewCategory(category.id), []);

  useEffect(() => {
    // componentDidMount
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  /*
    componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
    }
  */

  const onRowPress = () => {
    if (category.product_count !== 0) {
      dispatchSetNewCategoryAction();
      NavigationService.navigate(NAVIGATION_CATEGORY_LIST_PATH, {
        title: category.name,
        id: category.id
      });
    } else {
      setExpanded(!expanded);
    }
  };

  const renderExpandButton = () => {
    if (category.children_data.length) {
      const icon = expanded ? 'caret-up' : 'caret-down';
      return (
        <Icon
          style={styles.expandIcon}
          name={icon}
          color="#888"
          size={20}
          onPress={() => setExpanded(!expanded)}
        />
      );
    }
    return <></>;
  };

  const renderItem = () => (
    <Card
      mode={CardMode.DEFAULT_MODE}
      onPress={onRowPress}
      style={styles.card}
    >
      <Text>{category.name}</Text>
      {renderExpandButton()}
    </Card>
  );

  const renderChildren = () => {
    if (expanded) {
      return <CategoryTree categories={category.children_data} />;
    }
    return null;
  };


  return (
    <View style={styles.container}>
      {renderItem()}
      {renderChildren()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  card: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
  },
  expandIcon: {
    padding: 2,
    paddingRight: 15
  },
});

CategoryTreeItem.propTypes = {
  category: PropTypes.object.isRequired,
};

CategoryTreeItem.defaultProps = {};

export default CategoryTreeItem;
