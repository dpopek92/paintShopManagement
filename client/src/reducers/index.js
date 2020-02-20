import { combineReducers } from 'redux';
import auth from './auth';
import newOrder from './newOrder';
import view from './view';
import orders from './orders';
import customers from './customers';
import prices from './prices';
import production from './production';
import settings from './settings';
import employees from './employees';
import employee from './employee';
import stats from './stats';
import search from './search';
import messages from './messages';
import paintsOrder from './paintsOrder';
import timetable from './timetable';

export default combineReducers({
 auth,
 newOrder,
 view,
 orders,
 customers,
 prices,
 production,
 settings,
 employees,
 stats,
 employee,
 search,
 messages,
 paintsOrder,
 timetable,
});
