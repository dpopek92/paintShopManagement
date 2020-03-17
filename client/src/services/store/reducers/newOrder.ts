import { NewOrderT } from '../types/newOrder/NewOrder';
import {
 orderFormActionsT,
 ORDERFORM_SET_COLOR,
 ORDERFORM_ADD_ITEM,
 ORDERFORM_SET_HANDLE,
 ORDERFORM_SET_MILLING,
 ORDERFORM_SET_GLASSCASE,
 ORDERFORM_SET_VENEER,
 ORDERFORM_SET_PAINTTYPE,
 ORDERFORM_SET_PAINTSTYLE,
 ORDERFORM_SET_NUT,
 ORDERFORM_SET_FELC,
 ORDERFORM_SET_CHAMFERING,
 ORDERFORM_SET_NAME,
 ORDERFORM_SET_COMMENTS,
} from '../types/newOrder/actions';
import {
 addHandle,
 addMilling,
 addGlassCase,
 addVeneer,
 addPaintType,
 addPaintStyle,
 setNut,
 setFelc,
 setChamfering,
} from './utils/newOrder/orderForm';
import { createOrderItem } from './utils/newOrder/orderItems';

const initialState: NewOrderT = {
 // to order
 finishDate: new Date(),
 status: 'wysłane',
 isReadyToPickUp: false,
 isPaid: false,
 isMailToCustomer: 0,
 paintProducer: '',
 baseProducer: '',
 isPaintOrdered: false,
 priority: false,

 // to form
 isNut: false,
 isFelc: false,
 isChamfering: false,
 type: 'nowe',
 date: new Date(),
 user: '',
 author: '',
 number: '',
 color: '',
 paintType: 'półmat',
 paintStyle: 'jednostronne',
 elements: 0,

 price: 0,

 items: [],
};

const newOrderReducer = (
 state = initialState,
 action: orderFormActionsT,
): NewOrderT => {
 switch (action.type) {
  // orderItems
  case ORDERFORM_ADD_ITEM: {
   const item = createOrderItem(state);
   return { ...state, items: [...state.items, item] };
  }

  // orderForm
  case ORDERFORM_SET_COMMENTS: {
   return { ...state, comments: action.comment };
  }
  case ORDERFORM_SET_NAME: {
   return { ...state, name: action.name };
  }
  case ORDERFORM_SET_COLOR: {
   return { ...state, color: action.color };
  }
  case ORDERFORM_SET_HANDLE: {
   return addHandle(state, action.handle);
  }
  case ORDERFORM_SET_MILLING: {
   return addMilling(state, action.milling);
  }
  case ORDERFORM_SET_GLASSCASE: {
   return addGlassCase(state, action.glassCase);
  }
  case ORDERFORM_SET_VENEER: {
   return addVeneer(state, action.veneer);
  }
  case ORDERFORM_SET_PAINTTYPE: {
   return addPaintType(state, action.paintType);
  }
  case ORDERFORM_SET_PAINTSTYLE: {
   return addPaintStyle(state, action.paintStyle);
  }
  case ORDERFORM_SET_NUT: {
   return setNut(state, action.isNut);
  }
  case ORDERFORM_SET_FELC: {
   return setFelc(state, action.isFelc);
  }
  case ORDERFORM_SET_CHAMFERING: {
   return setChamfering(state, action.isChamfering);
  }
  default:
   return state;
 }
};

export { newOrderReducer };
