import { GUEST_TYPE } from '../../types';

export default magento => ({
  login: ({ email, password }) =>
    magento.post(
      '/V1/integration/customer/token',
      undefined,
      { password, username: email },
      GUEST_TYPE,
    ),

  signup: ({ firstName, lastName, email, password }) => {
    const requestBody = {
      customer: {
        email,
        firstname: firstName,
        lastname: lastName,
      },
      password,
    };
    return magento.post('/V1/customers', undefined, requestBody, GUEST_TYPE);
  },

  getCurrency: () =>
    magento.get('/V1/directory/currency', undefined, undefined, GUEST_TYPE),

  getCountries: () =>
    magento.get('/V1/directory/countries', undefined, undefined, GUEST_TYPE),

  resetPassword: ({ email }) =>
    magento.put(
      '/V1/customers/password',
      undefined,
      {
        email,
        template: magento.configuration.password_reset_template,
        websiteId: magento.storeConfig.website_id,
      },
      GUEST_TYPE,
    ),
});
