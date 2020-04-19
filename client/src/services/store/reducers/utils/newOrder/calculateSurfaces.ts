import update from 'immutability-helper';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import { OrderItemT } from 'services/store/types/orders/Orders';
import { handleEdges } from './orderItems';

const handlesArr = ['uk', 'up', 'up45', 'uk45', 'p45'];
const hingeHolesArr = [
 '2 otw.',
 '3 otw.',
 '4 otw.',
 '5 otw.',
 '6 otw.',
 '7 otw.',
 '8 otw.',
];
const backMillingArr = ['nut', 'felc'];

export const calculateSurfaces = (state: any) => {
 let { items } = state;

 let orderSurfacePL = 0;
 let orderSurfacePP = 0;
 let orderSurfaceCNC = 0;
 let orderMilledHandle = 0;
 let orderPartHandle = 0;
 let orderHingeHoles = 0;
 let orderChamfering = 0;
 let orderBackMilling = 0;
 let orderElements = 0;

 items = items.map((item: OrderItemT) => {
  const {
   height,
   width,
   paintLeft,
   paintRight,
   hLPaintedEdge,
   wLPaintedEdge,
   quantity,
  } = item;

  // SURFACE
  let itemSurface = height * width * quantity;

  if (hLPaintedEdge) {
   itemSurface += 100 * height;
  }
  if (wLPaintedEdge) {
   itemSurface += 100 * width;
  }
  if (paintRight && !paintLeft) {
   item.surfacePL = itemSurface;
   orderSurfacePL += itemSurface;
  } else if (paintRight && paintLeft) {
   item.surfacePP = itemSurface;
   orderSurfacePP += itemSurface;
  } else if (!paintRight && paintLeft) {
   item.surfacePL = itemSurface;
   item.comments = item.comments.concat(' TYLKO LEWA');
   orderSurfacePL += itemSurface;
  }
  if (item.type === 'frez') {
   orderSurfaceCNC += itemSurface;
  }

  // HANDLE
  let itemMilledHandle = 0;
  handleEdges(true, false, item, (value, edge) => {
   if (handlesArr.includes(value)) {
    if (edge[0] === 'w') itemMilledHandle += width * quantity;
    else if (edge[0] === 'h') itemMilledHandle += height * quantity;
   } else if (value === 'uc') orderPartHandle += quantity;
  });
  item.milledHandle = itemMilledHandle;
  orderMilledHandle += itemMilledHandle;

  // HOLES
  let itemHingeHoles = 0;
  handleEdges(false, true, item, value => {
   if (hingeHolesArr.includes(value))
    itemHingeHoles += parseInt(value[0], 10) * quantity;
  });
  orderHingeHoles += itemHingeHoles;

  // CHAMFERING
  let itemChamfering = 0;
  handleEdges(true, true, item, (value, edge) => {
   if (value === 'gierunek') {
    if (edge[0] === 'w') itemChamfering += width * quantity;
    else if (edge[0] === 'h') itemChamfering += height * quantity;
   }
  });
  orderChamfering += itemChamfering;

  // BACKMILLING
  let itemBackMilling = 0;
  handleEdges(false, true, item, (value, edge) => {
   if (backMillingArr.includes(value)) {
    if (edge[0] === 'w') itemBackMilling += width * quantity;
    else if (edge[0] === 'h') itemBackMilling += height * quantity;
   }
  });
  orderBackMilling += itemBackMilling;

  // ELEMENTS
  orderElements += quantity;

  return item;
 });

 state.surfacePL = orderSurfacePL || undefined;
 state.surfacePP = orderSurfacePP || undefined;
 state.surfaceCNC = orderSurfaceCNC || undefined;
 state.milledHandle = orderMilledHandle || undefined;
 state.milledPartHandle = orderPartHandle || undefined;
 state.hingeHoles = orderHingeHoles || undefined;
 state.chamfering = orderChamfering || undefined;
 state.backMilling = orderBackMilling || undefined;
 state.elements = orderElements;

 return state;
};
