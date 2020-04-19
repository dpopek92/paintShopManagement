import { viewActionsT } from './view/actions';
import { customersActionsT } from './customers/actions';
import { authActionsT } from './auth/actions';
import { settingsActionsT } from './settings/actions';
import { orderFormAddItemT } from './newOrder/actions';
import { ordersActionsT } from './orders/actions';

export type appActionsT =
 | ordersActionsT
 | orderFormAddItemT
 | viewActionsT
 | customersActionsT
 | authActionsT
 | settingsActionsT;
