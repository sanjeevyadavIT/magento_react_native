import { magento } from '../magento';

export const getProductThumbnailFromAttribute = (product) => {
  let result = magento.getProductMediaUrl();
  product.custom_attributes.some((attribute) => {
    if (attribute.attribute_code === 'thumbnail') {
      result += attribute.value;
      return true;
    }
  });
  return result;
};
