import { UserT } from '../auth/Auth';
import {
 CompanyMaterialPricesT,
 CustomerMaterialPricesT,
 ServicesPricesT,
} from '../settings/Settings';

export interface CustomerT {
 user: UserT;
 _id: string;
 postcode: string;
 NIP: string;
 city: string;
 street: string;
 phone: string;
 ordersNumber: number;
 currentFreeOrderId: number;
 subordinates: string[] | [];
 discounts: DiscountsT;
}

export interface DiscountsT {
 companyMaterial: CompanyMaterialPricesT;
 customerMaterial: CustomerMaterialPricesT;
 services: ServicesPricesT;
}

export interface CustomersT {
 list: CustomerT[] | [];
 sortBy: string;
 sortDirection: string;
}
