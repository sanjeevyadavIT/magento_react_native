import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import {
  GenericTemplate,
  Button,
  TextInput,
  DateTimePicker,
} from '../../common';
import { magento } from '../../magento';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { updateCustomer } from '../../store/actions';
import { SPACING, DIMENS, TYPOGRAPHY, LIMITS } from '../../constants';
import {
  customerType,
  isNonEmptyString,
  stringToDate,
  getFormattedDateForApi,
} from '../../utils';
import { ThemeContext } from '../../theme';
import ProfileHeader from '../ProfileScreen/ProfileHeader';

const CURRENT_DATE = new Date();

const propTypes = {
  customer: customerType.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

const CartScreen = ({
  customer,
  updateCustomer: _updateCustomer,
  navigation,
}) => {
  const [apiStatus, setApiStatus] = useState(Status.DEFAULT);
  const [form, setValues] = useState({
    firstName: customer.firstname,
    incorrectFirstName: false,
    lastName: customer.lastname,
    incorrectLastName: false,
  });
  const [dateOfBirth, setDateOfBirth] = useState(
    isNonEmptyString(customer.dob) ? stringToDate(customer.dob) : null,
  );
  const lastNameInputRef = useRef();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (apiStatus === Status.SUCCESS) {
      Toast.show(translate('editProfileScreen.detailsUpdated'), Toast.LONG);
      navigation.goBack();
    }
  }, [apiStatus]);

  const checkField = (fieldKey, fieldErrorKey, fieldValidator) => {
    if (!fieldValidator(form[fieldKey])) {
      setValues(prevState => ({
        ...prevState,
        [fieldErrorKey]: true,
      }));
      return false;
    }
    return true;
  };

  const checkValidation = () => {
    let isValid = true;
    isValid =
      isValid &&
      checkField('firstName', 'incorrectFirstName', isNonEmptyString);
    isValid =
      isValid && checkField('lastName', 'incorrectLastName', isNonEmptyString);
    return isValid;
  };

  const handleSave = () => {
    Keyboard.dismiss();
    if (!checkValidation()) {
      return;
    }
    setApiStatus(Status.LOADING);
    const customerData = {
      customer: {
        ...customer,
        firstname: form.firstName,
        lastname: form.lastName,
        dob: !dateOfBirth ? '' : getFormattedDateForApi(dateOfBirth),
      },
    };
    // Api call
    magento.admin
      .updateCustomerData({
        customerId: customer.id,
        customerData,
      })
      .then(response => {
        _updateCustomer(response);
        setApiStatus(Status.SUCCESS);
      })
      .catch(error => {
        Toast.show(
          error.message || translate('errors.genericError'),
          Toast.LONG,
        );
        setApiStatus(Status.ERROR);
      });
  };

  return (
    <GenericTemplate
      scrollable
      status={Status.SUCCESS}
      style={styles.container(theme)}
      footer={
        <Button
          loading={apiStatus === Status.LOADING}
          style={styles.footer}
          title={translate('common.save')}
          onPress={handleSave}
        />
      }
    >
      <ProfileHeader />
      <View style={styles.innerContainer}>
        <TextInput
          placeholder={translate('common.firstName')}
          autoCorrect={false}
          defaultValue={form.firstName}
          disabled={apiStatus === Status.LOADING}
          onChangeText={value =>
            setValues(prevState => ({
              ...prevState,
              firstName: value.trim(),
              incorrectFirstName: false,
            }))
          }
          returnKeyType={translate('common.keyboardNext')}
          onSubmitEditing={() => lastNameInputRef.current.focus()}
          maxLength={LIMITS.maxFirstNameLength}
          errorMessage={
            form.incorrectFirstName ? translate('errors.invalidFirstName') : ''
          }
          onBlur={() =>
            checkField('firstName', 'incorrectFirstName', isNonEmptyString)
          }
        />
        <TextInput
          placeholder={translate('common.lastName')}
          autoCorrect={false}
          defaultValue={form.lastName}
          disabled={apiStatus === Status.LOADING}
          containerStyle={styles.defaultMargin}
          onChangeText={value =>
            setValues(prevState => ({
              ...prevState,
              lastName: value.trim(),
              incorrectLastName: false,
            }))
          }
          assignRef={component => {
            lastNameInputRef.current = component;
          }}
          returnKeyType={translate('common.keyboardNext')}
          maxLength={LIMITS.maxLastNameLength}
          errorMessage={
            form.incorrectLastName ? translate('errors.invalidLastName') : ''
          }
          onBlur={() =>
            checkField('lastName', 'incorrectLastName', isNonEmptyString)
          }
        />
        <TextInput
          disabled
          value={customer.email}
          placeholder={translate('common.email')}
          containerStyle={styles.defaultMargin}
        />
        <DateTimePicker
          mode="date"
          label={translate('editProfileScreen.setBirthday')}
          value={dateOfBirth}
          onChange={setDateOfBirth}
          maximumDate={CURRENT_DATE}
          disabled={apiStatus === Status.LOADING}
        />
      </View>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.surfaceColor,
  }),
  innerContainer: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
  },
  defaultMargin: {
    marginTop: SPACING.large,
  },
  footer: {
    borderRadius: 0,
  },
  dateContainer: theme => ({
    flexDirection: 'row',
    backgroundColor: theme.surfaceColor,
    borderWidth: DIMENS.common.borderWidth,
    borderRadius: DIMENS.common.borderRadius,
    alignItems: 'center',
    borderColor: theme.labelTextColor,
    minHeight: DIMENS.common.textInputHeight,
    marginTop: SPACING.large,
  }),
  dateText: theme => ({
    ...TYPOGRAPHY.formInput(theme),
    backgroundColor: 'transparent',
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    flex: 1,
  }),
});

CartScreen.propTypes = propTypes;

CartScreen.defaultProps = defaultProps;

const mapStateToProps = ({ account }) => {
  const { customer } = account;
  return {
    customer,
  };
};

export default connect(mapStateToProps, { updateCustomer })(CartScreen);
