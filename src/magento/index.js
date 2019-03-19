import axios from 'axios';
import { REST_API_BASE_URL as BASE_URL, WEB_SERVICE_ADMIN_TOKEN, WEB_SERVICE_CATEGORY, WEB_SERVICE_PRODUCT_LIST_FOR_CATEGORY, WEB_SERVICE_PRODUCT } from '../constants';
import admin from './lib/admin';
import { ADMIN_TYPE } from './types';

function createProductsUrl(categoryId) {
  return `${BASE_URL}${WEB_SERVICE_PRODUCT_LIST_FOR_CATEGORY}${categoryId}&searchCriteria[filterGroups][0][filters][1][field]=visibility&searchCriteria[filterGroups][0][filters][1][value]=4`;
}

export const getProducts = async (categoryId) => {
  const tokenResult = await axios({
    url: `${BASE_URL}${WEB_SERVICE_ADMIN_TOKEN}`,
    method: 'post',
    data: {
      username: 'api_consumer',
      password: 'wtf_changeme2'
    }
  });

  const productsResult = await axios.get(createProductsUrl(categoryId), {
    headers: {
      Authorization: `Bearer ${tokenResult.data}`,
    }
  })

  return await productsResult.data;
}

export const getProduct = async (sku) => {
  const tokenResult = await axios({
    url: `${BASE_URL}${WEB_SERVICE_ADMIN_TOKEN}`,
    method: 'post',
    data: {
      username: 'api_consumer',
      password: 'wtf_changeme2'
    }
  });

  const productResult = await axios.get(`${BASE_URL}${WEB_SERVICE_PRODUCT}/${sku}`, {
    headers: {
      Authorization: `Bearer ${tokenResult.data}`,
    }
  })

  return await productResult.data;
}

const defaultOptions = {
  url: null,
  store: 'default',
  userAgent: 'Sanjeev Yadav MAgento Library',
  authentication: {
    login: {
      type: 'admin',
      username: undefined,
      password: undefined,
    },
    integration: {
      access_token: undefined,
    }
  }
}

class Magento {

  setOptions(options) {
    this.configuration = { ...defaultOptions, ...options };
    this.base_url = this.configuration.url;
    this.root_path = `/rest/${this.configuration.store}`;
    this.admin = admin(this);
  }

  init(){
    return new Promise((resolve, reject) => {
      if(this.configuration.authentication.access_token){
        this.access_token = this.configuration.authentication.access_token;
        resolve(this);
      }else{
        //hit api to create new access token
        const { username, password, type } = this.configuration.authentication.login;
        path = '/V1/integration/admin/token';
        this.post( path, null, {username, password})
          .then( token => {
            console.log(token);
            this.access_token = token;
            resolve(this);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
      }
    });
  }

  post(path, params, data, type= ADMIN_TYPE){
    return this.send(path, 'POST', params, data, type);
  }

  get(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'GET', params, data, type);
  }

  send(path, method, params, data, type) {
    let url = `${this.base_url}${this.root_path}${path}`

    const headers = {
      'User-Agent': this.configuration.userAgent,
      'Content-Type': 'application/json',
    }

    if(this.access_token){
      headers.Authorization = `Bearer ${this.access_token}`;
    }

    return new Promise((resolve, reject) => {
      console.log({ url, method, headers, data, ...params })
      axios({
        method,
        url,
        headers,
        data,
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  setStoreConfig(config){
    this.storeConfig = config[0];
  }

}

export const magento = new Magento();
