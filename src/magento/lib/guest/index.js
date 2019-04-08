import { GUEST_TYPE } from '../../types';

export default magento => ({
  auth: (email, password) => (
    new Promise((resolve, reject) => {
      const path = '/V1/integration/customer/token';

      magento.post(path, undefined, { password, username: email }, GUEST_TYPE)
        .then((token) => {
          magento.setCustomerToken(token);
          resolve(token);
        })
        .catch((e) => {
          reject(e);
        });
    })
  ),

  signup: payload => (
    new Promise((resolve, reject) => {
      const path = '/V1/customers';

      magento.post(path, undefined, payload, GUEST_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    })
  ),

});
