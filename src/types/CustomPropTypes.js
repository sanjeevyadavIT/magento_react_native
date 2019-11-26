import {
  any,
  shape,
  number,
  string,
  oneOf,
  oneOfType,
  arrayOf,
} from 'prop-types';

export const ProductType = shape({
  id: number,
  sku: string.isRequired,
  name: string,
  price: number,
  status: number,
  visibility: number,
  type_id: oneOf(['simple', 'virtual', 'bundle', 'downloadable', 'grouped', 'configurable']),
  custom_attributes: arrayOf(shape({
    attribute_code: string,
    value: oneOfType([
      string,
      arrayOf(string),
    ])
  }))
});

export const PaymentTotalProps = shape({
  grand_total: number,
  base_grand_total: number,
  subtotal: number,
  base_subtotal: number,
  discount_amount: number,
  base_discount_amount: number,
  subtotal_with_discount: number,
  base_subtotal_with_discount: number,
  shipping_amount: number,
  base_shipping_amount: number,
  shipping_discount_amount: number,
  base_shipping_discount_amount: number,
  tax_amount: number,
  base_tax_amount: number,
  weee_tax_applied_amount: any,
  shipping_tax_amount: number,
  base_shipping_tax_amount: number,
  subtotal_incl_tax: number,
  shipping_incl_tax: number,
  base_shipping_incl_tax: number,
  base_currency_code: string,
  quote_currency_code: string,
  items_qty: number,
  items: arrayOf(
    shape({
      item_id: number,
      price: number,
      base_price: number,
      qty: number,
      row_total: number,
      base_row_total: number,
      row_total_with_discount: number,
      tax_amount: number,
      base_tax_amount: number,
      tax_percent: number,
      discount_amount: number,
      base_discount_amount: number,
      discount_percent: number,
      price_incl_tax: number,
      base_price_incl_tax: number,
      row_total_incl_tax: number,
      base_row_total_incl_tax: number,
      options: string,
      weee_tax_applied_amount: any,
      weee_tax_applied: any,
      name: string
    })
  ),
  total_segments: arrayOf(
    shape({
      code: string,
      title: string,
      value: number
    })
  )
});
