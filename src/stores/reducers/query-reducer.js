import { SET_QUERY } from '../actions/types';

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return action.payload;
    default:
      return state;
  }
}
