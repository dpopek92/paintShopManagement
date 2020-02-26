import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { appActions } from './types/appActions';
import { viewReducer } from './reducers/view';
import { customersReducer } from './reducers/customers';
import { authReducer } from './reducers/auth';

const rootReducer = combineReducers({
 view: viewReducer,
 customers: customersReducer,
 auth: authReducer,
});
export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
 rootReducer,
 composeWithDevTools(
  applyMiddleware(thunk as ThunkMiddleware<AppState, appActions>),
 ),
);

export default store;
