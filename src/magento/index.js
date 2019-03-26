import axios from 'axios';
import admin from './lib/admin';
import { ADMIN_TYPE } from './types';

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
};

class Magento {
  setOptions(options) {
    this.configuration = { ...defaultOptions, ...options };
    this.base_url = this.configuration.url;
    this.root_path = `/rest/${this.configuration.store}`;
    this.admin = admin(this);
  }

  init() {
    return new Promise((resolve, reject) => {
      if (this.configuration.authentication.access_token) {
        this.access_token = this.configuration.authentication.access_token;
        resolve(this);
      } else {
        // Hit rest api to create new access token
        const { username, password, type } = this.configuration.authentication.login;
        const path = '/V1/integration/admin/token';
        this.post(path, null, { username, password })
          .then((token) => {
            this.access_token = token;
            resolve(this);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      }
    });
  }

  post(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'POST', params, data, type);
  }

  get(path, params, data, type = ADMIN_TYPE) {
    return this.send(path, 'GET', params, data, type);
  }

  send(path, method, params, data, type) {
    let url = `${this.base_url}${this.root_path}${path}`;

    const headers = {
      'User-Agent': this.configuration.userAgent,
      'Content-Type': 'application/json',
    };

    if (this.access_token) {
      headers.Authorization = `Bearer ${this.access_token}`;
    }

    return new Promise((resolve, reject) => {
      console.log({ url, method, headers, data, ...params });
      axios({
        url,
        method,
        headers,
        params,
        data,
      })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  isConfigured() {
    return this.access_token != null;
  }

  setStoreConfig(config) {
    this.storeConfig = config[0];
  }

  getHomeData() {
    if (this.configuration.home_cms_block_id) {
      return this.admin.getCmsBlock(this.configuration.home_cms_block_id);
    }
    return false;
  }
}

export const magento = new Magento();
