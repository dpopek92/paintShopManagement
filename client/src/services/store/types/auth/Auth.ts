import { CustomerT } from '../customers/Customers';

export interface UserT {
 _id: string;
 company: string;
 firstname: string;
 surname: string;
 permission: string;
 email: string;
 isAccepted: boolean;
 isTrusted: boolean;
}

export interface AuthT {
 token: string | null;
 isAuthenticated: boolean;
 user: UserT;
 profile: CustomerT | null;
}
