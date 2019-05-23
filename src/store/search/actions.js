import { MAGENTO } from '../../constants/actionsTypes';

export const getSearchProducts = (searchInput, offset, sortOrder) => ({
  type: MAGENTO.SEARCH_PRODUCTS_REQUEST,
  payload: { searchInput, offset, sortOrder },
});
