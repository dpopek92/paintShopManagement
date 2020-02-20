const {
 getCustomerOrdersFromMonth,
 getCustomerOrdersFromYear
} = require("../../orders/get");
const { customerSummary } = require("./calculations");

const getCustomerMonthSummary = async (customerId, year, month) => {
 //getOrders
 const orders = await getCustomerOrdersFromMonth(customerId, year, month);
 //calculateValues
 const data = await customerSummary(orders);
 return data;
};

const getCustomerYearSummary = async (customerId, year) => {
 //getOrders
 const orders = await getCustomerOrdersFromYear(customerId, year);
 //calculateValues
 const data = await customerSummary(orders);
 return data;
};

module.exports = { getCustomerMonthSummary, getCustomerYearSummary };
