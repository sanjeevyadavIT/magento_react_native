import React, { useState, useEffect, useContext } from 'react';
import {
  UIManager,
  Platform,
  View,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Text, Card, Icon } from '../../common';
import CategoryTree from './CategoryTree';
import { NAVIGATION_TO_CATEGORY_PRODUCT_LIST_SCREEN } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { SPACING, DIMENS } from '../../constants';

const PASTEL_COLORS = [
  '#fcfbf7',
  '#f6f9fc',
  '#fcf7f6',
  '#fbfbfb',
  '#fff5f5',
  '#fcfbfd',
  '#f3f8ff',
  '#fef4f3',
];

const propTypes = {
  category: PropTypes.object.isRequired,
};

const defaultProps = {};

const CategoryTreeItem = ({ category }) => {
  const [expanded, setExpanded] = useState(0);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    // componentDidMount
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  });

  const onRowPress = () => {
    if (category.children_data.length === 0) {
      navigation.navigate(NAVIGATION_TO_CATEGORY_PRODUCT_LIST_SCREEN, {
        title: category.name,
        id: category.id,
      });
    } else {
      setExpanded(prevState => !prevState);
    }
  };

  const renderChildren = () => {
    if (expanded) {
      return (
        <CategoryTree
          navigation={navigation}
          categories={category.children_data}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Card
        type="clear"
        onPress={onRowPress}
        style={styles.card(category.level, category.position, theme)}
      >
        <Text
          bold={category.level === 2 || expanded}
          type={category.level === 2 ? 'heading' : 'body'}
        >
          {category.name}
        </Text>
        {category.children_data.length > 0 && (
          <Icon
            name={expanded ? 'arrow-drop-up' : 'arrow-drop-down'}
            color={
              category.level === 2
                ? theme.headingTextColor
                : theme.bodyTextColor
            }
            onPress={() => setExpanded(prevState => !prevState)}
          />
        )}
        {category.level === 2 && <View style={styles.slantShade} />}
      </Card>
      {renderChildren()}
    </>
  );
};

const styles = StyleSheet.create({
  card: (level, position, theme) => ({
    backgroundColor:
      level === 2
        ? PASTEL_COLORS[position%PASTEL_COLORS.length]
        : theme.surfaceColor,
    paddingStart: (level - 1) * SPACING.large,
    paddingEnd: SPACING.large,
    paddingVertical: level === 2 ? 2 * SPACING.large : SPACING.medium,
    marginBottom: level === 2 ? SPACING.tiny / 2 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: level === 2 ? 0 : DIMENS.common.borderWidth,
    borderColor: theme.borderColor,
    overflow: 'hidden',
    borderRadius: 0,
  }),
  slantShade: {
    position: 'absolute',
    width: '50%',
    height: 250,
    right: -50,
    backgroundColor: 'rgba(0,0,0,.02)',
    transform: [{ skewY: '30deg' }],
  },
});

CategoryTreeItem.propTypes = propTypes;

CategoryTreeItem.defaultProps = defaultProps;

export default CategoryTreeItem;
