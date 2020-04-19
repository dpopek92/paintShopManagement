import update from 'immutability-helper';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import {
 HandleT,
 OrderItemT,
 OrderPaintTypeT,
 OrderPaintStyleT,
} from 'services/store/types/orders/Orders';
import { containsOneOf } from 'services/utils/array';
import { handleEdges } from './orderItems';
import { getFileExtension } from 'services/utils/file';

// orderForm
export const removeHandle = (
 state: NewOrderT,
 field: 'handleSymbol1' | 'handleSymbol2',
) => {
 const { items, paintType } = state;
 const itemEdge = paintType === 'połysk' ? 'r2' : 'r1';

 const newItems = (items as OrderItemT[]).map((item: any) => {
  handleEdges(true, false, item, (value, edge) => {
   if (value === state[field]) item[edge] = itemEdge;
  });

  return item;
 });

 return { ...state, [field]: '', items: newItems };
};

export const addHandle = (state: NewOrderT, handle: HandleT) => {
 const { color, veneerSymbol, handleSymbol1 } = state;

 if (veneerSymbol || color.toLowerCase().includes('bejca')) {
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

 if (veneerSymbol || color.toLowerCase().includes('bejca')) return { ...state };

 if (milling === '') {
  const newItems = (items as OrderItemT[]).map((item: any) => {
   if (item.type === 'frez') item.type = 'gładki';
   return item;
  });
  return {
   ...state,
   customMilling: undefined,
   millingSymbol: milling,
   items: newItems,
  };
 }

 return { ...state, millingSymbol: milling };
};

export const addCustomMilling = (state: NewOrderT, file: File) => {
 const { veneerSymbol, color } = state;

 if (veneerSymbol || color.toLowerCase().includes('bejca')) return { ...state };

 const fileName = `wzorfrezowania.${getFileExtension(file.name)}`;
 const customMilling = { file, path: fileName };
 return update(state, {
  customMilling: { $set: customMilling },
  millingSymbol: { $set: 'inny' },
 });
};

export const addGlassCase = (state: NewOrderT, glassCase: string) => {
 const { veneerSymbol, color, items } = state;
 if (veneerSymbol || color.toLowerCase().includes('bejca')) {
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
  handleEdges(true, false, item, (value, edge) => {
   if (edges.includes(value)) item[edge] = '-';
  });
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
  handleEdges(true, false, item, (value, edge) => {
   if (edges.includes(value)) item[edge] = radius;
  });

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
   handleEdges(true, false, item, (value, edge) => {
    if (edges.includes(value)) item[edge] = 'r2';
   });

   return item;
  });
 }

 return { ...state, paintStyle, paintType, items };
};

export const setNut = (state: NewOrderT, isNut: boolean) => {
 let { items } = state;
 if (!isNut) {
  items = (items as OrderItemT[]).map((item: any) => {
   handleEdges(false, true, item, (value, edge) => {
    if (value === 'nut') item[edge] = '-';
   });

   return item;
  });
 }
 return { ...state, isNut, items };
};

export const setFelc = (state: NewOrderT, isFelc: boolean) => {
 let { items } = state;
 if (!isFelc) {
  items = (items as OrderItemT[]).map((item: any) => {
   handleEdges(false, true, item, (value, edge) => {
    if (value === 'felc') item[edge] = '-';
   });

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
   handleEdges(true, false, item, (value, edge) => {
    if (value === 'gierunek') item[edge] = rightEdge;
   });
   handleEdges(false, true, item, (value, edge) => {
    if (value === 'gierunek') item[edge] = '-';
   });

   return item;
  });
 }
 return { ...state, isChamfering, items };
};
