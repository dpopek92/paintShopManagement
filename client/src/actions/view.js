import {
 SET_COMPONENT_IN_MODAL,
 SET_MODEL_RIGHT_SIDE,
 SET_MODEL_LEFT_SIDE,
 SET_LISTELEMENTS_TO_DISPLAY,
 SET_POSITIONS_TO_DISPLAY,
 SET_DISPLAY_FROM_STORAGE,
 SET_SORT,
 SET_ADMIN_HOME_PAGE_KEY,
 SET_ENDED_ORDERS_DATE,
 SET_ENDED_ORDERS_DATE_FROM,
 SET_ITEM_TO_PREVIEW,
 SET_EMPLOYEE_LIST_FILTER_BY,
 SET_SPINNER
} from "./types";

export const setDisplayFromStorage = (positions, tableElmenets) => dispatch => {
 dispatch({
  type: SET_DISPLAY_FROM_STORAGE,
  positions,
  tableElmenets
 });
};
export const setSpinner = isSpinner => dispatch =>
 dispatch({
  type: SET_SPINNER,
  isSpinner
 });
export const setItemToPreview = item => dispatch =>
 dispatch({
  type: SET_ITEM_TO_PREVIEW,
  item
 });
export const setPositionsToDiplay = (name, value) => dispatch =>
 dispatch({
  type: SET_POSITIONS_TO_DISPLAY,
  name,
  value
 });
export const setEmployeeListFilterby = filterBy => dispatch =>
 dispatch({
  type: SET_EMPLOYEE_LIST_FILTER_BY,
  filterBy
 });
export const setEndedOrdersDateFrom = date => dispatch =>
 dispatch({
  type: SET_ENDED_ORDERS_DATE_FROM,
  date
 });
export const setEndedOrdersDate = date => dispatch =>
 dispatch({
  type: SET_ENDED_ORDERS_DATE,
  date
 });
export const setListElementsToDiplay = (name, value) => dispatch =>
 dispatch({
  type: SET_LISTELEMENTS_TO_DISPLAY,
  name,
  value
 });
export const setComponentInModal = name => dispatch =>
 dispatch({
  type: SET_COMPONENT_IN_MODAL,
  name
 });
export const setAdminHomePageKey = key => dispatch =>
 dispatch({
  type: SET_ADMIN_HOME_PAGE_KEY,
  key
 });
export const setSortList = (list, sortBy) => dispatch =>
 dispatch({
  type: SET_SORT,
  list,
  sortBy
 });
export const setModelRightSide = name => dispatch =>
 dispatch({
  type: SET_MODEL_RIGHT_SIDE,
  name
 });
export const setModelLeftSide = name => dispatch =>
 dispatch({
  type: SET_MODEL_LEFT_SIDE,
  name
 });
