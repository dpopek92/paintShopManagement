import { NewOrderT } from '../types/newOrder/NewOrder';
import {
 orderFormActionsT,
 ORDERFORM_SET_COLOR,
 ORDERFORM_ADD_ITEM,
} from '../types/newOrder/actions';
import { createOrderItem } from './utils/newOrder';
import { orderItemTemplate } from './utils/newOrder/const';

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
  case ORDERFORM_SET_COLOR: {
   return { ...state, color: action.color };
  }

  default:
   return state;
 }
};

export { newOrderReducer };
