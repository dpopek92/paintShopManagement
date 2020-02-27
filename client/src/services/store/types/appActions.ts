import { viewActions } from './view/actions';
import { customersActions } from './customers/actions';
import { authActions } from './auth/actions';
import { settingsActionsT } from './settings/actions';

export type appActions =
 | viewActions
 | customersActions
 | authActions
 | settingsActionsT;
