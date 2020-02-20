import {
 SET_COMPONENT_IN_MODAL,
 SET_MODEL_LEFT_SIDE,
 SET_MODEL_RIGHT_SIDE,
 SET_POSITIONS_TO_DISPLAY,
 SET_LISTELEMENTS_TO_DISPLAY,
 SET_DISPLAY_FROM_STORAGE,
 SET_SORT,
 SET_ADMIN_HOME_PAGE_KEY,
 SET_ENDED_ORDERS_DATE,
 SET_ENDED_ORDERS_DATE_FROM,
 SET_ITEM_TO_PREVIEW,
 SET_EMPLOYEE_LIST_FILTER_BY,
 SET_SPINNER,
} from '../actions/types';

const today = new Date();
today.setDate(today.getDate() - 28);
const newDate = today.toISOString().substr(0, 10);
// STORE WITH: TOKEN, USER INFO, USER ORDERS
const initialState = {
 itemPreview: null,
 positions: {
  Surówka: false,
  Podkład: false,
  Szlifiernia: true,
  Lakiernia: true,
  Polernia: false,
  Pakowanie: true,
 },

 employeListFilterBy: '',
 //  new\|/
 isSpinner: false,
 modelLeftSide: '',
 modelRightSide: '',
 adminHomePageKey: 'New',
 endedOrdersDate: newDate,
 endedOrdersDateFrom: new Date().toISOString().substr(0, 10),
 sortList: {
  newOrders: 'byDateDesc',
  endedOrders: 'byPickUpDateDesc',
  production: 'byStatusDesc',
  inProductionList: 'byStatusDesc',
  customerOrders: 'byDateDesc',
  searchModalOrders: 'byDateDesc',
  customersList: 'byCompanyDesc',
  userOrders: 'byDateDesc',
  employeeOrders: 'byDeadlineForEmployees',
  paintsOrder: 'byStatusDesc',
 },
 catalogComponent: null,
 tableElements: {
  color: true,
  paintType: true,
  name: true,
  elements: true,
  PL: true,
  PP: true,
  type: true,
  finishDate: true,
  status: true,
  lastOperation: true,
 },
};

export default (state = initialState, action) => {
 switch (action.type) {
  case SET_SPINNER: {
   return { ...state, isSpinner: action.isSpinner };
  }
  case SET_EMPLOYEE_LIST_FILTER_BY: {
   return { ...state, employeListFilterBy: action.filterBy };
  }
  case SET_ITEM_TO_PREVIEW: {
   return { ...state, itemPreview: action.item };
  }
  case SET_ENDED_ORDERS_DATE_FROM: {
   return { ...state, endedOrdersDateFrom: action.date };
  }
  case SET_ENDED_ORDERS_DATE: {
   return { ...state, endedOrdersDate: action.date };
  }
  case SET_ADMIN_HOME_PAGE_KEY: {
   return { ...state, adminHomePageKey: action.key };
  }
  case SET_SORT: {
   return {
    ...state,
    sortList: { ...state.sortList, [action.list]: action.sortBy },
   };
  }
  case SET_DISPLAY_FROM_STORAGE: {
   let newPositions;
   if (action.positions) {
    newPositions = action.positions;
   } else {
    newPositions = state.positions;
   }
   return {
    ...state,
    positions: newPositions,
    tableElements: action.tableElmenets,
   };
  }
  case SET_POSITIONS_TO_DISPLAY: {
   return {
    ...state,
    positions: {
     ...state.positions,
     [action.name]: action.value,
    },
   };
  }
  case SET_LISTELEMENTS_TO_DISPLAY: {
   return {
    ...state,
    tableElements: {
     ...state.tableElements,
     [action.name]: action.value,
    },
   };
  }
  case SET_MODEL_LEFT_SIDE:
   return {
    ...state,
    modelLeftSide: action.name,
   };
  case SET_MODEL_RIGHT_SIDE:
   return {
    ...state,
    modelRightSide: action.name,
   };
  case SET_COMPONENT_IN_MODAL:
   return {
    ...state,
    catalogComponent: action.name,
   };

  default:
   return state;
 }
};
