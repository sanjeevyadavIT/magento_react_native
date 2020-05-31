import React from 'react'
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../src/common';

const Divider = () => <View style={{ flex: 1, height: 1, backgroundColor: '#d9d9d9' }} />;

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  style: ViewPropTypes.style,
}

const defaultProps = {
  style: {},
};

const StorySection = ({ title, children, style }) => (
  <>
    <Text type="subheading">{title}</Text>
    <View style={StyleSheet.flatten([styles.card, style])}>{children}</View>
    <Divider />
  </>
);

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9d9d9',
    borderRadius: 4,
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
  },
});

StorySection.propTypes = propTypes;

StorySection.defaultProps = defaultProps;

export { StorySection, Divider };
