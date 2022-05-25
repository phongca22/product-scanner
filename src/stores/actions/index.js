import { HIDE_MESSAGE, SET_PRODUCTS, SET_QUERY, SET_THEME, SHOW_MESSAGE } from './types';

export const setProducts = (data) => ({ type: SET_PRODUCTS, payload: data });
export const setTheme = (data) => ({ type: SET_THEME, payload: data });
export const setQuery = (data) => ({ type: SET_QUERY, payload: data });
export const showMessage = (data) => ({ type: SHOW_MESSAGE, payload: data });
export const hideMessage = () => ({ type: HIDE_MESSAGE });
