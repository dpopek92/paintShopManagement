import { isObjectEmpty } from "utils/functions/objects";
import { currentDate } from "const/";

export const isDayDisabledForEmployees = item => {
 let orders = 0;
 if (!item || isObjectEmpty(item)) {
  orders += 8;
 } else {
  for (const key in item) {
   if (item.hasOwnProperty(key)) {
    const element = item[key];
    // console.log(element);
    if (
     element.selfMadeOrders &&
     element.selfMadeOrders.length === 0 &&
     element.selfMadeOrders &&
     element.notSelfMadeOrders.length === 0
    ) {
     orders += 1;
    } else if (isObjectEmpty(element)) {
     orders += 1;
    }
   } else {
    orders += 1;
   }
  }
 }
 // console.log(orders);
 return orders >= 6;
};

export const isDayDisabledForProduction = item => {
 let orders = 0;
 if (!item || isObjectEmpty(item)) {
  orders += 8;
 } else {
  for (const key in item) {
   if (item.hasOwnProperty(key)) {
    const element = item[key];
    if (element.orders && element.orders.length === 0) {
     // console.log("orders");
     orders += 1;
    } else if (isObjectEmpty(element)) {
     orders += 1;
    }
   } else {
    orders += 1;
   }
  }
 }
 return orders >= 8;
};

export const getCustomerYears = () => {
 const year = currentDate.getFullYear();
 const i = year - 2019;
 let x = 2019;
 const yearsArr = [];
 for (let index = 0; index <= i; index += 1) {
  yearsArr.push(x);
  x += 1;
 }
 return yearsArr;
};
