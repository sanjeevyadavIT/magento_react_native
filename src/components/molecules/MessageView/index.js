import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from '../..';
import {
  DEFAULT_TEXT_COLOR,
  SUCCESS_TEXT_COLOR,
  ERROR_TEXT_COLOR,
  ERROR_TEXT_SIZE
} from '../../../constants';

const DEFAULT_MODE = 'INFO_MODE';
const SUCCESS_MODE = 'SUCCESS_MODE';
const ERROR_MODE = 'ERROR_MODE';

const MessageMode = { DEFAULT_MODE, SUCCESS_MODE, ERROR_MODE };

const MessageView = React.memo(({ message, mode }) => {
  let textStyle = {};
  switch (mode) {
    case MessageMode.SUCCESS_MODE:
      textStyle = styles.success;
      break;
    case MessageMode.ERROR_MODE:
      textStyle = styles.error;
      break;
    default:
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.textDefault, textStyle]}>{message}</Text>
    </View>
  );
});

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDefault: {
    textAlign: 'center',
    padding: 8,
    fontSize: ERROR_TEXT_SIZE,
    color: DEFAULT_TEXT_COLOR,
  },
  success: {
    color: SUCCESS_TEXT_COLOR,
  },
  error: {
    color: ERROR_TEXT_COLOR,
  },
};

MessageView.propTypes = {
  message: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(Object.values(MessageMode)),
};

MessageView.defaultProps = {
  mode: MessageMode.DEFAULT_MODE,
};

export default MessageView;
export { MessageMode };
