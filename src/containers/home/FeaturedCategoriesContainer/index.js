import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import FeaturedCategoryList from '../FeaturedCategoryList';
import { Text } from '../../../components';

// TODO: Container is hosting another container: FeaturedCategoryList which in turn is a container in itself
// TODO: Find it, is there any use of using memo here, as state is getting from hook
// TODO: use margin value from theme
const FeaturedCategoriesContainer = React.memo(() => {
  const featuredCategories = useSelector(state => state.home.featuredCategories);
  return (
    <>
      {Object.keys(featuredCategories).map(key => (
        <View style={styles.container} key={key}>
          <Text type="subheading" bold style={styles.title}>{featuredCategories[key].title}</Text>
          <FeaturedCategoryList categoryId={parseInt(key, 10)} />
        </View>
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginTop: 8,
    marginLeft: 12
  }
});

FeaturedCategoriesContainer.propTypes = {};

FeaturedCategoriesContainer.defaultProps = {};

export default FeaturedCategoriesContainer;
