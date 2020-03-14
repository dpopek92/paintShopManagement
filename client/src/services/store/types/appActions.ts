import { viewActionsT } from './view/actions';
import { customersActionsT } from './customers/actions';
import { authActionsT } from './auth/actions';
import { settingsActionsT } from './settings/actions';
import { orderFormAddItemT } from './newOrder/actions';

export type appActionsT =
 | orderFormAddItemT
 | viewActionsT
 | customersActionsT
 | authActionsT
 | settingsActionsT;
