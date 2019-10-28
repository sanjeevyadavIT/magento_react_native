import React, { useState, useContext } from 'react';
import { View, Picker } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericTemplate, Text } from '../../../../components';
import Status from '../../../../magento/Status';
import { ThemeContext } from '../../../../theme';
import { DEFAULT_PICKER_LABEL } from '../../../../constants';
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
  sku, // used in redux to access state
  status,
  errorMessage,
  options,
  attributes,
  selectedOptions,
  setSelectedOptions,
}) => {
  const theme = useContext(ThemeContext);

  const onPickerSelect = (attributeId, itemValue) => {
    if (itemValue === 'null') return;
    setSelectedOptions({
      ...selectedOptions,
      [attributeId]: itemValue,
    });
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
      {status === Status.SUCCESS ? renderOptions() : <></>}
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
};

OptionsContainer.defaultProps = {
  errorMessage: '',
  options: null,
  attributes: {},
  selectedOptions: null,
  setSelectedOptions: () => {},
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

export default connect(mapStateToProps)(OptionsContainer);
