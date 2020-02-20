import {
 GET_POSITION_ORDERS,
 GET_POSITION_ORDERS_ERROR,
 GET_POSITION_EMPLOYEES_ERROR,
 GET_POSITION_EMPLOYEES,
 SET_ACTIVE_POSITION,
 SET_EMPLOYEE_FILTER,
 SET_POSITION_ACTIVE_ORDERS,
 CLEAR_EMPLOYEE_FILTER
} from "actions/types";

const initialState = {
 orders: null,
 activeOrders: null,
 colors: [],
 customers: [],
 filters: {
  customer: "",
  color: ""
 },
 activePosition: null,
 employees: null
};

export default (state = initialState, action) => {
 switch (action.type) {
  case CLEAR_EMPLOYEE_FILTER:
   return {
    ...state,
    filters: { customer: "", color: "" }
   };
  case SET_EMPLOYEE_FILTER:
   return {
    ...state,
    filters: { ...state.filters, [action.filterBy]: action.filter }
   };
  case SET_POSITION_ACTIVE_ORDERS:
   return { ...state, activeOrders: action.orders };
  case GET_POSITION_ORDERS:
   const cust = [];
   const col = [];
   action.orders.forEach(item => {
    if (!cust.includes(item.user.company)) {
     cust.push(item.user.company);
    }
    if (!col.includes(item.color)) {
     col.push(item.color);
    }
   });
   return {
    ...state,
    orders: action.orders,
    activeOrders: action.orders,
    customers: cust,
    colors: col
   };
  case GET_POSITION_ORDERS_ERROR:
   return { ...state, orders: null };
  case GET_POSITION_EMPLOYEES:
   return { ...state, employees: action.employees };
  case GET_POSITION_EMPLOYEES_ERROR:
   return { ...state, employees: null };
  case SET_ACTIVE_POSITION:
   localStorage.setItem("activePosition", action.position);
   return { ...state, activePosition: action.position };
  default:
   return state;
 }
};
