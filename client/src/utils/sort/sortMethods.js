/* eslint-disable prefer-destructuring */
import { isOrderWetForDynamicList as isOrderWet } from 'utils/orders/';

export const sortMessagesByDate = (a, b) => {
 const dateA = new Date(a.addDate);
 const dateB = new Date(b.addDate);
 return dateB - dateA;
};

// ORDERS
export const sortOrdersByDeadlineForEmployees = (a, b, position) => {
 // sort orders by deadline, but wet orders go to end of list
 if (isOrderWet(a, position)) return 1;
 if (isOrderWet(b, position)) return -1;

 if (a.priority || b.priority) return b.priority - a.priority;

 const dateA = new Date(a.productionFinishDate);

 if (
  position !== 'Polernia' &&
  position !== 'Pakowanie' &&
  a.paintType === 'Połysk'
 ) {
  dateA.setDate(dateA.getDate() - 4);
 }
 const dateB = new Date(b.productionFinishDate);
 if (
  position !== 'Polernia' &&
  position !== 'Pakowanie' &&
  b.paintType === 'Połysk'
 ) {
  dateB.setDate(dateB.getDate() - 4);
 }
 return dateA - dateB;
};
export const sortByDeadlineForProduction = (a, b, position) => {
 // Orders with priority go first, then orders will be sort by realization dates, but if orders is in gloss it should go four days earlier

 if (a.priority || b.priority) {
  return b.priority - a.priority;
 }
 const dateA = new Date(a.productionFinishDate);
 const dateB = new Date(b.productionFinishDate);
 if (position !== 'Polernia' && position !== 'Pakowanie') {
  if (a.paintType === 'Połysk') {
   dateA.setDate(dateA.getDate() - 4);
  }
  if (b.paintType === 'Połysk') {
   dateB.setDate(dateB.getDate() - 4);
  }
 }
 return dateA - dateB;
};
export const sortByNumberDesc = (a, b) => {
 let a1 = null;
 let b1 = null;
 if (a.number.includes('.')) {
  a1 = a.number.split('.')[0];
 } else {
  a1 = a.number;
 }

 if (b.number.includes('.')) {
  b1 = b.number.split('.')[0];
 } else {
  b1 = b.number;
 }
 return b1 - a1;
};
export const sortByNumberAsc = (a, b) => {
 let a1 = null;
 let b1 = null;
 if (a.number.includes('.')) {
  a1 = a.number.split('.')[0];
 } else {
  a1 = a.number;
 }

 if (b.number.includes('.')) {
  b1 = b.number.split('.')[0];
 } else {
  b1 = b.number;
 }
 return a1 - b1;
};
export const sortByOrdersNumberDesc = (a, b) => {
 return b.ordersNumber - a.ordersNumber;
};
export const sortByOrdersNumberAsc = (a, b) => {
 return a.ordersNumber - b.ordersNumber;
};
export const sortByDateDesc = (a, b) => {
 const dateA = new Date(a.date);
 const dateB = new Date(b.date);
 return dateB - dateA;
};
export const sortByDateAsc = (a, b) => {
 const dateA = new Date(a.date);
 const dateB = new Date(b.date);
 return dateA - dateB;
};
export const sortByPickUpDateDesc = (a, b) => {
 const dateA = new Date(a.pickUpDate);
 const dateB = new Date(b.pickUpDate);
 return dateB - dateA;
};
export const sortByPickUpDateAsc = (a, b) => {
 const dateA = new Date(a.pickUpDate);
 const dateB = new Date(b.pickUpDate);
 return dateA - dateB;
};
export const sortByFinishDateDesc = (a, b) => {
 const dateA = new Date(a.productionFinishDate);
 const dateB = new Date(b.productionFinishDate);
 return dateB - dateA;
};
export const sortByFinishDateAsc = (a, b) => {
 const dateA = new Date(a.productionFinishDate);
 const dateB = new Date(b.productionFinishDate);
 return dateA - dateB;
};
export const sortByColorDesc = (a, b) => {
 return `${a.color}`.localeCompare(b.color);
};
export const sortByColorAsc = (a, b) => {
 return `${b.color}`.localeCompare(a.color);
};
export const sortByPaintTypeDesc = (a, b) => {
 return `${a.paintType}`.localeCompare(b.paintType);
};
export const sortByPaintTypeAsc = (a, b) => {
 return `${b.paintType}`.localeCompare(a.paintType);
};
export const sortByStatusDesc = (a, b) => {
 return `${a.productionStatus}`.localeCompare(b.productionStatus);
};
export const sortByStatusAsc = (a, b) => {
 return `${b.productionStatus}`.localeCompare(a.productionStatus);
};
export const sortByCustomerDesc = (a, b) => {
 return `${a.user.company}`.localeCompare(b.user.company);
};
export const sortByCustomerAsc = (a, b) => {
 return `${b.user.company}`.localeCompare(a.user.company);
};
export const sortByCompanyDesc = (a, b) => {
 return a.company.localeCompare(b.company);
};
export const sortByCompanyAsc = (a, b) => {
 return b.company.localeCompare(a.company);
};
