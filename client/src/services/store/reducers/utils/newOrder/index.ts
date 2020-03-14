import update from 'immutability-helper';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import {
 OrderItemTypeT,
 OrderItemRightSideEdgeT,
} from 'services/store/types/orders/Orders';
import { orderItemTemplate } from './const';

// orderItems
export const createOrderItem = (state: NewOrderT) => {
 const { millingSymbol, veneerSymbol, paintType, paintStyle } = state;
 let pEdge = '-' as OrderItemRightSideEdgeT;
 let type = 'gładki' as OrderItemTypeT;
 if (!veneerSymbol) {
  if (paintType === 'połysk') pEdge = 'r2' as const;
  else pEdge = 'r1' as const;
 }
 if (millingSymbol) type = 'frez' as const;
 const item = {
  ...orderItemTemplate,
  type,
  paintStyle,
  w1P: pEdge,
  w2P: pEdge,
  h1P: pEdge,
  h2P: pEdge,
 };

 return item;
};

// orderForm
