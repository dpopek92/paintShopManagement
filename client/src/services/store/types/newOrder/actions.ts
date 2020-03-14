import { OrderPaintTypeT, OrderPaintStyleT } from '../orders/Orders';

export const ORDERFORM_ADD_ITEM = 'ORDERFORM_ADD_ITEM';
export const ORDERFORM_SET_FINISH_DATE = 'ORDERFORM_SET_FINISH_DATE';
export const ORDERFORM_SET_COLOR = 'ORDERFORM_SET_COLOR';
export const ORDERFORM_SET_PAINTTYPE = 'ORDERFORM_SET_PAINTTYPE';
export const ORDERFORM_SET_PAINTSTYLE = 'ORDERFORM_SET_PAINTSTYLE';

// orderItems
export interface orderFormAddItemT {
 type: typeof ORDERFORM_ADD_ITEM;
}

// orderForm
export interface orderFormSetPaintStyleT {
 type: typeof ORDERFORM_SET_PAINTSTYLE;
 paintStyle: OrderPaintStyleT;
}
export interface orderFormSetPaintTypeT {
 type: typeof ORDERFORM_SET_PAINTTYPE;
 paintType: OrderPaintTypeT;
}
export interface orderFormSetColorT {
 type: typeof ORDERFORM_SET_COLOR;
 color: string;
}
export interface orderFormSetFinishDateT {
 type: typeof ORDERFORM_SET_FINISH_DATE;
 term: number;
}

export type orderFormActionsT =
 | orderFormAddItemT
 | orderFormSetFinishDateT
 | orderFormSetColorT
 | orderFormSetPaintTypeT
 | orderFormSetPaintStyleT;
