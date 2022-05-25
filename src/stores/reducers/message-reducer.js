import { HIDE_MESSAGE, SHOW_MESSAGE } from '../actions/types';

const initialState = {
  visible: false,
  message: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        visible: true,
        message: action.payload
      };

    case HIDE_MESSAGE:
      return {
        visible: false,
        message: ''
      };
    default:
      return state;
  }
}
