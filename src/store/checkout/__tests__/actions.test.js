import {
  getCountries,
  placeCartOrder,
  getOrderDetail,
  resetPaymentState,
  getShippingMethod,
  resetCheckoutState,
  resetShippingState,
  addCartShippingInfo,
  addCartBillingAddress,
  resetCheckoutAddressState,
} from '../actions';

describe('checkout actions', () => {
  test('getCountries()', () => {
    // Exercise
    const result = getCountries();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('addCartBillingAddress()', () => {
    // Setup
    const input = {
      address: {
        region: 'California',
        region_id: 2,
        region_code: 'CA',
        country_id: 'US',
        street: ['Elm street'],
        telephone: 123456789,
        postcode: 123456,
        city: 'west world',
        firstname: 'Sanjeev',
        lastname: 'Yadav',
        same_as_billing: 1,
      },
      useForShipping: true,
    };

    // Exercise
    const result = addCartBillingAddress(input);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getShippingMethod()', () => {
    // Setup
    const input = {
      address: {
        region: 'California',
        region_id: 2,
        region_code: 'CA',
        country_id: 'US',
        street: ['Elm street'],
        telephone: 123456789,
        postcode: 123456,
        city: 'West world',
        firstname: 'Sanjeev',
        lastname: 'Yadav',
      },
    };

    // Exercise
    const result = getShippingMethod(input);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('addCartShippingInfo()', () => {
    // Setup
    const input = {
      addressInformation: {
        shipping_address: {
          region: 'California',
          region_id: 2,
          region_code: 'CA',
          country_id: 'US',
          street: 'Elm Street',
          telephone: 123456789,
          postcode: 123456,
          city: 'West world',
          firstname: 'Sanjeev',
          lastname: 'Yadav',
          email: 'sanjeev@gmail.com',
        },
        billing_address: {
          region: 'California',
          region_id: 2,
          region_code: 'CA',
          country_id: 'US',
          street: 'Elm Street',
          telephone: 123456789,
          postcode: 123456,
          city: 'West world',
          firstname: 'Sanjeev',
          lastname: 'Yadav',
          email: 'sanjeev@gmail.com',
        },
        shipping_method_code: 'FREE',
        shipping_carrier_code: 'FREE',
        extension_attributes: {},
      }
    };

    // Exercise
    const result = addCartShippingInfo(input);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('placeCartOrder()', () => {
    // Setup
    const paymentInformation = {
      billingAddress: {
        region: 'California',
        region_id: 2,
        region_code: 'CA',
        country_id: 'US',
        street: 'Elm Street',
        telephone: 123456789,
        postcode: 123456,
        city: 'West world',
        firstname: 'Sanjeev',
        lastname: 'Yadav',
        email: 'sanjeev@gmail.com',
      },
      paymentMethod: {
        method: 'COD'
      }
    };

    // Exercise
    const result = placeCartOrder(paymentInformation);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('getOrderDetail()', () => {
    // Setup
    const orderId = 33;

    // Exercise
    const result = getOrderDetail(orderId);

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('resetCheckoutState()', () => {
    // Exercise
    const result = resetCheckoutState();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('resetCheckoutAddressState()', () => {
    // Exercise
    const result = resetCheckoutAddressState();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('resetShippingState()', () => {
    // Exercise
    const result = resetShippingState();

    // Verify
    expect(result).toMatchSnapshot();
  });

  test('resetPaymentState()', () => {
    // Exercise
    const result = resetPaymentState();

    // Verify
    expect(result).toMatchSnapshot();
  });
});
