import {
 GET_PRODUCTION_STATS_YEARS,
 GET_PRODUCTION_STATS_YEARS_ERROR,
 SET_ACTIVE_YEAR,
 SET_YEARS_CUSTOMER,
 GET_PRODUCTION_STATS,
 GET_EMPLOYEE_STATS,
 GET_EMPLOYEE_STATS_ERROR,
 GET_CUSTOMER_STATS,
 GET_CUSTOMER_STATS_ERROR,
 GET_PRODUCTION_STATS_ERROR,
 SET_ACTIVE_MONTH,
 SET_ACTIVE_DAY,
 SET_ACTIVE_POSITION_ON_PRODUCTION_STATS,
 SET_ACTIVE_CUSTOMER,
 SET_ACTIVE_EMPLOYEE,
} from '../actions/types';

const initialState = {
 years: null,
 activeYear: null,
 activeMonth: null,
 activeDay: null,
 activePosition: '',
 activeEmployee: '',
 activeCustomer: '',
 productionStats: null,
 employeeStats: null,
 customerStats: null,
};

export default (state = initialState, action) => {
 switch (action.type) {
  case SET_YEARS_CUSTOMER: {
   return {
    ...state,
    years: action.years,
   };
  }
  case GET_PRODUCTION_STATS_YEARS: {
   return {
    ...state,
    years: action.years,
   };
  }
  case SET_ACTIVE_CUSTOMER: {
   return {
    ...state,
    activeCustomer: action.customer,
   };
  }
  case SET_ACTIVE_EMPLOYEE: {
   return {
    ...state,
    activeEmployee: action.employee,
   };
  }
  case GET_EMPLOYEE_STATS: {
   return {
    ...state,
    employeeStats: action.stats,
   };
  }
  case GET_PRODUCTION_STATS: {
   return {
    ...state,
    productionStats: action.stats,
   };
  }
  case SET_ACTIVE_POSITION_ON_PRODUCTION_STATS: {
   return {
    ...state,
    activePosition: action.position,
   };
  }
  case SET_ACTIVE_DAY: {
   return {
    ...state,
    activeDay: action.day,
   };
  }
  case SET_ACTIVE_YEAR: {
   return {
    ...state,
    activeYear: action.year,
   };
  }
  case SET_ACTIVE_MONTH: {
   return {
    ...state,
    activeMonth: action.month,
   };
  }
  case GET_CUSTOMER_STATS:
   return { ...state, customerStats: action.stats };
  case GET_CUSTOMER_STATS_ERROR:
   return { ...state, customerStats: null };
  case GET_EMPLOYEE_STATS_ERROR: {
   return {
    ...state,
    employeeStats: null,
   };
  }
  case GET_PRODUCTION_STATS_ERROR: {
   return {
    ...state,
    productionStats: null,
   };
  }
  case GET_PRODUCTION_STATS_YEARS_ERROR: {
   return {
    ...state,
    years: null,
   };
  }
  default:
   return state;
 }
};
