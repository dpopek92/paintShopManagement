import {
 ADD_SKIPPED_ORDER,
 REMOVE_SKIPPED_ORDER,
 ADD_PAINTS_ORDER,
 SET_INITIAL_PAINTS_ORDERS,
} from '../actions/types';

const initialState = {
 skippedOrders: [],
 paintsOrders: {},
};

export default (state = initialState, action) => {
 switch (action.type) {
  case ADD_SKIPPED_ORDER:
   return {
    ...state,
    skippedOrders: state.skippedOrders.concat(action.order),
   };
  case REMOVE_SKIPPED_ORDER: {
   const newSkippedOrders = state.skippedOrders.filter(
    item => item !== action.order,
   );
   return {
    ...state,
    skippedOrders: newSkippedOrders,
   };
  }
  case ADD_PAINTS_ORDER: {
   return {
    ...state,
    paintsOrders: {
     ...state.paintsOrders,
     [action.id]: action.value,
    },
   };
  }
  case SET_INITIAL_PAINTS_ORDERS: {
   return {
    ...state,
    paintsOrders: action.paintsOrders,
   };
  }

  default:
   return state;
 }
};
