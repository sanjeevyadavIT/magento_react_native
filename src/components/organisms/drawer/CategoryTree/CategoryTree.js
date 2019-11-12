import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoryTreeItem, Text, Card } from '../../..';
import NavigationService from '../../../../navigation/NavigationService';
import { NAVIGATION_SETTING_SCREEN } from '../../../../navigation/types';
import { translate } from '../../../../i18n';
import { ThemeContext } from '../../../../theme';

const CategoryTree = ({
  categories,
  style,
  showFooter,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const renderRow = category => <CategoryTreeItem category={category.item} />;

  const renderFooter = () => (
    <View style={styles.footerContainer(theme)}>
      <Card
        onPress={() => NavigationService.navigate(NAVIGATION_SETTING_SCREEN)}
        style={styles.card(theme)}
      >
        <Text>{translate('settingScreen.title')}</Text>
        <Icon
          style={styles.icon(theme)}
          name="settings"
          color={theme.colors.bodyText}
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
    marginStart: theme.spacing.large
  }),
  card: theme => ({
    borderWidth: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  }),
  icon: theme => ({
    padding: 2,
    paddingRight: theme.spacing.large
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
