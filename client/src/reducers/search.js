import {
 SET_HOME_SEARCH,
 SET_SEARCH_RESULT,
 SET_SEARCH_RESULT_ERROR,
 SET_SORT_SEARCH_LIST,
 SET_SEARCH_VALUE,
 SET_SEARCH_VALUES_EMPTY
} from "../actions/types";

const initialState = {
 user: "",
 number: "",
 color: "",
 name: "",
 isSearch: false,
 searchResult: null,
 sortBy: ""
};

export default (state = initialState, action) => {
 switch (action.type) {
  case SET_SEARCH_VALUES_EMPTY: {
   return { ...initialState };
  }
  case SET_SEARCH_VALUE: {
   return { ...state, [action.name]: action.value };
  }
  case SET_SORT_SEARCH_LIST: {
   return { ...state, sortBy: action.value };
  }
  case SET_HOME_SEARCH: {
   return { ...state, isSearch: action.value };
  }
  case SET_SEARCH_RESULT: {
   return { ...state, searchResult: action.value };
  }
  case SET_SEARCH_RESULT_ERROR: {
   return { ...state, searchResult: null };
  }
  default:
   return state;
 }
};
