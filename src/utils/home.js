import Status from '../magento/Status';

// eslint-disable-next-line import/prefer-default-export
export const formatHomeData = payload => {
  const formattedData = {
    ...payload,
  };
  const content = JSON.parse(
    formattedData.content.replace(/<\/?[^>]+(>|$)/g, ''),
  );
  Object.keys(content.featuredCategories).forEach(key => {
    formattedData[key] = {};
    formattedData[key].status = Status.DEFAULT;
    formattedData[key].items = [];
    formattedData[key].errorMessage = '';
  });
  formattedData.slider = content.slider;
  formattedData.featuredCategories = content.featuredCategories;
  delete formattedData.content;
  return formattedData;
};
