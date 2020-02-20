import {
 LOAD_GLOBAL_SETTINGS,
 LOAD_GLOBAL_SETTINGS_ERROR
} from "../actions/types";

const initialState = {
 paintMaker: null,
 finishTerm: null
};

export default (state = initialState, action) => {
 switch (action.type) {
  case LOAD_GLOBAL_SETTINGS:
   return {
    ...state,
    paintMaker: action.paintMaker,
    finishTerm: action.finishTerm
   };
  case LOAD_GLOBAL_SETTINGS_ERROR:
   return { ...initialState };

  default:
   return state;
 }
};
