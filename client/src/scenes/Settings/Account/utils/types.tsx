import { UserT } from 'services/store/types/auth/Auth';
import { CustomerT } from 'services/store/types/customers/Customers';

export interface passwordChangeValuesT {
 password: string;
 newPassword: string;
 newPassword2: string;
}

export interface userDataChangeValuesT {
 firstname: string;
 surname: string;
 email: string;
 phone: string;
 company: string;
 NIP: string;
 street: string;
 postcode: string;
 city: string;
}
export interface userDataChangeResponseT {
 user: UserT;
 profile: CustomerT;
}
