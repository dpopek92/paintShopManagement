import { User } from 'services/store/types/auth/Auth';
import { Customer } from 'services/store/types/customers/Customers';

export interface passwordChangeValues {
 password: string;
 newPassword: string;
 newPassword2: string;
}

export interface userDataChangeValues {
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
export interface userDataChangeResponse {
 user: User;
 profile: Customer;
}
