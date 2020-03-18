import update from 'immutability-helper';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import {
 HandleT,
 OrderItemT,
 OrderPaintTypeT,
 OrderPaintStyleT,
} from 'services/store/types/orders/Orders';
import { containsOneOf } from 'services/utils/array';

// orderForm
export const removeHandle = (
 state: NewOrderT,
 field: 'handleSymbol1' | 'handleSymbol2',
) => {
 const { items, paintType } = state;
 const edge = paintType === 'połysk' ? 'r2' : 'r1';

 const newItems = (items as OrderItemT[]).map((item: any) => {
  if (item.h1P === state[field]) item.h1P = edge;
  if (item.h2P === state[field]) item.h2P = edge;
  if (item.w1P === state[field]) item.w1P = edge;
  if (item.w2P === state[field]) item.w2P = edge;
  return item;
 });

 return { ...state, [field]: '', items: newItems };
};

export const addHandle = (state: NewOrderT, handle: HandleT) => {
 const { color, veneerSymbol, handleSymbol1 } = state;

 if (veneerSymbol || color.toLocaleLowerCase().includes('bejca')) {
  if (handle === 'uk45' || handle === 'up45' || handle === 'p45') {
   if (handleSymbol1) return { ...state, handleSymbol2: handle };
   return { ...state, handleSymbol1: handle };
  }
  return { ...state };
 }

 if (handleSymbol1) return { ...state, handleSymbol2: handle };
 return { ...state, handleSymbol1: handle };
};

export const addMilling = (state: NewOrderT, milling: string) => {
 const { veneerSymbol, color, items } = state;

 if (veneerSymbol || color.toLocaleLowerCase().includes('bejca'))
  return { ...state };

 if (milling === '') {
  const newItems = (items as OrderItemT[]).map((item: any) => {
   if (item.type === 'frez') item.type = 'gładki';
   return item;
  });
  return { ...state, millingSymbol: milling, items: newItems };
 }

 return { ...state, millingSymbol: milling };
};

export const addGlassCase = (state: NewOrderT, glassCase: string) => {
 const { veneerSymbol, color, items } = state;
 if (veneerSymbol || color.toLocaleLowerCase().includes('bejca')) {
  if (glassCase === 'w4') return { ...state, glassCaseSymbol: glassCase };
  else return { ...state };
 }

 if (glassCase === '') {
  const newItems = (items as OrderItemT[]).map((item: any) => {
   if (item.type === 'witryna') item.type = 'gładki';
   return item;
  });
  return { ...state, glassCaseSymbol: glassCase, items: newItems };
 }

 return { ...state, glassCaseSymbol: glassCase };
};

export const addVeneer = (state: NewOrderT, veneer: string) => {
 const { handleSymbol2, handleSymbol1, millingSymbol, items } = state;
 const excludedHandles = ['up', 'uc', 'uk'];

 if (
  containsOneOf(excludedHandles, [handleSymbol1, handleSymbol2]) ||
  millingSymbol
 )
  return { ...state };

 const newItems = (items as OrderItemT[]).map((item: any) => {
  const edges = ['r1', 'r2'];
  if (edges.includes(item.h1P)) item.h1P = '-';
  if (edges.includes(item.h2P)) item.h2P = '-';
  if (edges.includes(item.w1P)) item.w1P = '-';
  if (edges.includes(item.w2P)) item.w2P = '-';
  return item;
 });

 return { ...state, veneerSymbol: veneer, items: newItems };
};

export const addPaintType = (state: NewOrderT, paintType: OrderPaintTypeT) => {
 let { items, paintStyle } = state;
 const edges = ['r1', 'r2'];
 const radius = paintType === 'połysk' ? 'r2' : 'r1';

 if (paintType !== 'połysk' && paintStyle === 'p. połysk/l. półmat')
  paintStyle = 'dwustronne';

 items = (items as OrderItemT[]).map((item: any) => {
  if (edges.includes(item.h1P)) item.h1P = radius;
  if (edges.includes(item.h2P)) item.h2P = radius;
  if (edges.includes(item.w1P)) item.w1P = radius;
  if (edges.includes(item.w2P)) item.w2P = radius;
  return item;
 });

 return { ...state, paintType, paintStyle, items };
};

export const addPaintStyle = (
 state: NewOrderT,
 paintStyle: OrderPaintStyleT,
) => {
 let { paintType, items } = state;
 const edges = ['r1', 'r2'];

 if (paintStyle === 'p. połysk/l. półmat') {
  paintType = 'połysk';
  items = (items as OrderItemT[]).map((item: any) => {
   if (edges.includes(item.h1P)) item.h1P = 'r2';
   if (edges.includes(item.h2P)) item.h2P = 'r2';
   if (edges.includes(item.w1P)) item.w1P = 'r2';
   if (edges.includes(item.w2P)) item.w2P = 'r2';
   return item;
  });
 }

 return { ...state, paintStyle, paintType, items };
};

export const setNut = (state: NewOrderT, isNut: boolean) => {
 let { items } = state;
 if (!isNut) {
  items = (items as OrderItemT[]).map((item: any) => {
   if (item.h1L === 'nut') item.h1L = '-';
   if (item.h2L === 'nut') item.h2L = '-';
   if (item.w1L === 'nut') item.w1L = '-';
   if (item.w2L === 'nut') item.w2L = '-';

   return item;
  });
 }
 return { ...state, isNut, items };
};

export const setFelc = (state: NewOrderT, isFelc: boolean) => {
 let { items } = state;
 if (!isFelc) {
  items = (items as OrderItemT[]).map((item: any) => {
   if (item.h1L === 'felc') item.h1L = '-';
   if (item.h2L === 'felc') item.h2L = '-';
   if (item.w1L === 'felc') item.w1L = '-';
   if (item.w2L === 'felc') item.w2L = '-';

   return item;
  });
 }
 return { ...state, isFelc, items };
};

export const setChamfering = (state: NewOrderT, isChamfering: boolean) => {
 let { items, paintType } = state;
 const rightEdge = paintType === 'połysk' ? 'r2' : 'r1';
 if (!isChamfering) {
  items = (items as OrderItemT[]).map((item: any) => {
   if (item.h1P === 'gierunek') item.h1P = rightEdge;
   if (item.h2P === 'gierunek') item.h2P = rightEdge;
   if (item.w1P === 'gierunek') item.w1P = rightEdge;
   if (item.w2P === 'gierunek') item.w2P = rightEdge;
   if (item.h1L === 'gierunek') item.h1L = '-';
   if (item.h2L === 'gierunek') item.h2L = '-';
   if (item.w1L === 'gierunek') item.w1L = '-';
   if (item.w2L === 'gierunek') item.w2L = '-';

   return item;
  });
 }
 return { ...state, isChamfering, items };
};
