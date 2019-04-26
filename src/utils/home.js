import { ImageSliderItem } from '../components/molecules';

const parseSliderData = slider => slider.map(item => new ImageSliderItem(item.title, item.image, ''));

export const formatHomeData = (payload) => {
  const formattedData = {
    ...payload
  };
  const content = JSON.parse(formattedData.content.replace(/<\/?[^>]+(>|$)/g, ''));
  formattedData.slider = parseSliderData(content.slider);
  formattedData.featuredCategories = content.featuredCategories;
  delete formattedData.content;
  return formattedData;
};
