import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Card } from '../../../../common';
import CategoryTreeItem from '../CategoryTreeItem/CategoryTreeItem';
import { NAVIGATION_TO_SETTING_SCREEN } from '../../../../navigation';
import { translate } from '../../../../i18n';
import { ThemeContext } from '../../../../theme';
import { SPACING } from '../../../../constants';

const CategoryTree = ({
  categories,
  style,
  showFooter,
  navigation,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const renderRow = category => <CategoryTreeItem navigation={navigation} category={category.item} />;

  const renderFooter = () => (
    <View style={styles.footerContainer(theme)}>
      <Card
        onPress={() => navigation.navigate(NAVIGATION_TO_SETTING_SCREEN)}
        style={styles.card(theme)}
      >
        <Text>{translate('settingScreen.title')}</Text>
        <Icon
          style={styles.icon(theme)}
          name="settings"
          color={theme.bodyTextColor}
          size={20}
        />
      </Card>
    </View>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderRow}
      keyExtractor={item => String(item.id)}
      ListFooterComponent={showFooter && renderFooter()}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  footerContainer: theme => ({
    marginStart: SPACING.large
  }),
  card: theme => ({
    borderWidth: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.borderColor,
  }),
  icon: theme => ({
    padding: 2,
    paddingRight: SPACING.large
  }),
});

CategoryTree.propTypes = {
  categories: PropTypes.array.isRequired,
  showFooter: PropTypes.bool,
};

CategoryTree.defaultProps = {
  showFooter: false,
};

export default CategoryTree;
