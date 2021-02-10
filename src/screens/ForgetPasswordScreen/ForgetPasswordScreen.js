import React, { useState } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { showMessage } from 'react-native-flash-message';
import Status from '../../magento/Status';
import { magento } from '../../magento';
import { Text, Button, TextInput, GenericTemplate } from '../../common';
import { translate } from '../../i18n';
import { SPACING } from '../../constants';
import { isEmailValid } from '../../utils';

const propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const defaultProps = {};

const ForgetPasswordScreen = ({ route }) => {
  const { params: { email: _email } = {} } = route;
  const [apiStatus, setApiStatus] = useState(Status.DEFAULT);
  const [form, setValues] = useState({
    email: _email,
    incorrectEmail: false,
  });

  const checkEmail = () => {
    if (!isEmailValid(form.email)) {
      setValues(prevState => ({
        ...prevState,
        incorrectEmail: true,
      }));
      return false;
    }
    return true;
  };

  const onResetPress = () => {
    Keyboard.dismiss();
    // Validations
    if (!checkEmail()) {
      return;
    }
    // Api call
    setApiStatus(Status.LOADING);
    magento.guest
      .resetPassword({
        email: form.email,
      })
      .then(response => {
        if (response) {
          showMessage({
            message: translate('common.attention'),
            description: translate('forgetPasswordScreen.emailSent'),
            type: 'info',
          });
          setApiStatus(Status.SUCCESS);
        } else {
          // Either password_reset_template is not correctly set in config.js or problem sending email
          throw new Error(translate('errors.genericError'));
        }
      })
      .catch(error => {
        showMessage({
          message: translate('common.error'),
          description: error.message || translate('errors.genericError'),
          type: 'danger',
        });
        setApiStatus(Status.ERROR);
      });
  };

  return (
    <GenericTemplate scrollable style={styles.container}>
      <Text type="heading" bold>
        {translate('forgetPasswordScreen.passwordRecovery')}
      </Text>
      <Text style={styles.defaultMargin}>
        {translate('forgetPasswordScreen.requestEmailId')}
      </Text>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder={translate('common.email')}
        autoCorrect={false}
        value={form.email}
        containerStyle={styles.defaultMargin}
        editable={!(apiStatus === Status.LOADING)}
        onSubmitEditing={onResetPress}
        onChangeText={value =>
          setValues(prevState => ({
            ...prevState,
            email: value.trim(),
            incorrectEmail: false,
          }))
        }
        errorMessage={
          form.incorrectEmail ? translate('errors.invalidEmail') : ''
        }
        onBlur={checkEmail}
      />
      <Button
        loading={apiStatus === Status.LOADING}
        onPress={onResetPress}
        style={styles.defaultMargin}
        title={translate('forgetPasswordScreen.resetButtonTitle')}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.large,
  },
  defaultMargin: {
    marginTop: SPACING.large,
  },
});

ForgetPasswordScreen.propTypes = propTypes;

ForgetPasswordScreen.defaultProps = defaultProps;

export default ForgetPasswordScreen;
