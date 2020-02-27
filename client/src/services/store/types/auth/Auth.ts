import { Customer } from '../customers/Customers';

export interface User {
 _id: string;
 company: string;
 firstname: string;
 surname: string;
 permission: string;
 email: string;
 isAccepted: boolean;
 isTrusted: boolean;
}

export interface Auth {
 token: string | null;
 isAuthenticated: boolean;
 user: User;
 profile: Customer | null;
}
