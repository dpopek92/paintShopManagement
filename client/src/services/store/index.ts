import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { appActionsT } from './types/appActions';
import { viewReducer } from './reducers/view';
import { customersReducer } from './reducers/customers';
import { authReducer } from './reducers/auth';
import { settingsReducer } from './reducers/settings';
import { newOrderReducer } from './reducers/newOrder';

const rootReducer = combineReducers({
 view: viewReducer,
 customers: customersReducer,
 auth: authReducer,
 settings: settingsReducer,
 newOrder: newOrderReducer,
});
export type AppStateT = ReturnType<typeof rootReducer>;

const store = createStore(
 rootReducer,
 composeWithDevTools(
  applyMiddleware(thunk as ThunkMiddleware<AppStateT, appActionsT>),
 ),
);

export default store;
