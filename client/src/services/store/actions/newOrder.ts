import {
 orderFormSetColorT,
 ORDERFORM_SET_COLOR,
 orderFormSetPaintTypeT,
 ORDERFORM_SET_PAINTTYPE,
 orderFormSetPaintStyleT,
 ORDERFORM_SET_PAINTSTYLE,
 orderFormAddItemT,
 ORDERFORM_ADD_ITEM,
 orderFormSetHandleT,
 ORDERFORM_SET_HANDLE,
 orderFormSetMillingT,
 ORDERFORM_SET_MILLING,
 orderFormSetGlassCaseT,
 ORDERFORM_SET_GLASSCASE,
 orderFormSetVeneerT,
 ORDERFORM_SET_VENEER,
 orderFormSetNutT,
 ORDERFORM_SET_NUT,
 orderFormSetFelcT,
 ORDERFORM_SET_FELC,
 orderFormSetChamferingT,
 ORDERFORM_SET_CHAMFERING,
 orderFormSetNameT,
 ORDERFORM_SET_NAME,
 orderFormSetCommentsT,
 ORDERFORM_SET_COMMENTS,
} from '../types/newOrder/actions';
import {
 OrderPaintTypeT,
 OrderPaintStyleT,
 HandleT,
} from '../types/orders/Orders';

// orderItems
export const addOrderItem = (): orderFormAddItemT => ({
 type: ORDERFORM_ADD_ITEM,
});

// orderForm
export const setComment = (comment: string): orderFormSetCommentsT => ({
 type: ORDERFORM_SET_COMMENTS,
 comment,
});
export const setName = (name: string): orderFormSetNameT => ({
 type: ORDERFORM_SET_NAME,
 name,
});
export const setChamfering = (
 isChamfering: boolean,
): orderFormSetChamferingT => ({
 type: ORDERFORM_SET_CHAMFERING,
 isChamfering,
});
export const setFelc = (isFelc: boolean): orderFormSetFelcT => ({
 type: ORDERFORM_SET_FELC,
 isFelc,
});
export const setNut = (isNut: boolean): orderFormSetNutT => ({
 type: ORDERFORM_SET_NUT,
 isNut,
});
export const setVeneer = (veneer: string): orderFormSetVeneerT => ({
 type: ORDERFORM_SET_VENEER,
 veneer,
});
export const setGlassCase = (glassCase: string): orderFormSetGlassCaseT => ({
 type: ORDERFORM_SET_GLASSCASE,
 glassCase,
});
export const setMilling = (milling: string): orderFormSetMillingT => ({
 type: ORDERFORM_SET_MILLING,
 milling,
});
export const setHandle = (handle: HandleT): orderFormSetHandleT => ({
 type: ORDERFORM_SET_HANDLE,
 handle,
});
export const setColor = (color: string): orderFormSetColorT => ({
 type: ORDERFORM_SET_COLOR,
 color,
});
export const setPaintType = (
 paintType: OrderPaintTypeT,
): orderFormSetPaintTypeT => ({ type: ORDERFORM_SET_PAINTTYPE, paintType });
export const setPaintStyle = (
 paintStyle: OrderPaintStyleT,
): orderFormSetPaintStyleT => ({ type: ORDERFORM_SET_PAINTSTYLE, paintStyle });
