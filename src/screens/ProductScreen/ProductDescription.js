import React from 'react';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import { Card, Text } from '../../common';
import { translate } from '../../i18n';
import { isObject } from '../../utils';
import { SPACING, DIMENS, DESCRIPTION_SK } from '../../constants';

const getDescriptionString = (customAttributes = []) => {
  const descriptionAttribute = customAttributes.find(
    customAttribute => customAttribute.attribute_code === DESCRIPTION_SK,
  );
  if (isObject(descriptionAttribute) && descriptionAttribute.value) {
    return descriptionAttribute.value;
  }
  return null;
};

const propTypes = {
  customAttributes: PropTypes.arrayOf(
    PropTypes.shape({
      attribute_code: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

const defaultProps = {
  customAttributes: [],
}

/**
 * Render description of the product into webview
 *
 * @param {Object} props             - props associated with the component
 * @param {Object[]} props.customAttributes - custom attribute of the product
 */
const ProductDescription = ({ customAttributes }) => {
  const description = getDescriptionString(customAttributes);

  return (
    <>
      {description ? (
        <Card type="clear" style={styles.container}>
          <Text bold type="subheading" style={styles.productDetailTitle}>
            {translate('productScreen.productDetailLabel')}
          </Text>
          <HTML
            html={description}
            imagesMaxWidth={DIMENS.common.WINDOW_WIDTH - 2*SPACING.large}
          />
        </Card>
      ) : (
        <Text>{translate('productScreen.noProductDetail')}</Text>
      )}
    </>
  );
};

const styles = {
  container: {
    borderRadius: 0,
    padding: SPACING.large,
  },
  productDetailTitle: {
    marginBottom: SPACING.tiny,
  },
};

ProductDescription.propTypes = propTypes;

ProductDescription.defaultProps = defaultProps;

export default ProductDescription;
