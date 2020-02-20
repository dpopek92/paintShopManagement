import arrayMove from 'array-move';
import update from 'immutability-helper';
import {
 GET_TIMETABLE,
 GET_TIMETABLE_ERROR,
 SET_TIMETABLE_POSITIONS,
 SET_TIMETABLE_ACTIVE_DAY,
 UNSET_TIMETABLE_ACTIVE_DAY,
 TIMETABLE_ORDER_REMOVE,
 TIMETABLE_ORDER_MOVE,
 TIMETABLE_ORDER_ADD,
} from '../actions/types';

const initialState = {
 timetables: [],
 activeDay: [],
 positions: {
  Surówka: true,
  Podkład: true,
  Szlifiernia: true,
  Lakiernia: true,
  Polernia: true,
  Pakowanie: true,
  Transport: true,
 },
};

export default (state = initialState, action) => {
 switch (action.type) {
  case TIMETABLE_ORDER_ADD: {
   const newPosition = state.activeDay.find(
    pos => pos.position === action.position,
   );
   const { orders } = newPosition.day;
   if (!orders.find(item => item._id === action.order._id)) {
    orders.push(action.order);
   }
   const newDay = state.activeDay.map(pos => {
    if (pos.position === action.position) {
     pos = newPosition;
    }
    return pos;
   });
   return { ...state, activeDay: newDay };
  }
  case TIMETABLE_ORDER_MOVE: {
   const newPosition = state.activeDay.find(
    pos => pos.position === action.position,
   );
   let { orders } = newPosition.day;
   if (action.way === 'UP') {
    orders = arrayMove(orders, action.index, action.index - 1);
   } else if (action.way === 'DOWN') {
    orders = arrayMove(orders, action.index, action.index + 1);
   }
   newPosition.day.orders = orders;
   const newDay = state.activeDay.map(pos => {
    if (pos.position === action.position) {
     pos = newPosition;
    }
    return pos;
   });
   return { ...state, activeDay: newDay };
  }
  case TIMETABLE_ORDER_REMOVE: {
   const newActiveDay = [];
   state.activeDay.forEach(pos => {
    const obj = { _id: pos._id, position: pos.position, day: pos.day };
    if (pos.position === action.position) {
     const orders = pos.day.orders.filter(
      order => order._id !== action.orderId,
     );
     obj.day.orders = orders;
    }
    newActiveDay.push(obj);
   });
   return { ...state, activeDay: newActiveDay };
  }
  case UNSET_TIMETABLE_ACTIVE_DAY: {
   return { ...state, activeDay: [] };
  }
  case SET_TIMETABLE_ACTIVE_DAY: {
   const newActiveDay = [];
   state.timetables.forEach(pos => {
    const obj = { _id: pos._id, position: pos.position };
    const activeDay = pos.days.find(day => {
     const dayDate = new Date(day.date).getDate();
     const actionDate = new Date(action.date).getDate();
     return dayDate === actionDate && day.day === action.day;
    });
    obj.day = activeDay;
    newActiveDay.push(obj);
   });

   return {
    ...state,
    activeDay: newActiveDay,
   };
  }
  case SET_TIMETABLE_POSITIONS: {
   return {
    ...state,
    positions: { ...state.positions, [action.position]: action.value },
   };
  }
  case GET_TIMETABLE: {
   return { ...state, timetables: action.timetables };
  }
  case GET_TIMETABLE_ERROR: {
   return initialState;
  }
  default:
   return state;
 }
};
