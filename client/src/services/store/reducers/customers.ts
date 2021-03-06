import { CustomersT } from '../types/customers/Customers';
import {
 customersActionsT,
 CUSTOMERS_LIST_LOADED,
 CUSTOMERS_SET_SORT,
} from '../types/customers/actions';

const initialState: CustomersT = {
 list: [],
 sortBy: 'company',
 sortDirection: 'ascend',
};

const customersReducer = (state = initialState, action: customersActionsT) => {
 switch (action.type) {
  case CUSTOMERS_LIST_LOADED:
   return { ...state, list: action.customersList };
  case CUSTOMERS_SET_SORT:
   return {
    ...state,
    sortBy: action.sortBy,
    sortDirection: action.sortDirection,
   };
  default:
   return state;
 }
};

export { customersReducer };
