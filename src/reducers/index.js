import { combineReducers } from 'redux';
import CategoryTreeReducer from './CategoryTreeReducer';
import {
  CATEGORY_TREE,
} from './types';

export default combineReducers({
  [CATEGORY_TREE]: CategoryTreeReducer,
})
