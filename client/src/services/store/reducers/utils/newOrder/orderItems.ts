import update from 'immutability-helper';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import {
 OrderItemTypeT,
 OrderItemRightSideEdgeT,
} from 'services/store/types/orders/Orders';
import { orderItemTemplate } from './const';

export const createOrderItem = (state: NewOrderT) => {
 const { millingSymbol, veneerSymbol, paintType, paintStyle } = state;
 let pEdge = '-' as OrderItemRightSideEdgeT;
 let type = 'gładki' as OrderItemTypeT;
 let paintLeft = false;
 if (!veneerSymbol) {
  if (paintType === 'połysk') pEdge = 'r2' as const;
  else pEdge = 'r1' as const;
 }
 if (millingSymbol) type = 'frez' as const;
 if (paintStyle === 'dwustronne' || paintStyle === 'p. połysk/l. półmat')
  paintLeft = true;
 const item = {
  ...orderItemTemplate,
  type,
  w1P: pEdge,
  w2P: pEdge,
  h1P: pEdge,
  h2P: pEdge,
  paintLeft,
 };

 return item;
};
