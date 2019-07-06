import { GUEST_TYPE } from '../../types';

export default magento => ({
  auth: (email, password) => magento.post('/V1/integration/customer/token', undefined, { password, username: email }, GUEST_TYPE),

  signup: payload => magento.post('/V1/customers', undefined, payload, GUEST_TYPE),

});
