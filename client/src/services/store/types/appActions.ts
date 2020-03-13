import { viewActionsT } from './view/actions';
import { customersActionsT } from './customers/actions';
import { authActionsT } from './auth/actions';
import { settingsActionsT } from './settings/actions';

export type appActionsT =
 | viewActionsT
 | customersActionsT
 | authActionsT
 | settingsActionsT;
