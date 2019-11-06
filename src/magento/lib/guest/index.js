import { GUEST_TYPE } from '../../types';

export default magento => ({
  auth: (email, password) => magento.post('/V1/integration/customer/token', undefined, { password, username: email }, GUEST_TYPE),

  signup: payload => magento.post('/V1/customers', undefined, payload, GUEST_TYPE),

  getCurrency: () => magento.get('/V1/directory/currency', undefined, undefined, GUEST_TYPE),

  resetPassword: email => magento.put(
    '/V1/customers/password',
    undefined,
    {
      email,
      template: 'email_reset',
      websiteId: magento.storeConfig.website_id,
    },
    GUEST_TYPE
  ),
});
