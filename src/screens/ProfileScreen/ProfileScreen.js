import React, { useEffect, useContext } from 'react';
import { StyleSheet, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { getCurrentCustomer, logout } from '../../store/actions';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_ALERT_DIALOG,
  NAVIGATION_TO_ORDERS_SCREEN,
  NAVIGATION_TO_ADDRESS_SCREEN,
} from '../../navigation/routes';
import { Text, Button, GenericTemplate, Image, Icon } from '../../common';
import Status from '../../magento/Status';
import { translate } from '../../i18n';
import { SPACING, DIMENS } from '../../constants';
import { ThemeContext } from '../../theme';
import { customerType } from '../../utils';
import ProfileItem from './ProfileItem';

const PROFILE_COVER_IMG = require('../../assets/images/profile_cover.jpg');

const propTypes = {
  /**
   * Tells about the status of fetch customer data api
   *
   * if status === Status.DEFAULT => api hasn't been hit yet
   * if status === Status.LOADING => api is currently being executed
   * if status === Status.SUCCESS => success response from api
   * if status === Status.ERROR   => error response from api
   *
   * @source redux
   */
  status: PropTypes.oneOf(Object.values(Status)).isRequired,
  /**
   * Error message to be displayed if api failed
   */
  errorMessage: PropTypes.string,
  customer: customerType,
  logout: PropTypes.func.isRequired,
  getCurrentCustomer: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    popToTop: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  errorMessage: '',
  customer: {},
};

// TODO: Disable logout button, once clicked
const ProfileScreen = ({
  status,
  errorMessage,
  customer,
  navigation,
  getCurrentCustomer: _getCurrentCustomer,
  logout: _logout,
}) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // ComponentDidMount
    if (status === Status.DEFAULT) {
      _getCurrentCustomer();
    }
  }, []);

  const onLogoutPress = () => navigation.navigate(NAVIGATION_TO_ALERT_DIALOG, {
    description: translate('profileScreen.logoutConfirmationMessage'),
    positiveButtonTitle: translate('common.yes'),
    negativeButtonTitle: translate('common.no'),
    positiveButtonCallback: () => {
      _logout();
      Toast.show(translate('common.logoutSuccessMessage'), Toast.LONG);
      navigation.navigate(NAVIGATION_TO_HOME_SCREEN);
    },
  });

  return (
    <GenericTemplate
      scrollable
      status={status}
      errorMessage={errorMessage}
      refreshControl={
        <RefreshControl
          refreshing={status === Status.DEFAULT || status === Status.LOADING}
          onRefresh={_getCurrentCustomer}
          title={translate('common.pullToRefresh')}
          tintColor={theme.primaryColor}
          colors={[theme.primaryColor]}
        />
      }
    >
      <Image source={PROFILE_COVER_IMG} style={styles.coverImage} />
      <View style={styles.avatarContainer}>
        <View style={styles.backdrop(theme)} />
        <Icon
          name="person"
          size={DIMENS.profileScreen.profileImageSize}
          style={styles.profileImage(theme)}
        />
        <Text bold type="subheading" style={styles.name}>
          {`${customer.firstname} ${customer.lastname}`}
        </Text>
      </View>
      <View style={styles.actionContainer(theme)}>
        <ProfileItem
          title={translate('common.orders')}
          subtitle={translate('profileScreen.ordersSubtitle')}
          icon={{ name: 'logo-dropbox', type: 'ionicon' }}
          onPress={() => {
            navigation.navigate(NAVIGATION_TO_ORDERS_SCREEN, {
              customerId: customer.id,
            });
          }}
        />
        <ProfileItem
          title={translate('common.address')}
          subtitle={translate('profileScreen.addressSubtitle')}
          icon={{ name: 'location-on' }}
          onPress={() => navigation.navigate(NAVIGATION_TO_ADDRESS_SCREEN)}
        />
      </View>
      <Button
        type="outline"
        title={translate('common.logout')}
        tintColor={theme.errorColor}
        style={styles.logout}
        onPress={onLogoutPress}
      />
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: DIMENS.profileScreen.coverImageHeight,
  },
  avatarContainer: {
    marginTop: -DIMENS.profileScreen.profileImageSize / 2,
    alignItems: 'center',
    marginBottom: SPACING.large,
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
  },
  backdrop: theme => ({
    ...StyleSheet.absoluteFill,
    top: DIMENS.profileScreen.profileImageSize / 2,
    backgroundColor: theme.surfaceColor,
  }),
  profileImage: theme => ({
    backgroundColor: theme.white,
    borderWidth: DIMENS.common.borderWidth,
    borderRadius: DIMENS.common.borderRadius,
    borderColor: theme.borderColor,
    marginBottom: SPACING.small,
  }),
  name: {
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  actionContainer: theme => ({
    backgroundColor: theme.surfaceColor,
    marginBottom: SPACING.small,
  }),
  logout: {
    margin: SPACING.large,
  },
});

ProfileScreen.propTypes = propTypes;

ProfileScreen.defaultProps = defaultProps;

const mapStateToProps = ({ account }) => {
  const { status, errorMessage, customer } = account;
  return {
    customer,
    status,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  logout,
  getCurrentCustomer,
})(ProfileScreen);
