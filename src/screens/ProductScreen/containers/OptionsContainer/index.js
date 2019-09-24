import React, { useEffect, useContext } from 'react';
import { View, Picker } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate, Text } from '../../../../components';
import {
  getConfigurableProductOptions,
  getConfigurableChildren,
  uiProductUpdateOptions,
} from '../../../../store/actions';
import Status from '../../../../magento/Status';
import { ThemeContext } from '../../../../theme';
import { DEFAULT_PICKER_LABEL } from '../../../../constants';
/**
 * For `configurable` type product, show selection box,
 * to allow user to choose different configuration available.
 * Example: size, color etc
 *
 * @param {Object}    props                   - props associated with the component
 * @param {string}    props.sku               - (From Redux) unique id of the `configurable` type product.
 * @param {boolean}   props.hasOptions        - (From Redux) whether product contains configurable options or not
 * @param {Status}    props.status            - (From Redux) status of the api request to fetch configurable option
 * @param {string}    props.errorMessage      - (From Redux) error message in case api request failed
 * @param {Object[]}  props.children          - (From Redux) all child(`simple` type) products under `configurable` type product
 * @param {Object[]}  props.options           - (From Redux) different configurable options available
 * @param {Object}    props.attributes        - (From Redux) contain label to the id present in  {@link props.options}
 * @param {Object}    props.selectedOptions   - (From Redux) saves the reference of configurable option selected by user in form of key-value pair
 * @param {function}  props.getConfigurableProductOptions - (From Redux) function to fetch configurable options if {@link props.hasOptions} is true
 * @param {function}  props.getConfigurableChildren       - (From Redux) function to fetch child(`simple` type) products of `configurable` type product
 * @param {function}  props.uiProductUpdateOptions        - (From Redux) function to save selected options from picker
 */
const OptionsContainer = ({
  sku,
  hasOptions,
  status,
  errorMessage,
  children,
  options,
  attributes,
  selectedOptions,
  getConfigurableProductOptions: _getConfigurableProductOptions,
  getConfigurableChildren: _getConfigurableChildren,
  uiProductUpdateOptions: _uiProductUpdateOptions,
}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (hasOptions) {
      _getConfigurableProductOptions(sku);
    }
    if (!children) {
      _getConfigurableChildren(sku);
    }
  }, []);

  const onPickerSelect = (attributeId, itemValue) => {
    if (itemValue === 'null') return;
    _uiProductUpdateOptions({ [attributeId]: itemValue });
  };

  const renderPickerOptions = values => values.map(({ label, value }) => <Picker.Item label={label} value={String(value)} key={String(value)} />);

  const renderOptions = () => options.sort((first, second) => first.position - second.position).map((option) => {
    const optionIds = option.values.map(value => String(value.value_index));
    const values = attributes[option.attribute_id].options.filter(({ value }) => optionIds.includes(value));
    values.unshift({ label: DEFAULT_PICKER_LABEL, value: null }); // title
    return (
      <View key={option.attribute_id}>
        <Text type="subheading" bold>{option.label}</Text>
        <Picker
          selectedValue={selectedOptions[option.attribute_id]}
          style={styles.optionBox(theme)}
          onValueChange={(itemValue, itemIndex) => onPickerSelect(option.attribute_id, itemValue, itemIndex)}
        >
          {renderPickerOptions(values)}
        </Picker>
      </View>
    );
  });

  return (
    <GenericTemplate
      isScrollable={false}
      status={status}
      errorMessage={errorMessage}
      style={styles.container(theme)}
    >
      {options ? renderOptions() : <></>}
    </GenericTemplate>
  );
};

const styles = {
  container: theme => ({
    backgroundColor: theme.colors.surface,
  }),
  optionBox: theme => ({
    height: 50,
    flex: 1,
  })
};

OptionsContainer.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)).isRequired, // redux
  errorMessage: PropTypes.string, // redux
  sku: PropTypes.string.isRequired, // redux
  hasOptions: PropTypes.bool, // redux
  children: PropTypes.array, // redux
  options: PropTypes.array, // redux
  attributes: PropTypes.object, // redux
  getConfigurableProductOptions: PropTypes.func, // redux
  getConfigurableChildren: PropTypes.func, // redux
};

OptionsContainer.defaultProps = {
  errorMessage: '',
  hasOptions: false,
  options: null,
  children: null,
  attributes: {},
  getConfigurableProductOptions: () => { },
  getConfigurableChildren: () => { },
};

const mapStateToProps = (state) => {
  const {
    confOptionsStatus: status,
    confOptionsErrorMessage: errorMessage,
    detail: {
      sku,
      options,
      children,
    },
    attributes,
    selectedOptions,
    hasOptions,
  } = state.product;

  return {
    status,
    errorMessage,
    sku,
    hasOptions,
    children,
    options,
    attributes,
    selectedOptions,
  };
};

export default connect(mapStateToProps, {
  getConfigurableProductOptions,
  getConfigurableChildren,
  uiProductUpdateOptions,
})(OptionsContainer);
