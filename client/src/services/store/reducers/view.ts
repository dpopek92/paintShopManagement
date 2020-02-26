import { viewActions, VIEW_SET_SPINNER } from '../types/view/actions';
import { View } from '../types/view/View';

const initialState: View = {
 isSpinner: false,
};

const viewReducer = (state = initialState, action: viewActions): View => {
 switch (action.type) {
  case VIEW_SET_SPINNER: {
   return { ...state, isSpinner: action.isSpinner };
  }
  default:
   return state;
 }
};

export { viewReducer };
