import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import FeaturedCategoryList from '../FeaturedCategoryList';

// TODO: Container is hosting another container: FeaturedCategoryList which in turn is a container in itself
// TODO: Find it, is there any use of using memo here, as state is getting from hook
const FeaturedCategoriesContainer = React.memo(() => {
  const featuredCategories = useSelector(state => state.home.featuredCategories);
  return (
    <>
      {Object.keys(featuredCategories).map(key => (
        <View style={styles.container} key={key}>
          <Text style={styles.title}>{featuredCategories[key].title}</Text>
          <FeaturedCategoryList categoryId={parseInt(key, 10)} />
        </View>
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
    marginLeft: 8
  }
});

FeaturedCategoriesContainer.propTypes = {};

FeaturedCategoriesContainer.defaultProps = {};

export default FeaturedCategoriesContainer;
