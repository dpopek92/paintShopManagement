import { User } from '../auth/Auth';

export interface Customer {
 user: User;
 _id: string;
 postcode: string;
 NIP: string;
 city: string;
 street: string;
 phone: string;
 ordersNumber: number;
 currentFreeOrderId: number;
 subordinates: any;
 discounts: {
  manHour: number;
  gloss: {
   oneSide: number;
   bothSides: number;
   oneGlossSecondSemigloss: number;
  };
  semiGloss: {
   oneSide: number;
   bothSides: number;
  };
  customerMaterial: {
   gloss: {
    oneSide: number;
    bothSides: number;
    oneGlossSecondSemigloss: number;
   };
   semiGloss: {
    oneSide: number;
    bothSides: number;
    mordant: number;
    veneerColorless: number;
   };
   milledElement: number;
   milledElementBothSides: number;
  };
  chamfering: number;
  backMilling: number;
  millingHandle: number;
  paintHandle: number;
  milledHandle: number;
  milledPartHandle: number;
  zobalHandle: number;
  hingeHole: number;
  milledElement: number;
  milledElementBothSides: number;
  board: {
   3: number;
   6: number;
   8: number;
   10: number;
   12: number;
   16: number;
   18: number;
   19: number;
   22: number;
   25: number;
   28: number;
   30: number;
   38: number;
  };
 };
}

export interface Customers {
 list: Customer[] | [];
 sortBy: string;
 sortDirection: string;
}
