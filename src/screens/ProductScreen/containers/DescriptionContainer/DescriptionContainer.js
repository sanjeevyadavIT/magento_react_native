import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { Text } from '../../../../components';
import { ThemeContext } from '../../../../theme';
import {
  PRODUCT_DESCRIPTION_SECTION_TITLE,
  NO_PRODUCT_DESCRIPTION_AVAILABLE
} from '../../../../constants';

/**
 * Render description of the product into webview
 *
 * @param {Object} props             - props associated with the component
 * @param {Object[]} props.customAttributes - custom attribute of the product
 */
const DescriptionContainer = ({
  customAttributes,
}) => {
  const theme = useContext(ThemeContext);
  const getDescriptionString = () => {
    const descriptionAttribute = customAttributes.find(customAttribute => customAttribute.attribute_code === 'description');
    if (descriptionAttribute && descriptionAttribute.value) {
      return descriptionAttribute.value;
    }
    return null;
  };

  const renderDescription = () => (
    <>
      <Text type="subheading" bold style={styles.productDetailTitle(theme)}>{PRODUCT_DESCRIPTION_SECTION_TITLE}</Text>
      <WebView
        scrollEnabled
        originWhitelist={['*']}
        style={{ height: 200 }}
        source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${description}</body></html>` }}
      />
    </>
  );
  const description = getDescriptionString();
  return (
    <>
      {description ? renderDescription() : <Text>{NO_PRODUCT_DESCRIPTION_AVAILABLE}</Text>}
    </>
  );
};

const styles = {
  productDetailTitle: theme => ({
    marginBottom: theme.spacing.tiny,
  }),
};

DescriptionContainer.propTypes = {
  customAttributes: PropTypes.arrayOf(PropTypes.shape({
    attribute_code: PropTypes.string,
    value: PropTypes.string,
  })),
};

DescriptionContainer.defaultProps = {
  customAttributes: [],
};

export default DescriptionContainer;
