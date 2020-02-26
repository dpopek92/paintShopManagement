import { viewActions } from './view/actions';
import { customersActions } from './customers/actions';
import { authActions } from './auth/actions';

export type appActions = viewActions | customersActions | authActions;
