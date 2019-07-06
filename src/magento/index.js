import axios from 'axios';
import admin from './lib/admin';
import guest from './lib/guest';
import customer from './lib/customer';
import { isNumber } from '../utils';
import { ADMIN_TYPE, CUSTOMER_TYPE } from './types';
import {
  HOME_CMS_BLOCK_ID_ERROR,
  HOME_CMS_BLOCK_ID_MESSAGE,
  INTEGRATION_TOKEN_REQUIRED_ERROR,
  INTEGRATION_TOKEN_REQUIRED_MESSAGE,
} from '../constants';

const log = process.env.NODE_ENV === 'development' ? console.log : null;

const defaultOptions = {
  url: null,
  store: 'default',
  userAgent: 'Sanjeev Yadav Magento Library',
  home_cms_block_id: '',
  authentication: {
    integration: {
      access_token: undefined,
    }
  }
};

class Magento {
  setOptions(options) {
    this.configuration = { ...defaultOptions, ...options };
    this.base_url = this.configuration.url;
    this.root_path = `/rest/${this.configuration.store}`;
    this.admin = admin(this);
    this.guest = guest(this);
    this.customer = customer(this);
  }

  init() {
    if (this.configuration.authentication.integration.access_token) {
      this.access_token = this.configuration.authentication.integration.access_token;
      return;
    }
    throw integrationTokenError();
  }

  post(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'POST', params, data, type);
  }

  get(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'GET', params, data, type);
  }

  delete(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'DELETE', params, data, type);
  }

  send(path, method, params, data, type) {
    const url = `${this.base_url}${this.root_path}${path}`;

    const headers = {
      'User-Agent': this.configuration.userAgent,
      'Content-Type': 'application/json',
    };

    if (this.access_token && type === ADMIN_TYPE) {
      headers.Authorization = `Bearer ${this.access_token}`;
    } else if (this.customerToken && type === CUSTOMER_TYPE) {
      headers.Authorization = `Bearer ${this.customerToken}`;
    }

    return new Promise((resolve, reject) => {
      log({ url, method, headers, data, ...params });
      axios({
        url,
        method,
        headers,
        params,
        data,
      })
        .then((response) => {
          log(response);
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            log('error.response.data: ', error.response.data);
            log('error.response.status: ', error.response.status);
            log('error.response.headers: ', error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            log('No response received, error.request: ', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            log('Unknown error, error.message: ', error.message);
          }
          log('error.config: ', error.config);
          const customError = Magento.extractErrorMessage(error.response.data);
          reject(customError);
        });
    });
  }

  static extractErrorMessage(data) {
    let { message, parameters } = data;
    if (typeof parameters !== 'undefined' && parameters.length > 0) {
      data.parameters.forEach((item, index) => {
        message = message.replace(`%${index + 1}`, item);
      });
    }
    return { message };
  }

  isConfigured() {
    return this.access_token != null;
  }

  isCustomerLogin() {
    return !!this.customerToken;
  }

  setStoreConfig([config]) {
    this.storeConfig = config;
  }

  setCustomerToken(token) {
    this.customerToken = token;
  }

  getMediaUrl() {
    return `${this.storeConfig.base_media_url}`;
  }

  getProductMediaUrl() {
    return `${this.storeConfig.base_media_url}catalog/product`;
  }

  getHomeData() {
    if (isNumber(this.configuration.home_cms_block_id)) {
      return this.admin.getCmsBlock(this.configuration.home_cms_block_id);
    }
    throw homeCmsBlockError();
  }
}

function homeCmsBlockError() {
  return createError(HOME_CMS_BLOCK_ID_ERROR, HOME_CMS_BLOCK_ID_MESSAGE);
}

function integrationTokenError() {
  return createError(INTEGRATION_TOKEN_REQUIRED_ERROR, INTEGRATION_TOKEN_REQUIRED_MESSAGE);
}

function createError(name, message) {
  const error = new Error();
  error.name = name;
  error.message = message;
  return error;
}

// Constants
export const CUSTOMER_TOKEN = 'customerToken';

export const magento = new Magento();
