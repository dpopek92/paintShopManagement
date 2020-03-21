import update from 'immutability-helper';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import { OrderItemT } from 'services/store/types/orders/Orders';
import { handleEdges } from './orderItems';

const handles = ['uk', 'up', 'up45', 'uk45', 'p45'];
const hingeHoles = [
 '2 otw.',
 '3 otw.',
 '4 otw.',
 '5 otw.',
 '6 otw.',
 '7 otw.',
 '8 otw.',
];

export const calculateSurfaces = (state: any) => {
 let { items } = state;

 items = items.map((item: OrderItemT) => {
  const {
   height,
   width,
   paintLeft,
   paintRight,
   quantity,
   h1P,
   h1L,
   h2P,
   h2L,
   w1P,
   w1L,
   w2P,
   w2L,
  } = item;

  const itemSurface = height * width * quantity;
  if (paintRight && !paintLeft) item.surfacePL = itemSurface;
  if (paintRight && paintLeft) item.surfacePP = itemSurface;
  if (!paintRight && paintLeft) {
   item.surfacePL = itemSurface;
   item.comments = item.comments.concat(' TYLKO LEWA');
  }

  let itemMilledHandle = 0;
  if (handles.includes(w1P)) itemMilledHandle += width * quantity;
  if (handles.includes(w2P)) itemMilledHandle += width * quantity;
  if (handles.includes(h1P)) itemMilledHandle += height * quantity;
  if (handles.includes(h2P)) itemMilledHandle += height * quantity;
  item.milledHandle = itemMilledHandle;

  let itemHingeHoles = 0;
  handleEdges(false, true, item, value => {
   if (hingeHoles.includes(value))
    itemHingeHoles += parseInt(value[0], 10) * quantity;
  });

  return item;
 });

 const elements = items.reduce(
  (acc: number, item: OrderItemT) => (acc += item.quantity),
  0,
 );
 console.log(items);
 return state;
};
