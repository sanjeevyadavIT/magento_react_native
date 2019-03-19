/**
 * Don't call any function from this file,
 * all the possible actions are defined in src/actions/RestActions.js
 */
import { takeEvery, call, put } from 'redux-saga/effects'
import { 
	MAGENTO_INIT,
	MAGENTO_GET_CATEGORY_TREE,
	MAGENTO_SET_CATEGORY_TREE,
	MAGENTO_ERROR_CATEGORY_TREE,
} from '../actions/types';
import { magento } from '../magento';
import { magentoOptions } from './magento';


const initMagento = function* (action) {
	try {
		//set magento url and admin access
		magento.setOptions(magentoOptions);
		//fetch access token
		yield call({ context: magento, fn: magento.init });
		//fetch store configuration details
		yield call(magento.admin.getStoreConfig);
	} catch (error) {
		console.log(error);
	}

}

const getCategoryTree = function* (action){
	try {
		console.log('Inside getCategory tree saga');
		const payload = yield call({context: magento, fn: magento.admin.getCategoryTree});
		//dispatch an action to set category tree
		yield put({ type: MAGENTO_SET_CATEGORY_TREE, payload});

	}catch(error){
		yield put({ type: MAGENTO_ERROR_CATEGORY_TREE, error});
		console.log(error);
	}
}

const rootSaga = function* () {
	yield takeEvery(MAGENTO_INIT, initMagento);
	yield takeEvery(MAGENTO_GET_CATEGORY_TREE, getCategoryTree);
}

export default rootSaga;