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

export interface Profile {
 _id: string;
 user: string;
 postcode: string;
 NIP: string;
 city: string;
 street: string;
 phone: string;
 ordersNumber: number;
 currentFreeOrderId: number;
}

export interface Auth {
 token: string | null;
 isAuthenticated: boolean;
 user: User;
 profile: Profile;
}
