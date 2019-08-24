import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../..';
import { withTheme } from '../../../config';

const INFO = 'info';
const SUCCESS = 'success';
const ERROR = 'error';

const MessageView = React.memo(({ message, type, theme }) => (
  <View style={styles.container}>
    <Text type="body" style={styles.text(type, theme)}>{message}</Text>
  </View>
));

const getTextColor = (type, theme) => {
  switch (type) {
    case SUCCESS:
      return theme.colors.success;
    case ERROR:
      return theme.colors.error;
    default:
      return theme.colors.bodyText;
  }
};

// TODO: Is there any benefit of using StyleSheet when styles are function?
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: (type, theme) => ({
    textAlign: 'center',
    padding: theme.spacing.eight,
    color: getTextColor(type, theme),
  }),
});

MessageView.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([INFO, SUCCESS, ERROR]),
};

MessageView.defaultProps = {
  type: INFO,
};

export default withTheme(MessageView);
