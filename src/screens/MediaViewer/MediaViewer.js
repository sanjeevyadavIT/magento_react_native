import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Gallery from 'react-native-image-gallery';
import PropTypes from 'prop-types';
import { Icon, Text } from '../../common';
import { ThemeContext } from '../../theme';
import { DIMENS, SPACING } from '../../constants';

const propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.number.isRequired,
      media: PropTypes.arrayOf(
        PropTypes.shape({
          source: PropTypes.shape({
            uri: PropTypes.string.isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

const MediaViever = ({
  route: {
    params: { index: startingIndex, media },
  },
  navigation,
}) => {
  const [index, setIndex] = useState(startingIndex);
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.container}>
      <Gallery
        initialPage={index}
        onPageSelected={setIndex}
        images={media}
        style={styles.container}
      />
      <View style={styles.actions}>
        <Icon
          size={DIMENS.mediaViewer.closeIconSize}
          name="close-circle"
          type="material-community"
          color={theme.primaryColor}
          onPress={() => navigation.pop()}
        />
        {media.length > 1 && (
          <Text type="subheading" style={styles.counterStyle}>
            {`${index + 1} / ${media.length}`}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  actions: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: SPACING.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterStyle: {
    backgroundColor: 'rgba(0,0,0,.4)',
    padding: SPACING.tiny,
    borderRadius: SPACING.small,
    alignSelf: 'flex-start',
    marginTop: SPACING.tiny,
    marginEnd: SPACING.tiny,
    color: 'white',
    fontSize: DIMENS.mediaViewer.paginationFontSize,
  },
});

MediaViever.propTypes = propTypes;

MediaViever.defaultProps = defaultProps;

export default MediaViever;
