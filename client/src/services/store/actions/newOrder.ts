import {
 orderFormSetColorT,
 ORDERFORM_SET_COLOR,
 orderFormSetPaintTypeT,
 ORDERFORM_SET_PAINTTYPE,
 orderFormSetPaintStyleT,
 ORDERFORM_SET_PAINTSTYLE,
 orderFormAddItemT,
 ORDERFORM_ADD_ITEM,
} from '../types/newOrder/actions';
import { OrderPaintTypeT, OrderPaintStyleT } from '../types/orders/Orders';

// orderItems
export const addOrderItem = (): orderFormAddItemT => ({
 type: ORDERFORM_ADD_ITEM,
});

// orderForm
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
