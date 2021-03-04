import { combineReducers } from 'redux';
import productsReducer from './products-reducer';
import themeReducer from './theme-reducer';

export default combineReducers({
  products: productsReducer,
  theme: themeReducer
});
