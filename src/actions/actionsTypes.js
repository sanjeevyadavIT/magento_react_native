const REQUEST = 'REQUEST';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const suffixTypes = [REQUEST, LOADING, SUCCESS, FAILURE];

function createRequestTypes(prefix = '', bases, suffixes = suffixTypes) {
  const req = {};
  bases.forEach((base) => {
    suffixes.forEach((suffix) => {
      req[`${base}_${suffix}`] = `${prefix}_${base}_${suffix}`;
    });
  });
  return req;
}

// Events related to Magento REST API
export const MAGENTO = createRequestTypes('MAGENTO', [
  'INIT_APP', // Configure magento with admin credentials, access token and base url
  'HOME_DATA', // Fetch HomeBanner and featured products for home page
], suffixTypes);
