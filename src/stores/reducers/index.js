import { combineReducers } from 'redux';
import productsReducer from './products-reducer';
import queryReducer from './query-reducer';
import themeReducer from './theme-reducer';

export default combineReducers({
  products: productsReducer,
  theme: themeReducer,
  query: queryReducer
});
