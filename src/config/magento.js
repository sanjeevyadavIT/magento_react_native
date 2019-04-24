export const magentoOptions = {
  url: 'http://13.233.82.59/magento/index.php/',
  home_cms_block_id: 19,// required int
  authentication: {
    login: {
      type: 'admin',
      username: 'api_consumer',
      password: 'wtf_changeme2',
    },
    integration: {
      access_token: null,
    }
  }
}
