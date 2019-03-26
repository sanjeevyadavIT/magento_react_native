import { ADMIN_TYPE } from '../../types';

export default magento => ({
  getStoreConfig: () => (
    new Promise((resolve, reject) => {
      const path = '/V1/store/storeConfigs';

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
          magento.setStoreConfig(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getCategoryTree: () => (
    new Promise((resolve, reject) => {
      const path = '/V1/categories';

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getCategoryProducts: (id) => {
    const params = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'category_id',
      'searchCriteria[filterGroups][0][filters][0][value]': id,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
      'searchCriteria[filterGroups][1][filters][0][field]': 'visibility',
      'searchCriteria[filterGroups][1][filters][0][value]': '4',
      'searchCriteria[filterGroups][1][filters][0][conditionType]': 'eq',
      /*
        // TODO: Implement pagination
        'searchCriteria[pageSize]': pageSize,
        'searchCriteria[currentPage]': currentPage,
      */
    };
    return magento.admin.getProductsWithSearchCritaria(params);
  },

  getProductsWithAttribute: (
    attributeCode,
    attributeValue,
    pageSize = 10,
    offset = 0,
    conditionType = 'like'
  ) => {
    const params = {
      'searchCriteria[filterGroups][0][filters][0][field]': attributeCode,
      'searchCriteria[filterGroups][0][filters][0][value]': attributeValue,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': conditionType,
      'searchCriteria[filterGroups][1][filters][0][field]': 'visibility',
      'searchCriteria[filterGroups][1][filters][0][value]': '4',
      'searchCriteria[filterGroups][1][filters][0][conditionType]': 'eq',
      /*
        // TODO: Implement pagination
        'searchCriteria[pageSize]': pageSize,
        'searchCriteria[currentPage]': currentPage
      */
    };
    return magento.admin.getProductsWithSearchCritaria(params);
  },

  getProductsWithSearchCritaria: params => (
    new Promise((resolve, reject) => {
      const path = '/V1/products';

      magento.get(path, params, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getProductBySku: sku => (
    new Promise((resolve, reject) => {
      const path = `/V1/products/${sku}`;

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),

  getCmsBlock: id => (
    new Promise((resolve, reject) => {
      const path = `/V1/cmsBlock/${id}`;

      magento.get(path, undefined, undefined, ADMIN_TYPE)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  ),
});
