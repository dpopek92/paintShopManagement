import {
 viewActionsT,
 VIEW_SET_SPINNER,
 VIEW_SET_CATALOG_DRAWER,
 VIEW_SET_HOMEPAGE_KEY,
} from '../types/view/actions';
import { ViewT } from '../types/view/View';

const initialState: ViewT = {
 isSpinner: false,
 catalogDrawer: null,
 homepageKey: 'new',
};

const viewReducer = (state = initialState, action: viewActionsT): ViewT => {
 switch (action.type) {
  case VIEW_SET_CATALOG_DRAWER: {
   return { ...state, catalogDrawer: action.catalogType };
  }
  case VIEW_SET_SPINNER: {
   return { ...state, isSpinner: action.isSpinner };
  }
  case VIEW_SET_HOMEPAGE_KEY: {
   return { ...state, homepageKey: action.key };
  }
  default:
   return state;
 }
};

export { viewReducer };
