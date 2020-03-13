import { CustomerT } from './Customers';

export const CUSTOMERS_LIST_LOADED = 'CUSTOMERS_LIST_LOADED';
export const CUSTOMERS_LIST_LOADED_ERROR = 'CUSTOMERS_LIST_LOADED_ERROR';
export const CUSTOMERS_SET_SORT = 'CUSTOMERS_SET_SORT';

export interface loadCustomersListSuccessT {
 type: typeof CUSTOMERS_LIST_LOADED;
 customersList: CustomerT[];
}

export interface loadCustomersListErrorT {
 type: typeof CUSTOMERS_LIST_LOADED_ERROR;
}

export interface setSortCustomersListT {
 type: typeof CUSTOMERS_SET_SORT;
 sortBy: string;
 sortDirection: string;
}

export type customersActionsT =
 | loadCustomersListSuccessT
 | loadCustomersListErrorT
 | setSortCustomersListT;
