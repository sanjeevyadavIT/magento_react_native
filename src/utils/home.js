import Status from '../magento/Status';

export const formatHomeData = payload => {
  const content = JSON.parse(payload.content.replace(/<\/?[^>]+(>|$)/g, ''));
  const featuredCategories = {};
  Object.keys(content.featuredCategories).forEach(key => {
    featuredCategories[key] = {};
    featuredCategories[key].status = Status.DEFAULT;
    featuredCategories[key].items = [];
    featuredCategories[key].errorMessage = '';
    featuredCategories[key].title = content.featuredCategories[key].title;
  });
  content.featuredCategories = featuredCategories;
  return content;
};
