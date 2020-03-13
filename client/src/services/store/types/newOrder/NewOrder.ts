import { OrderT } from '../orders/Orders';

export interface NewOrderT extends OrderT {
 isNut: boolean;
 isFelc: boolean;
 isChamfering: boolean;
}
