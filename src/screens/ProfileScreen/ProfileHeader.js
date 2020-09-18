import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Text, Image } from '../../common';
import { ThemeContext } from '../../theme';
import { SPACING, DIMENS } from '../../constants';
import { isNonEmptyString } from '../../utils';

const PROFILE_COVER_IMG = require('../../assets/images/profile_cover.jpg');

const propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

const defaultProps = {
  firstName: '',
  lastName: '',
};

const ProfileHeader = ({ firstName, lastName }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Image source={PROFILE_COVER_IMG} style={styles.coverImage} />
      <View style={styles.avatarContainer}>
        <View style={styles.backdrop(theme)} />
        <Icon
          name="person"
          size={DIMENS.profileScreen.profileImageSize}
          style={styles.profileImage(theme)}
        />
        {isNonEmptyString(firstName) && (
          <Text bold type="subheading" style={styles.name}>
            {`${firstName} ${lastName}`}
          </Text>
        )}
      </View>
    </>
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
});

ProfileHeader.propTypes = propTypes;

ProfileHeader.defaultProps = defaultProps;

export default ProfileHeader;
