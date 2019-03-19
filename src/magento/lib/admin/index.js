import { ADMIN_TYPE } from '../../types';

export default magento => {
	return {
		getStoreConfig: () => {
			return new Promise((resolve, reject) => {
				const path = '/V1/store/storeConfigs';

				magento
					.get(path, undefined, undefined, ADMIN_TYPE)
					.then(data => {
						resolve(data);
						magento.setStoreConfig(data);
					})
					.catch(error => {
						reject(error);
					})
			})
		},

		getCategoryTree: () => {
			return new Promise((resolve, reject) => {
				const path = '/V1/categories';
				console.log('Inside getCategory tree magento admin');

				magento
					.get(path, undefined, undefined, ADMIN_TYPE)
					.then( data => {
						console.log(data);
						resolve(data);
					})
					.catch(error => {
						reject(error);
					})
			});
		},
	}
}