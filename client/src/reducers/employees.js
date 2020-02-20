import {
 EMPLOYEES_LIST_LOADED,
 EMPLOYEES_LIST_ERROR,
 EMPLOYEE__LOAD__ERROR,
 EMPLOYEE__LOAD
} from "actions/types";

const initialState = {
 list: null,
 employee: null
};

export default (state = initialState, action) => {
 switch (action.type) {
  case EMPLOYEES_LIST_LOADED:
   return { ...state, list: action.employees };
  case EMPLOYEE__LOAD:
   return { ...state, employee: action.employee };
  case EMPLOYEE__LOAD__ERROR:
   return { ...state, employee: null };
  case EMPLOYEES_LIST_ERROR:
   return { ...state, list: null };

  default:
   return state;
 }
};
