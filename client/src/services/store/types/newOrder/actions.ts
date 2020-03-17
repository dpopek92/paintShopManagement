import { OrderPaintTypeT, OrderPaintStyleT, HandleT } from '../orders/Orders';

export const ORDERFORM_ADD_ITEM = 'ORDERFORM_ADD_ITEM';
export const ORDERFORM_SET_FINISH_DATE = 'ORDERFORM_SET_FINISH_DATE';
export const ORDERFORM_SET_COLOR = 'ORDERFORM_SET_COLOR';
export const ORDERFORM_SET_HANDLE = 'ORDERFORM_SET_HANDLE';
export const ORDERFORM_SET_MILLING = 'ORDERFORM_SET_MILLING';
export const ORDERFORM_SET_GLASSCASE = 'ORDERFORM_SET_GLASSCASE';
export const ORDERFORM_SET_VENEER = 'ORDERFORM_SET_VENEER';
export const ORDERFORM_SET_PAINTTYPE = 'ORDERFORM_SET_PAINTTYPE';
export const ORDERFORM_SET_PAINTSTYLE = 'ORDERFORM_SET_PAINTSTYLE';
export const ORDERFORM_SET_NUT = 'ORDERFORM_SET_NUT';
export const ORDERFORM_SET_FELC = 'ORDERFORM_SET_FELC';
export const ORDERFORM_SET_CHAMFERING = 'ORDERFORM_SET_CHAMFERING';
export const ORDERFORM_SET_NAME = 'ORDERFORM_SET_NAME';
export const ORDERFORM_SET_COMMENTS = 'ORDERFORM_SET_COMMENTS';

// orderItems
export interface orderFormAddItemT {
 type: typeof ORDERFORM_ADD_ITEM;
}

// orderForm
export interface orderFormSetCommentsT {
 type: typeof ORDERFORM_SET_COMMENTS;
 comment: string;
}
export interface orderFormSetNameT {
 type: typeof ORDERFORM_SET_NAME;
 name: string;
}
export interface orderFormSetChamferingT {
 type: typeof ORDERFORM_SET_CHAMFERING;
 isChamfering: boolean;
}
export interface orderFormSetFelcT {
 type: typeof ORDERFORM_SET_FELC;
 isFelc: boolean;
}
export interface orderFormSetNutT {
 type: typeof ORDERFORM_SET_NUT;
 isNut: boolean;
}
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
export interface orderFormSetHandleT {
 type: typeof ORDERFORM_SET_HANDLE;
 handle: HandleT;
}
export interface orderFormSetMillingT {
 type: typeof ORDERFORM_SET_MILLING;
 milling: string;
}
export interface orderFormSetGlassCaseT {
 type: typeof ORDERFORM_SET_GLASSCASE;
 glassCase: string;
}
export interface orderFormSetVeneerT {
 type: typeof ORDERFORM_SET_VENEER;
 veneer: string;
}
export interface orderFormSetFinishDateT {
 type: typeof ORDERFORM_SET_FINISH_DATE;
 term: number;
}

export type orderFormActionsT =
 | orderFormSetNameT
 | orderFormSetCommentsT
 | orderFormSetChamferingT
 | orderFormSetFelcT
 | orderFormSetNutT
 | orderFormSetVeneerT
 | orderFormSetGlassCaseT
 | orderFormSetMillingT
 | orderFormSetHandleT
 | orderFormAddItemT
 | orderFormSetFinishDateT
 | orderFormSetColorT
 | orderFormSetPaintTypeT
 | orderFormSetPaintStyleT;
