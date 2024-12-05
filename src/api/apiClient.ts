import axios from 'axios';

/**
 * Website:                    https://meetanshi.com/magento-2-demo
 * magento webiste:            https://meetanshi.in/latest/
 * magento website admin page: https://meetanshi.in/latest/admin/admin/
 * Username:                   meetanshi
 * Password:                   demo@123
 */
const MAGENTO_BASE_URL = 'https://meetanshi.in/latest/rest/V1';
const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer',
};

const apiClient = axios.create({
    baseURL: MAGENTO_BASE_URL,
    timeout: 5000,
    headers: headers,
});

export default apiClient;
