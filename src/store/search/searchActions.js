import { MAGENTO } from '../../constants';

export const getSearchProducts = (searchInput, offset, sortOrder) => ({
  type: MAGENTO.SEARCH_PRODUCTS_REQUEST,
  payload: { searchInput, offset, sortOrder },
});
