import axios from 'axios';
import {REST_API_BASE_URL as BASE_URL, WEB_SERVICE_ADMIN_TOKEN, WEB_SERVICE_CATEGORY} from '../constants';

export const getCategories = async () => {
    const tokenResult = await axios({
        url:`${BASE_URL}${WEB_SERVICE_ADMIN_TOKEN}`,
        method: 'post',
        data:{
          username: 'api_consumer',
          password: 'wtf_changeme2'
        }
      });

      const categoriesResult = await axios.get(`${BASE_URL}${WEB_SERVICE_CATEGORY}`,{
          headers: {
            Authorization: `Bearer ${tokenResult.data}`,
          }
        })

    return await categoriesResult.data;
}