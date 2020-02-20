import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import {
 REMOVE_COLOR,
 REMOVE_GLASSCASE,
 REMOVE_HANDLE1,
 REMOVE_HANDLE2,
 REMOVE_MILLING,
 REMOVE_VENEER,
 ADD_MILLING,
 ADD_GLASSCASE,
 ADD_HANDLE,
 ADD_COLOR,
 ADD_VENEER,
 CLEAR_ORDER,
 ADD_PAINT_TYPE,
 SET_FINISH_DATE,
 HANDLE_ORDER_COMMENTS,
 ADD_ORDER_ITEM,
 HANDLE_NAME,
 HANDLE_ITEM_DATA,
 CALCULATE_ORDER,
 SET_NUMBER,
 REMOVE_ORDER_ITEM,
 SET_PRICE,
 ADD_PAINT_STYLE,
 SET_ITEMS,
 SET_NUMBER_OF_ELEMENTS,
 ADD_IMAGE,
 ADD_USER,
 ADD_TYPE,
 ADD_CUSTOM_MILLING,
 SET_EDITED_ORDER,
 SET_ACTIVE_ORDER,
 REMOVE_IMAGE,
 SET_ORDER_AS_DATA,
 SET_NUT,
 SET_FELC,
 SET_REASON_OF_COMPLAINT,
 SET_CHAMFERING,
 SET_IMPORT_DATA_FILE,
 ADD_IMPORTED_ITEMS,
} from './types';

export const setOrderAsData = (
 color,
 paintType,
 paintStyle,
 handleSymbol1,
 handleSymbol2,
 millingSymbol,
 veneerSymbol,
 glassCaseSymbol,
 isFlat,
 customMillingPath = null,
) => dispatch =>
 dispatch({
  type: SET_ORDER_AS_DATA,
  color,
  paintType,
  paintStyle,
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  veneerSymbol,
  glassCaseSymbol,
  isFlat,
  customMillingPath,
 });
export const addImportedItems = items => dispatch =>
 dispatch({ type: ADD_IMPORTED_ITEMS, items });
export const setImportDataFile = file => dispatch =>
 dispatch({ type: SET_IMPORT_DATA_FILE, file });
export const setReasonOfComplaint = reason => dispatch =>
 dispatch({ type: SET_REASON_OF_COMPLAINT, reason });
export const setActiveOrderType = activeOrder => dispatch =>
 dispatch({ type: SET_ACTIVE_ORDER, activeOrder });
export const setEditedOrder = order => dispatch =>
 dispatch({ type: SET_EDITED_ORDER, order });
export const setIsNut = isNut => dispatch => dispatch({ type: SET_NUT, isNut });
export const setIsFelc = isFelc => dispatch =>
 dispatch({ type: SET_FELC, isFelc });
export const setIsChamfering = isChamfering => dispatch =>
 dispatch({ type: SET_CHAMFERING, isChamfering });
export const addType = orderType => dispatch =>
 dispatch({ type: ADD_TYPE, orderType });
export const addUser = id => dispatch => dispatch({ type: ADD_USER, id });
export const removeOrderItem = id => dispatch =>
 dispatch({ type: REMOVE_ORDER_ITEM, id });
export const addImage = (id, file, userID) => dispatch => {
 dispatch({ type: ADD_IMAGE, id, file, userID });
};
export const addCustomMilling = (file, userID, name) => dispatch => {
 dispatch({ type: ADD_CUSTOM_MILLING, file, userID, name });
};
export const setNumber = number => dispatch =>
 dispatch({ type: SET_NUMBER, number });
export const removeColor = () => dispatch => dispatch({ type: REMOVE_COLOR });
export const removeGlassCase = () => dispatch =>
 dispatch({ type: REMOVE_GLASSCASE });
export const removeHandle1 = () => dispatch =>
 dispatch({ type: REMOVE_HANDLE1 });
export const removeHandle2 = () => dispatch =>
 dispatch({ type: REMOVE_HANDLE2 });
export const removeMilling = () => dispatch =>
 dispatch({ type: REMOVE_MILLING });
export const removeImage = id => dispatch =>
 dispatch({ type: REMOVE_IMAGE, id });
export const removeVeneer = () => dispatch => dispatch({ type: REMOVE_VENEER });
export const addMilling = name => dispatch =>
 dispatch({ type: ADD_MILLING, name });
export const addGlassCase = name => dispatch =>
 dispatch({ type: ADD_GLASSCASE, name });
export const addHandle = name => dispatch =>
 dispatch({ type: ADD_HANDLE, name });
export const addColor = name => dispatch => dispatch({ type: ADD_COLOR, name });
export const addPaintType = paintType => dispatch =>
 dispatch({ type: ADD_PAINT_TYPE, paintType });
export const addPaintStyle = paintStyle => dispatch =>
 dispatch({ type: ADD_PAINT_STYLE, paintStyle });
export const addVeneer = name => dispatch =>
 dispatch({ type: ADD_VENEER, name });
export const setFinishDate = (
 gloss = 21,
 semigloss = 14,
 milling = 28,
 veneer = 28,
) => dispatch =>
 dispatch({ type: SET_FINISH_DATE, gloss, semigloss, milling, veneer });
export const handleOrderComments = comments => dispatch =>
 dispatch({
  type: HANDLE_ORDER_COMMENTS,
  comments,
 });
export const addOrderItem = () => dispatch =>
 dispatch({ type: ADD_ORDER_ITEM });
export const clearOrder = () => dispatch => dispatch({ type: CLEAR_ORDER });
export const handleOrderName = name => dispatch =>
 dispatch({ type: HANDLE_NAME, name });
export const handleItemData = (id, name, value) => dispatch =>
 dispatch({ type: HANDLE_ITEM_DATA, id, name, value });
export const calculateOrder = () => dispatch => {
 //  console.log('calculate');
 dispatch({ type: CALCULATE_ORDER });
};
export const setNumberOfElements = () => dispatch =>
 dispatch({ type: SET_NUMBER_OF_ELEMENTS });
export const setPrice = (data, end, error, next) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(data);

  const res = await axios.put('/api/orders/calculate', body, config);
  console.log('setPrice', res.data);
  const { items, price } = res.data;
  dispatch({ type: SET_PRICE, price });
  if (items) {
   items.forEach((item, index) => {
    const value = item.includedToPrice;
    dispatch({ type: SET_ITEMS, value, index });
   });
  }

  end();
  next();
 } catch (err) {
  end();
  error();
  console.log(err);
 }
};
