import React, { useContext } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate, ModalSelect } from '../../../../components';
import Status from '../../../../magento/Status';
import { ThemeContext } from '../../../../theme';
import { translate } from '../../../../i18n';
import { resetAddToCartState } from '../../../../store/actions';

/**
 * For `configurable` type product, show selection box,
 * to allow user to choose different configuration available.
 * Example: size, color etc
 *
 * @param {Object}    props                   - props associated with the component
 * @param {string}    props.sku               - unique id of the `configurable` type product.
 * @param {string}    props.children          - all `simple` type products under `configurable` product
 * @param {Status}    props.status            - (From Redux) status of the api request to fetch configurable option
 * @param {string}    props.errorMessage      - (From Redux) error message in case api request failed
 * @param {Object[]}  props.options           - (From Redux) different configurable options available
 * @param {Object}    props.attributes        - (From Redux) contain label to the id present in  {@link props.options}
 */
const OptionsContainer = ({
  sku,
  status,
  errorMessage,
  options,
  attributes,
  selectedOptions,
  setSelectedOptions,
  resetAddToCartState: _resetAddToCartState,
}) => {
  const theme = useContext(ThemeContext);

  const onPickerSelect = (attributeId, itemValue, item) => {
    if (itemValue === 'null') return;
    _resetAddToCartState(sku);
    setSelectedOptions({
      ...selectedOptions,
      [attributeId]: itemValue,
    });
  };

  const renderOptions = () => options.sort((first, second) => first.position - second.position).map((option) => {
    const optionIds = option.values.map(value => String(value.value_index));
    const values = attributes[option.attribute_id].options.filter(({ value }) => optionIds.includes(value));
    const data = values.map(({ label, value }) => ({
      label,
      key: value
    }));
    return (
      <View style={styles.optionBox(theme)} key={option.attribute_id}>
        <ModalSelect
          data={data}
          label={`${translate('common.select')} ${option.label}`}
          disabled={values.length === 0}
          onChange={(itemKey, selectedOption) => onPickerSelect(option.attribute_id, itemKey, selectedOption)}
        />
      </View>
    );
  });

  return (
    <GenericTemplate
      scrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={styles.container(theme)}
    >
      {status === Status.SUCCESS ? renderOptions() : <></>}
    </GenericTemplate>
  );
};

const styles = {
  container: theme => ({
    backgroundColor: theme.colors.surface,
  }),
  optionBox: theme => ({
    marginBottom: theme.spacing.large,
  })
};

OptionsContainer.propTypes = {
  sku: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(Status)).isRequired, // redux
  errorMessage: PropTypes.string, // redux
  options: PropTypes.arrayOf(PropTypes.shape({
    attribute_id: PropTypes.string,
    id: PropTypes.number,
    label: PropTypes.string,
    position: PropTypes.number,
    product_id: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.shape({
      value_index: PropTypes.number.isRequired,
    })),
  })),
  attributes: PropTypes.object, // redux
  selectedOptions: PropTypes.object,
  setSelectedOptions: PropTypes.func,
  resetAddToCartState: PropTypes.func.isRequired,
};

OptionsContainer.defaultProps = {
  errorMessage: '',
  options: null,
  attributes: {},
  selectedOptions: null,
  setSelectedOptions: () => { },
};

const mapStateToProps = ({ product }, { sku }) => {
  const {
    current: {
      [sku]: {
        options,
        confOptionsStatus: status,
        confOptionsErrorMessage: errorMessage,
      }
    },
    attributes,
  } = product;

  return {
    status,
    errorMessage,
    sku,
    options,
    attributes,
  };
};

export default connect(mapStateToProps, {
  resetAddToCartState
})(OptionsContainer);
