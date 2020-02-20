import {
 ORDERS_IN_PRODUCTION_LOADED,
 ORDERS_IN_PRODUCTION_LOADED_ERROR,
 SET_PRODUCTION_FILTER,
 SET_ACTIVE_LIST,
 CLEAR_FILTERS
} from "../actions/types";

const initialState = {
 list: null,
 customers: [],
 colors: [],
 activeList: null,
 filters: {
  color: "",
  customer: "",
  status: "",
  paintType: "",
  name: ""
 }
};

export default (state = initialState, action) => {
 switch (action.type) {
  case SET_PRODUCTION_FILTER: {
   return {
    ...state,
    filters: { ...state.filters, [action.filter]: action.name }
   };
  }
  case CLEAR_FILTERS: {
   return {
    ...state,
    filters: { color: "", customer: "", status: "", paintType: "", name: "" }
   };
  }
  case SET_ACTIVE_LIST: {
   return {
    ...state,
    activeList: action.list
   };
  }
  case ORDERS_IN_PRODUCTION_LOADED:
   const cust = [];
   const col = [];
   action.payload.forEach(item => {
    if (!cust.includes(item.user.company)) {
     cust.push(item.user.company);
    }
    if (!col.includes(item.color)) {
     col.push(item.color);
    }
   });
   return {
    ...state,
    list: action.payload,
    customers: cust,
    colors: col
   };
  case ORDERS_IN_PRODUCTION_LOADED_ERROR:
   return {
    ...state,
    inProduction: null
   };

  default:
   return state;
 }
};
