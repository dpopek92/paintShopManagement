/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

import update from 'immutability-helper';
import {
 REMOVE_COLOR,
 REMOVE_GLASSCASE,
 REMOVE_HANDLE1,
 REMOVE_HANDLE2,
 REMOVE_MILLING,
 REMOVE_VENEER,
 ADD_MILLING,
 ADD_GLASSCASE,
 ADD_HANDLE,
 ADD_COLOR,
 ADD_VENEER,
 CLEAR_ORDER,
 ADD_PAINT_TYPE,
 SET_FINISH_DATE,
 HANDLE_ORDER_COMMENTS,
 ADD_ORDER_ITEM,
 HANDLE_NAME,
 HANDLE_ITEM_DATA,
 CALCULATE_ORDER,
 SET_NUMBER,
 REMOVE_ORDER_ITEM,
 SET_PRICE,
 ADD_PAINT_STYLE,
 SET_ITEMS,
 SET_NUMBER_OF_ELEMENTS,
 ADD_IMAGE,
 ADD_USER,
 ADD_TYPE,
 ADD_CUSTOM_MILLING,
 SET_EDITED_ORDER,
 SET_ACTIVE_ORDER,
 REMOVE_IMAGE,
 SET_ORDER_AS_DATA,
 SET_NUT,
 SET_FELC,
 SET_CHAMFERING,
 SET_REASON_OF_COMPLAINT,
 SET_IMPORT_DATA_FILE,
 ADD_IMPORTED_ITEMS,
} from '../actions/types';

const date = new Date();

// STORE
const initialState = {
 // helpers
 activeOrderType: 'New',
 importDataFile: null,
 // Order
 reasonOfComplaint: '',
 isNut: false,
 isFelc: false,
 isChamfering: false,
 customMilling: { path: null, file: null },
 orderType: 'Nowe zamówienie',
 user: '',
 name: '',
 number: '',
 color: '',
 paintType: 'Półmat',
 paintStyle: 'Jednostronne',
 handleSymbol1: null,
 handleSymbol2: null,
 glassCaseSymbol: null,
 millingSymbol: null,
 isFlat: true,
 veneerSymbol: null,
 date,
 finishDate: null,
 comments: '',
 elements: 0,
 surfaceRight: '',
 surfaceLeft: '',
 surfaceCNC: '',
 chamfering: '',
 backMilling: '',
 milledHandle: '',
 milledPartHandle: '',
 hingesHoles: '',
 price: '',
 images: false,
 items: [],
};

export default (state = initialState, action) => {
 switch (action.type) {
  case SET_IMPORT_DATA_FILE: {
   return { ...state, importDataFile: action.file };
  }
  case SET_REASON_OF_COMPLAINT: {
   return { ...state, reasonOfComplaint: action.reason };
  }
  case SET_NUT: {
   let { items } = state;
   if (action.isNut === false) {
    items = state.items.map(item => {
     let { w1LEdge, w2LEdge, h1LEdge, h2LEdge } = item;
     if (w1LEdge === 'Nut') w1LEdge = '-';
     if (w2LEdge === 'Nut') w2LEdge = '-';
     if (h1LEdge === 'Nut') h1LEdge = '-';
     if (h2LEdge === 'Nut') h2LEdge = '-';
     return item;
    });
   }
   return {
    ...state,
    isNut: action.isNut,
    items,
   };
  }
  case SET_FELC: {
   let { items } = state;
   if (action.isFelc === false) {
    items = state.items.map(item => {
     let { w1LEdge, w2LEdge, h1LEdge, h2LEdge } = item;
     if (w1LEdge === 'Felc') w1LEdge = '-';
     if (w2LEdge === 'Felc') w2LEdge = '-';
     if (h1LEdge === 'Felc') h1LEdge = '-';
     if (h2LEdge === 'Felc') h2LEdge = '-';
     return item;
    });
   }
   return {
    ...state,
    isFelc: action.isFelc,
    items,
   };
  }
  case SET_CHAMFERING: {
   let { items } = state;
   if (action.isChamfering === false) {
    items = state.items.map(item => {
     let {
      w1LEdge,
      w2LEdge,
      h1LEdge,
      h2LEdge,
      w1PEdge,
      w2PEdge,
      h1PEdge,
      h2PEdge,
     } = item;
     if (w1LEdge === 'Gierunek') w1LEdge = '-';
     if (w2LEdge === 'Gierunek') w2LEdge = '-';
     if (h1LEdge === 'Gierunek') h1LEdge = '-';
     if (h2LEdge === 'Gierunek') h2LEdge = '-';
     if (w1PEdge === 'Gierunek')
      w1PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
     if (w2PEdge === 'Gierunek')
      w2PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
     if (h1PEdge === 'Gierunek')
      h1PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
     if (h2PEdge === 'Gierunek')
      h2PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
     return item;
    });
   }
   return {
    ...state,
    isChamfering: action.isChamfering,
    items,
   };
  }
  case SET_ORDER_AS_DATA: {
   let images = false;
   if (action.customMillingPath) images = true;
   return {
    ...state,
    color: action.color,
    paintType: action.paintType,
    // orderType:action.orderType,
    paintStyle: action.paintStyle,
    handleSymbol1: action.handleSymbol1,
    handleSymbol2: action.handleSymbol2,
    millingSymbol: action.millingSymbol,
    veneerSymbol: action.veneerSymbol,
    glassCaseSymbol: action.glassCaseSymbol,
    customMilling: { ...state.customMilling, path: action.customMillingPath },
    isFlat: action.isFlat,
    images,
   };
  }
  case SET_NUMBER: {
   // set order number, and change path to images in items and customMililng
   let { items, customMilling } = state;

   if (state.images) {
    if (state.user) {
     items = state.items.map(item => {
      if (item.image.path) {
       const arr = item.image.path.split('.');
       const mime = arr[arr.length - 1];
       item.image.path = `/${state.user}/${action.number}/img_${item.id}.${mime}`;
       return item;
      }
      return item;
     });
     if (state.customMilling.path != null) {
      const arr = state.customMilling.path.split('.');
      const mime = arr[arr.length - 1];
      customMilling.path = `/${state.user}/${action.number}/customMilling.${mime}`;
     } else {
      customMilling = state.customMilling;
     }
     return { ...state, items, customMilling, number: action.number };
    }
   } else {
    items = state.items;
    customMilling = state.customMilling;
   }
   return { ...state, number: action.number };
  }
  case SET_ACTIVE_ORDER: {
   return { ...state, activeOrderType: action.activeOrder };
  }
  case SET_EDITED_ORDER: {
   state = action.order;
   return state;
  }
  case SET_FINISH_DATE: {
   //  console.log(action.semigloss);
   //  console.log(action.gloss);
   let term = action.semigloss;
   if (state.millingSymbol) term = action.milling;
   else if (state.veneerSymbol) term = action.veneer;
   else if (state.paintType === 'Połysk') term = action.gloss;

   const newDate = new Date();
   newDate.setDate(newDate.getDate() + term);
   const finishDate = newDate;

   return { ...state, finishDate };
  }
  case SET_NUMBER_OF_ELEMENTS: {
   let elements = 0;
   state.items.forEach(item => {
    elements += parseInt(item.quantity, 10);
   });
   return { ...state, elements };
  }
  // ADD ORDER ELEMENTS
  case ADD_ORDER_ITEM: {
   let edge = '-';
   if (state.veneerSymbol) {
    edge = '-';
   } else if (state.paintType === 'Połysk') {
    edge = 'R2';
   } else if (state.paintType === 'Półmat' || state.paintType === 'Mat') {
    edge = 'R1';
   }
   let itemType;
   if (state.millingSymbol) {
    if (state.millingSymbol === 'CNC') {
     itemType = 'Gładki CNC';
    } else {
     itemType = 'Frez';
    }
   } else {
    itemType = 'Gładki';
   }
   return {
    ...state,
    items: [
     ...state.items,
     {
      id:
       state.items.length <= 0 ? 0 : state.items[state.items.length - 1].id + 1,
      type: itemType,
      paintRight: true,
      paintLeft: state.paintStyle !== 'Jednostronne',
      height: '',
      h1PEdge: edge,
      h2PEdge: edge,
      h1LEdge: '-',
      h2LEdge: '-',
      hLPaintedEdge: false,
      width: '',
      w1PEdge: edge,
      w2PEdge: edge,
      w1LEdge: '-',
      w2LEdge: '-',
      wLPaintedEdge: false,
      surfaceRight: '',
      surfaceLeft: '',
      milledHandle: '',
      thickness: '19',
      quantity: 1,
      comments: '',
      includedToPrice: true,
      image: { path: null, file: null },
     },
    ],
   };
  }
  case ADD_IMPORTED_ITEMS: {
   const newItems = [];
   action.items.forEach((item, index) => {
    if (
     item[4] &&
     item[9] &&
     typeof item[4] === 'number' &&
     typeof item[9] === 'number' &&
     typeof item[15] === 'number'
    ) {
     let edge = '-';
     if (state.veneerSymbol) {
      edge = '-';
     } else if (state.paintType === 'Połysk') {
      edge = 'R2';
     } else if (state.paintType === 'Półmat' || state.paintType === 'Mat') {
      edge = 'R1';
     }
     let itemType;
     if (state.millingSymbol) {
      if (state.millingSymbol === 'CNC') {
       itemType = 'Gładki CNC';
      } else {
       itemType = 'Frez';
      }
     } else {
      itemType = 'Gładki';
     }
     const newItem = {
      id: index,
      type: itemType,
      paintRight: true,
      paintLeft: state.paintStyle !== 'Jednostronne',
      height: item[4],
      h1PEdge: edge,
      h2PEdge: edge,
      h1LEdge: '-',
      h2LEdge: '-',
      hLPaintedEdge: false,
      width: item[9],
      w1PEdge: edge,
      w2PEdge: edge,
      w1LEdge: '-',
      w2LEdge: '-',
      wLPaintedEdge: false,
      surfaceRight: '',
      surfaceLeft: '',
      milledHandle: '',
      thickness: '19',
      quantity: item[15] || 1,
      comments: '',
      includedToPrice: true,
      image: { path: null, file: null },
     };
     newItems.push(newItem);
    }
   });
   return {
    ...state,
    items: newItems,
   };
  }
  case ADD_CUSTOM_MILLING: {
   // add custom milling
   if (state.veneerSymbol !== null) {
    return { ...state };
   }
   const arr = action.file.name.split('.');
   const mime = arr[arr.length - 1];
   // console.log(action.file);
   return update(state, {
    images: { $set: true },
    customMilling: {
     path: {
      $set: `/${action.userID}/${state.number}/customMilling.${mime}`,
     },
     file: { $set: action.file },
    },
    isFlat: { $set: false },
    millingSymbol: { $set: action.name.toUpperCase() },
    veneerSybmol: { $set: null },
   });
  }
  case ADD_TYPE: {
   return { ...state, orderType: action.orderType };
  }
  case ADD_USER: {
   // order as user - add User, change path in images
   let { items } = state;
   const { customMilling } = state;
   if (state.images) {
    items = state.items.map(item => {
     if (item.image.path) {
      const arr = item.image.path.split('.');
      const mime = arr[arr.length - 1];
      item.image.path = `/${action.id}/${state.number}/img_${item.id}.${mime}`;
      return item;
     }
     return item;
    });
    if (state.customMilling.path) {
     const arr = state.customMilling.path.split('.');
     const mime = arr[arr.length - 1];
     customMilling.path = `/${action.id}/${state.number}/customMilling.${mime}`;
    }
    return { ...state, items, customMilling, user: action.id };
   }
   return { ...state, user: action.id };
  }
  case ADD_IMAGE: {
   // add image to element, add comment, change images on true
   if (action.file) {
    const arr = action.file.name.split('.');
    const mime = arr[arr.length - 1];

    const items = state.items.map(item => {
     if (item.id === action.id) {
      item.image = {
       path: `/${action.userID}/${state.number}/img_${action.id}.${mime}`,
       file: action.file,
      };
      item.comments = 'rysunek';
      return item;
     }
     return item;
    });
    return { ...state, items, images: true };
   }
   return { ...state };
  }
  case ADD_GLASSCASE: {
   // add custom milling
   if (state.veneerSymbol && action.name !== 'w4') {
    return { ...state };
   }
   return update(state, {
    isFlat: { $set: false },
    glassCaseSymbol: { $set: action.name.toUpperCase() },
   });
  }
  case ADD_COLOR: {
   return { ...state, color: action.name };
  }
  case ADD_PAINT_TYPE: {
   if (state.items.length > 0) {
    let items;
    if (action.paintType === 'Połysk') {
     items = state.items.map(item => {
      item.h1PEdge = item.h1PEdge === 'R1' ? 'R2' : item.h1PEdge;
      item.h2PEdge = item.h2PEdge === 'R1' ? 'R2' : item.h2PEdge;
      item.w1PEdge = item.w1PEdge === 'R1' ? 'R2' : item.w1PEdge;
      item.w2PEdge = item.w2PEdge === 'R1' ? 'R2' : item.w2PEdge;
      return item;
     });
    } else if (action.paintType === 'Półmat' || action.paintType === 'Mat') {
     items = state.items.map(item => {
      item.h1PEdge = item.h1PEdge === 'R2' ? 'R1' : item.h1PEdge;
      item.h2PEdge = item.h2PEdge === 'R2' ? 'R1' : item.h2PEdge;
      item.w1PEdge = item.w1PEdge === 'R2' ? 'R1' : item.w1PEdge;
      item.w2PEdge = item.w2PEdge === 'R2' ? 'R1' : item.w2PEdge;
      return item;
     });
    }
    return { ...state, paintType: action.paintType, items };
   }
   return { ...state, paintType: action.paintType };
  }
  case ADD_PAINT_STYLE: {
   const { items } = state;
   if (action.paintStyle !== 'Jednostronne') {
    if (items.length === 1) {
     if (!items[0].width && !items[0].height) {
      items[0].paintLeft = true;
     }
    }
   }
   return { ...state, paintStyle: action.paintStyle, items };
  }
  case ADD_MILLING: {
   // add milling, if some elements has images, set images on true
   if (state.veneerSymbol) {
    return { ...state };
   }
   let images = null;
   const itemsImages = state.items.some(item => item.image.path);
   // console.log(itemsImages);
   if (itemsImages) images = true;
   else images = false;

   const items = state.items.map(item => {
    if (action.name === 'CNC') {
     if (item.type === 'Frez') {
      item.type = 'Gładki CNC';
      return item;
     }
     return item;
    }
    if (item.type === 'Gładki CNC') {
     item.type = 'Frez';
     return item;
    }
    return item;
   });
   return {
    ...state,
    customMilling: { path: null, file: null },
    isFlat: false,
    millingSymbol: action.name.toUpperCase(),
    veneerSybmol: null,
    images,
    items,
   };
  }
  case ADD_HANDLE: {
   if (state.veneerSymbol) {
    if (
     action.name === 'uk45' ||
     action.name === 'up45' ||
     action.name === 'p45'
    ) {
     if (state.handleSymbol1) {
      return { ...state, handleSymbol2: action.name.toUpperCase() };
     }
     return { ...state, handleSymbol1: action.name.toUpperCase() };
    }
    return { ...state };
   }
   if (state.handleSymbol1) {
    return { ...state, handleSymbol2: action.name.toUpperCase() };
   }
   return { ...state, handleSymbol1: action.name.toUpperCase() };
  }
  case ADD_VENEER: {
   const handles = ['UP', 'UC', 'UK'];
   const { handleSymbol1, handleSymbol2, millingSymbol } = state;
   if (
    handles.includes(handleSymbol1) ||
    handles.includes(handleSymbol2) ||
    millingSymbol
   ) {
    return { ...state };
   }
   let items = null;
   items = state.items.map(item => {
    item.h1PEdge =
     item.h1PEdge === 'R1' || item.h1PEdge === 'R2' ? '-' : item.h1PEdge;
    item.h2PEdge =
     item.h2PEdge === 'R1' || item.h2PEdge === 'R2' ? '-' : item.h2PEdge;
    item.w1PEdge =
     item.w1PEdge === 'R1' || item.w1PEdge === 'R2' ? '-' : item.w1PEdge;
    item.w2PEdge =
     item.w2PEdge === 'R1' || item.w2PEdge === 'R2' ? '-' : item.w2PEdge;
    return item;
   });
   return {
    ...state,
    veneerSymbol: action.name,
    isFlat: true,
    millingSybmol: null,
    items,
   };
  }
  //  REMOVE ORDER ELEMENTS
  case REMOVE_IMAGE: {
   const { items } = state;
   items[action.id].image = { path: null, file: null };
   items[action.id].comments = items[action.id].comments.replace('rysunek', '');
   let images = null;
   const itemsImages = items.some(item => item.image.path);
   if (itemsImages || state.customMilling.path) images = true;
   else images = false;

   return { ...state, images, items };
  }
  case REMOVE_MILLING: {
   // remove milling, dont change items type, unless its "FREZ", if some of elements has images leave images with true
   const items = state.items.map(item => {
    item.type = item.type === 'Witryna' ? 'Witryna' : 'Gładki';
    return { ...item };
   });
   let images = null;
   let isFlat = false;
   const itemsImages = state.items.some(item => item.image.path);
   //  console.log(itemsImages);
   if (itemsImages) images = true;
   else images = false;
   if (state.glassCaseSymbol) isFlat = false;
   else isFlat = true;
   return {
    ...state,
    customMilling: { path: null, file: null },
    images,
    millingSymbol: '',
    isFlat,
    items,
   };
  }
  case REMOVE_GLASSCASE: {
   const items = state.items.map(item => {
    item.type = item.type === 'Frez' ? 'Frez' : 'Gładki';
    return { ...item };
   });
   let isFlat = false;
   if (state.millingSymbol) isFlat = false;
   else isFlat = true;
   return { ...state, glassCaseSymbol: '', items, isFlat };
  }
  case REMOVE_COLOR: {
   return { ...state, color: '' };
  }
  case REMOVE_HANDLE1: {
   const handle = state.handleSymbol1;
   const items = state.items.map(item => {
    if (item.h1PEdge === handle) {
     item.h1PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    }
    if (item.h2PEdge === handle) {
     item.h2PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    }
    if (item.w1PEdge === handle) {
     item.w1PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    }
    if (item.w2PEdge === handle) {
     item.w2PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    }
    return { ...item };
   });
   return { ...state, handleSymbol1: null, items };
  }
  case REMOVE_HANDLE2: {
   const handle = state.handleSymbol2;

   const items = state.items.map(item => {
    if (item.h1PEdge === handle) {
     item.h1PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    }
    if (item.h2PEdge === handle) {
     item.h2PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    }
    if (item.w1PEdge === handle) {
     item.w1PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    }
    if (item.w2PEdge === handle) {
     item.w2PEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    }
    return { ...item };
   });
   return { ...state, handleSymbol2: null, items };
  }
  case REMOVE_VENEER: {
   return { ...state, veneerSymbol: '' };
  }
  case REMOVE_ORDER_ITEM: {
   let { images } = state;
   if (state.items[action.id].image.path) {
    let isImages = 0;
    state.items.forEach(item => {
     if (item.image.path) {
      isImages += 1;
     }
    });
    if (isImages > 1 || state.customMilling.path) {
     images = true;
    } else {
     images = false;
    }
   }
   const items = state.items
    .slice(0, action.id)
    .concat(state.items.slice(action.id + 1));
   return { ...state, items, images };
  }
  case CLEAR_ORDER: {
   //  console.log("clear");
   return { ...initialState };
  }
  //  HANDLE ORDER DATA
  case HANDLE_NAME: {
   return {
    ...state,
    name: action.name,
   };
  }
  case HANDLE_ORDER_COMMENTS: {
   return { ...state, comments: action.comments };
  }
  case HANDLE_ITEM_DATA: {
   if (action.name === 'hLPaintedEdge') {
    let newh2LEdge = state.items[action.id].h2LEdge;
    if (action.value) {
     newh2LEdge = state.paintType === 'Połysk' ? 'R2' : 'R1';
    } else {
     newh2LEdge = '-';
    }
    return update(state, {
     items: {
      [action.id]: {
       [action.name]: { $set: action.value },
       h2LEdge: { $set: newh2LEdge },
      },
     },
    });
   }
   return update(state, {
    items: {
     [action.id]: {
      [action.name]: { $set: action.value },
     },
    },
   });
  }
  case SET_ITEMS: {
   return update(state, {
    items: { [action.index]: { includedToPrice: { $set: action.value } } },
   });
  }
  /**
  |--------------------------------------------------
  | CALCULATIONS
  |--------------------------------------------------
  */
  case SET_PRICE: {
   return { ...state, price: action.price };
  }
  case CALCULATE_ORDER: {
   let milledHandle = 0;
   let milledPartHandle = 0;
   let AsurfaceRight = 0;
   let hingesHoles = 0;
   let AsurfaceLeft = 0;
   let surfaceCNC = 0;
   let chamfering = 0;
   let backMilling = 0;

   const items = state.items.map((el, i) => {
    console.log(`-----=====ELEMENT ${i + 1}=====-----`);
    // CNC SURFACE
    if (el.type !== 'Gładki') {
     surfaceCNC +=
      parseInt(el.height, 10) *
      parseInt(el.width, 10) *
      parseInt(el.quantity, 10);
    }
    // PAINTED SURFACE
    if (el.paintRight === true && el.paintLeft === false) {
     let surfaceRight = parseInt(el.height, 10) * parseInt(el.width, 10);
     el.surfaceLeft = 0;
     if (el.hLPaintedEdge) {
      surfaceRight += parseInt(el.height, 10) * 100;
     }
     if (el.wLPaintedEdge) {
      surfaceRight += parseInt(el.width, 10) * 100;
     }

     el.surfaceRight = surfaceRight * parseInt(el.quantity, 10);
     AsurfaceRight += el.surfaceRight;
     el.surfaceRight *= 0.000001;
     console.log(
      `${i}: PL = ${el.surfaceRight}, Jednostronne malowanie = ${AsurfaceRight}`,
     );
    } else if (el.paintLeft === true && el.paintRight === true) {
     const surfaceLeft = parseInt(el.height, 10) * parseInt(el.width, 10);
     el.surfaceRight = 0;
     el.surfaceLeft = surfaceLeft * parseInt(el.quantity, 10);
     AsurfaceLeft += el.surfaceLeft;
     el.surfaceLeft *= 0.000001;

     console.log(
      `${i}: PP = ${el.surfaceLeft}, Obustronne malowanie = ${AsurfaceLeft}`,
     );
    } else if (el.paintLeft === true && el.paintRight === false) {
     const surfaceRight = parseInt(el.height, 10) * parseInt(el.width, 10);
     el.surfaceLeft = '';

     el.surfaceRight = surfaceRight * parseInt(el.quantity, 10);
     AsurfaceRight += el.surfaceRight;
     el.surfaceRight *= 0.000001;
     if (!el.comments.includes('TYLKO LEWA')) {
      el.comments += ' TYLKO LEWA';
     }
     console.log(
      `${i}: PL (lewa strona) = ${el.surfaceRight}, Jednostronne malowanie = ${AsurfaceRight}`,
     );
    }

    // CHAMFERING
    if (state.isChamfering) {
     if (el.h1PEdge === 'Gierunek') {
      chamfering += parseInt(el.height, 10) * parseInt(el.quantity, 10);
     }
     if (el.h2PEdge === 'Gierunek') {
      chamfering += parseInt(el.height, 10) * parseInt(el.quantity, 10);
     }
     if (el.h1LEdge === 'Gierunek') {
      chamfering += parseInt(el.height, 10) * parseInt(el.quantity, 10);
     }
     if (el.h2LEdge === 'Gierunek') {
      chamfering += parseInt(el.height, 10) * parseInt(el.quantity, 10);
     }
     if (el.w1PEdge === 'Gierunek') {
      chamfering += parseInt(el.width, 10) * parseInt(el.quantity, 10);
     }
     if (el.w2PEdge === 'Gierunek') {
      chamfering += parseInt(el.width, 10) * parseInt(el.quantity, 10);
     }
     if (el.w1LEdge === 'Gierunek') {
      chamfering += parseInt(el.width, 10) * parseInt(el.quantity, 10);
     }
     if (el.w2LEdge === 'Gierunek') {
      chamfering += parseInt(el.width, 10) * parseInt(el.quantity, 10);
     }
    }

    // BACK MILLING
    if (state.isNut || state.isFelc) {
     const tab = ['Felc', 'Nut'];
     if (tab.includes(el.h1LEdge)) {
      backMilling += parseInt(el.height, 10) * parseInt(el.quantity, 10);
     }
     if (tab.includes(el.h2LEdge)) {
      backMilling += parseInt(el.height, 10) * parseInt(el.quantity, 10);
     }
     if (tab.includes(el.w1LEdge)) {
      backMilling += parseInt(el.width, 10) * parseInt(el.quantity, 10);
     }
     if (tab.includes(el.w2LEdge)) {
      backMilling += parseInt(el.width, 10) * parseInt(el.quantity, 10);
     }
    }

    // MILLED HANDLE
    if (
     el.h1PEdge !== '-' &&
     el.h1PEdge !== 'R1' &&
     el.h1PEdge !== 'R2' &&
     el.h1PEdge !== null
    ) {
     if (el.h1PEdge !== 'UC' && el.h1PEdge !== 'Gierunek') {
      el.milledHandle = parseInt(el.height, 10) * parseInt(el.quantity, 10);
      milledHandle += parseInt(el.milledHandle, 10);
      console.log(
       `${i}: UCHWYT frezowany pozycji = ${el.milledHandle}, Długość frezowanego uchwytu = ${milledHandle}`,
      );
     } else if (el.h1PEdge !== 'Gierunek') {
      milledPartHandle += parseInt(el.quantity, 10);
     }
    }
    if (
     el.h2PEdge !== '-' &&
     el.h2PEdge !== 'R1' &&
     el.h2PEdge !== 'R2' &&
     el.h2PEdge !== null
    ) {
     if (el.h2PEdge !== 'UC' && el.h2PEdge !== 'Gierunek') {
      el.milledHandle = parseInt(el.height, 10) * parseInt(el.quantity, 10);
      milledHandle += parseInt(el.milledHandle, 10);
      console.log(
       `${i}: UCHWYT frezowany pozycji = ${el.milledHandle}, Długość frezowanego uchwytu = ${milledHandle}`,
      );
     } else if (el.h2PEdge !== 'Gierunek') {
      milledPartHandle += parseInt(el.quantity, 10);
     }
    }
    if (
     el.w1PEdge !== '-' &&
     el.w1PEdge !== 'R1' &&
     el.w1PEdge !== 'R2' &&
     el.w1PEdge !== null
    ) {
     if (el.w1PEdge !== 'UC' && el.w1PEdge !== 'Gierunek') {
      el.milledHandle = parseInt(el.width, 10) * parseInt(el.quantity, 10);
      milledHandle += parseInt(el.milledHandle, 10);
      console.log(
       `${i}: UCHWYT frezowany pozycji = ${el.milledHandle}, Długość frezowanego uchwytu = ${milledHandle}`,
      );
     } else if (el.w1PEdge !== 'Gierunek') {
      milledPartHandle += parseInt(el.quantity, 10);
     }
    }
    if (
     el.w2PEdge !== '-' &&
     el.w2PEdge !== 'R1' &&
     el.w2PEdge !== 'R2' &&
     el.w2PEdge !== null
    ) {
     if (el.w2PEdge !== 'UC' && el.w2PEdge !== 'Gierunek') {
      el.milledHandle = parseInt(el.width, 10) * parseInt(el.quantity, 10);
      milledHandle += parseInt(el.milledHandle, 10);
      console.log(
       `${i}: UCHWYT frezowany pozycji = ${el.milledHandle}, Długość frezowanego uchwytu = ${milledHandle}`,
      );
     } else if (el.w2PEdge !== 'Gierunek') {
      milledPartHandle += parseInt(el.quantity, 10);
     }
    }

    // HOLES
    const holesArr = ['-', 'R1', 'R2', 'Nut', 'Felc', 'Gierunek'];
    if (!holesArr.includes(el.h1LEdge)) {
     hingesHoles +=
      parseInt(el.h1LEdge.charAt(0), 10) * parseInt(el.quantity, 10);
     console.log(
      `${i}: OTWORY - H1 = ${el.h1LEdge.charAt(
       0,
      )}, Ilość otworów = ${hingesHoles}`,
     );
    }
    if (!holesArr.includes(el.h2LEdge)) {
     hingesHoles +=
      parseInt(el.h2LEdge.charAt(0), 10) * parseInt(el.quantity, 10);
     console.log(
      `${i}: OTWORY - H2 = ${el.h2LEdge.charAt(
       0,
      )}, Ilość otworów = ${hingesHoles}`,
     );
    }
    if (!holesArr.includes(el.w1LEdge)) {
     hingesHoles +=
      parseInt(el.w1LEdge.charAt(0), 10) * parseInt(el.quantity, 10);
     console.log(
      `${i}: OTWORY - W1 = ${el.w1LEdge.charAt(
       0,
      )}, Ilość otworów = ${hingesHoles}`,
     );
    }
    if (!holesArr.includes(el.w2LEdge)) {
     hingesHoles +=
      parseInt(el.w2LEdge.charAt(0), 10) * parseInt(el.quantity, 10);
     console.log(
      `${i}: OTWORY - W2 = ${el.w2LEdge.charAt(
       0,
      )}, Ilość otworów = ${hingesHoles}`,
     );
    }

    return { ...el };
   });
   AsurfaceRight *= 0.000001;
   AsurfaceLeft *= 0.000001;
   surfaceCNC *= 0.000001;
   milledHandle *= 0.001;
   chamfering *= 0.001;
   backMilling *= 0.001;
   return {
    ...state,
    chamfering,
    backMilling,
    milledHandle,
    milledPartHandle,
    hingesHoles,
    surfaceRight: AsurfaceRight,
    surfaceLeft: AsurfaceLeft,
    surfaceCNC,
    items,
   };
  }

  default:
   return state;
 }
};
