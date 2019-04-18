import { magento } from '../magento';

export const getProductThumbnailFromAttribute = product => {
  let result = magento.getProductMediaUrl();
  product.custom_attributes.map(attribute => {
    if (attribute.attribute_code === 'thumbnail') {
      result += attribute.value;
    }
    return attribute.value;
  });
  return result;
};
