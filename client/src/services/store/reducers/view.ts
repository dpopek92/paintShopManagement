import { viewActionsT, VIEW_SET_SPINNER } from '../types/view/actions';
import { ViewT } from '../types/view/View';

const initialState: ViewT = {
 isSpinner: false,
};

const viewReducer = (state = initialState, action: viewActionsT): ViewT => {
 switch (action.type) {
  case VIEW_SET_SPINNER: {
   return { ...state, isSpinner: action.isSpinner };
  }
  default:
   return state;
 }
};

export { viewReducer };
