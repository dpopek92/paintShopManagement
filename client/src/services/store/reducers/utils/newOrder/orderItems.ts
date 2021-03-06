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

export const handleInput = (
 state: NewOrderT,
 index: number,
 field: string,
 value: any,
) => {
 const numbers = /^(\s*|\d+)$/;

 if (!value.match(numbers)) return { ...state };
 if (!value) value = 0;
 return update(state, {
  items: { [index]: { [field]: { $set: parseInt(value, 10) } } },
 });
};

export const handleEdges = (
 right: boolean,
 left: boolean,
 item: any,
 callback: (value: string, edge: string) => void,
) => {
 const rightEdges = ['h1P', 'h2P', 'w1P', 'w2P'];
 const leftEdges = ['h1L', 'h2L', 'w1L', 'w2L'];

 if (right)
  rightEdges.forEach((edge: string) => {
   callback(item[edge], edge);
  });

 if (left)
  leftEdges.forEach((edge: string) => {
   callback(item[edge], edge);
  });
};
