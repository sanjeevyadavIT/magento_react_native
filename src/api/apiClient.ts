import axios from 'axios';
import Config from '../../config';
import useUserStore from '../store/useUserStore';

const headers = {
    'Content-Type': 'application/json',
};

const apiClient = axios.create({
    baseURL: `${Config.url}rest/${Config.store ?? 'default'}/V1`,
    timeout: 5000,
    headers: headers,
});

apiClient.interceptors.request.use(function (config) {
    if (config.headers.magentoUserType === 'ADMIN') {
        config.headers.Authorization = `Bearer ${Config.authentication?.integration.access_token}`;
    } else if (config.headers.magentoUserType === 'CUSTOMER') {
        config.headers.Authorization = `Bearer ${
            useUserStore.getState().userToken
        }`;
    }
    return config;
});

export default apiClient;
