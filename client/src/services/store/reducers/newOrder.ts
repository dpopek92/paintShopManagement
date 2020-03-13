import { NewOrderT } from '../types/newOrder/NewOrder';
import { newOrderActionsT } from '../types/newOrder/actions';

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
 action: newOrderActionsT,
): NewOrderT => {
 switch (action.type) {
  default:
   return state;
 }
};

export { newOrderReducer };
