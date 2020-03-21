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
 orderFormHandleItemFieldT,
 ORDERFORM_HANDLE_ITEM_FIELD,
 orderFormHandleItemInputT,
 ORDERFORM_HANDLE_ITEM_INPUT,
 orderFormRemoveItemT,
 ORDERFORM_REMOVE_ITEM,
 orderFormRemoveHandleT,
 ORDERFORM_REMOVE_HANDLE,
 orderFormSetFinishDateT,
 ORDERFORM_SET_FINISH_DATE,
 orderFormAddItemImageT,
 ORDERFORM_ADD_ITEM_IMAGE,
 orderFormRemoveItemImageT,
 ORDERFORM_REMOVE_ITEM_IMAGE,
 orderFormSetCustomMillingT,
 ORDERFORM_SET_CUSTOM_MILLING,
 orderFormCalculateSurfacesT,
 ORDERFORM_CALCULATE_SURFACES,
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
export const removeOrderItem = (index: number): orderFormRemoveItemT => ({
 type: ORDERFORM_REMOVE_ITEM,
 index,
});
export const addItemImage = (
 index: number,
 file: File,
): orderFormAddItemImageT => ({
 type: ORDERFORM_ADD_ITEM_IMAGE,
 index,
 file,
});
export const removeItemImage = (index: number): orderFormRemoveItemImageT => ({
 type: ORDERFORM_REMOVE_ITEM_IMAGE,
 index,
});
export const handleItemField = (
 index: number,
 field: string,
 value: any,
): orderFormHandleItemFieldT => ({
 type: ORDERFORM_HANDLE_ITEM_FIELD,
 index,
 field,
 value,
});
export const handleItemInput = (
 index: number,
 field: string,
 value: any,
): orderFormHandleItemInputT => ({
 type: ORDERFORM_HANDLE_ITEM_INPUT,
 index,
 field,
 value,
});

// orderForm
export const calculateSurfaces = (): orderFormCalculateSurfacesT => ({
 type: ORDERFORM_CALCULATE_SURFACES,
});
export const removeHandle = (
 field: 'handleSymbol1' | 'handleSymbol2',
): orderFormRemoveHandleT => ({
 type: ORDERFORM_REMOVE_HANDLE,
 field,
});
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
export const setCustomMilling = (file: File): orderFormSetCustomMillingT => ({
 type: ORDERFORM_SET_CUSTOM_MILLING,
 file,
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
export const setFinishDate = (finishDate: Date): orderFormSetFinishDateT => ({
 type: ORDERFORM_SET_FINISH_DATE,
 finishDate,
});
