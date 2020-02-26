import { Customer } from './Customers';

export const CUSTOMERS_LIST_LOADED = 'CUSTOMERS_LIST_LOADED';
export const CUSTOMERS_LIST_LOADED_ERROR = 'CUSTOMERS_LIST_LOADED_ERROR';
export const CUSTOMERS_SET_SORT = 'CUSTOMERS_SET_SORT';

export interface loadCustomersListSuccess {
 type: typeof CUSTOMERS_LIST_LOADED;
 customersList: Customer[];
}

export interface loadCustomersListError {
 type: typeof CUSTOMERS_LIST_LOADED_ERROR;
}

export interface setSortCustomersList {
 type: typeof CUSTOMERS_SET_SORT;
 sortBy: string;
 sortDirection: string;
}

export type customersActions =
 | loadCustomersListSuccess
 | loadCustomersListError
 | setSortCustomersList;
