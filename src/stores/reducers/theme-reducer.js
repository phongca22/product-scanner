import { themes } from '../../theme';
import { SET_THEME } from '../actions/types';

const initialState = themes.light;

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
}
