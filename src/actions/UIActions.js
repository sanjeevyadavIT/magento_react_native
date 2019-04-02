import {
  UI_PRODUCT_UPDATE_OPTIONS,
} from './types';

export const uiProductUpdate = selectedOptions => {
  return {
    type: UI_PRODUCT_UPDATE_OPTIONS,
    payload: selectedOptions,
  };
}
