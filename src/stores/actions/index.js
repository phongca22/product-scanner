import { SET_PRODUCTS, SET_THEME } from './types';

export const setProducts = (data) => ({ type: SET_PRODUCTS, payload: data });
export const setTheme = (data) => ({ type: SET_THEME, payload: data });
