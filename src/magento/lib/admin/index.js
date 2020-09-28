import { ADMIN_TYPE } from '../../types';
import { LIMITS } from '../../../constants';

const PAGE_SIZE = 10;

const getSortFieldName = sortOrder => {
  switch (sortOrder) {
    case '0':
    case '1':
      return 'name';
    case '2':
    case '3':
      return 'price';
    default:
      return '';
  }
};

const getSortDirection = sortOrder => {
  switch (sortOrder) {
    case '0':
    case '2':
      return 'ASC';
    case '1':
    case '3':
      return 'DESC';
    default:
      return '';
  }
};

export default magento => ({
  getStoreConfig: () =>
    magento.get('/V1/store/storeConfigs', undefined, undefined, ADMIN_TYPE),

  getCategoryTree: () =>
    magento.get('/V1/categories', undefined, undefined, ADMIN_TYPE),

  getCategoryProducts: (id, offset = 1, sortOrder, pageSize = PAGE_SIZE) =>
    magento.admin.getProductsWithAttribute(
      'category_id',
      id,
      offset,
      sortOrder,
      pageSize,
      'eq',
    ),

  getProductsWithAttribute: (
    attributeCode,
    attributeValue,
    offset = 1,
    sortOrder,
    pageSize = PAGE_SIZE,
    conditionType = 'like',
  ) => {
    const currentPage = parseInt(offset / pageSize, 10) + 1;
    const params = {
      'searchCriteria[filterGroups][0][filters][0][field]': attributeCode,
      'searchCriteria[filterGroups][0][filters][0][value]': attributeValue,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': conditionType,
      'searchCriteria[filterGroups][1][filters][0][field]': 'visibility',
      'searchCriteria[filterGroups][1][filters][0][value]': '4',
      'searchCriteria[filterGroups][1][filters][0][conditionType]': 'eq',
      'searchCriteria[pageSize]': pageSize,
      'searchCriteria[currentPage]': currentPage,
    };
    if (sortOrder) {
      params['searchCriteria[sortOrders][0][field]'] = getSortFieldName(
        sortOrder,
      );
      params['searchCriteria[sortOrders][0][direction]'] = getSortDirection(
        sortOrder,
      );
    }
    return magento.admin.getProductsWithSearchCritaria(params);
  },

  getProductsWithSearchCritaria: params =>
    magento.get('/V1/products', params, undefined, ADMIN_TYPE),

  getProductBySku: sku =>
    magento.get(`/V1/products/${sku}`, undefined, undefined, ADMIN_TYPE),

  getConfigurableChildren: sku =>
    magento.get(
      `/V1/configurable-products/${sku}/children`,
      undefined,
      undefined,
      ADMIN_TYPE,
    ),

  getConfigurableProductOptions: sku =>
    magento.get(
      `/V1/configurable-products/${sku}/options/all`,
      undefined,
      undefined,
      ADMIN_TYPE,
    ),

  getAttributeById: attributeId =>
    magento.get(
      `/V1/products/attributes/${attributeId}`,
      undefined,
      undefined,
      ADMIN_TYPE,
    ),

  getProductMedia: sku =>
    magento.get(`/V1/products/${sku}/media`, undefined, undefined, ADMIN_TYPE),

  getCmsBlock: id =>
    magento.get(`/V1/cmsBlock/${id}`, undefined, undefined, ADMIN_TYPE),

  getOrders: ({
    customerId,
    /**
     * Number of items already fetched
     */
    offset = 0,
    pageSize = LIMITS.ordersPageSize,
  }) => {
    const path = '/V1/orders';
    const currentPage = parseInt(offset / pageSize, 10) + 1;
    const params = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'customer_id',
      'searchCriteria[filterGroups][0][filters][0][value]': customerId,
      'searchCriteria[sortOrders][0][field]': 'created_at',
      'searchCriteria[sortOrders][0][direction]': 'DESC',
      'searchCriteria[pageSize]': pageSize,
      'searchCriteria[currentPage]': currentPage,
    };

    return magento.get(path, params, undefined, ADMIN_TYPE);
  },

  getOrderDetail: orderId =>
    magento.get(`/V1/orders/${orderId}`, undefined, undefined, ADMIN_TYPE),

  updateCustomerData: ({ customerId, customerData }) =>
    magento.put(
      `/V1/customers/${customerId}`,
      undefined,
      customerData,
      ADMIN_TYPE,
    ),
});
