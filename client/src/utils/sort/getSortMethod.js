import {
 //orders
 sortByNumberDesc,
 sortByNumberAsc,
 sortByDateDesc,
 sortByDateAsc,
 sortByFinishDateDesc,
 sortByFinishDateAsc,
 sortByCustomerDesc,
 sortByCustomerAsc,
 sortByStatusDesc,
 sortByStatusAsc,
 sortByColorAsc,
 sortByColorDesc,
 sortByPaintTypeAsc,
 sortByPaintTypeDesc,
 sortByPickUpDateAsc,
 sortByPickUpDateDesc,
 sortByDeadlineForProduction,
 sortOrdersByDeadlineForEmployees,
 //customers
 sortByOrdersNumberAsc,
 sortByOrdersNumberDesc,
 sortByCompanyAsc,
 sortByCompanyDesc,
} from './sortMethods';

export const getSortMethodForOrders = (sortBy, position = null) => {
 let sortArray = null;
 if (sortBy === 'none') sortArray = (a, b) => a;
 else if (sortBy === 'byColorAsc') sortArray = sortByColorAsc;
 else if (sortBy === 'byColorDesc') sortArray = sortByColorDesc;
 else if (sortBy === 'byPaintTypeAsc') sortArray = sortByPaintTypeAsc;
 else if (sortBy === 'byPaintTypeDesc') sortArray = sortByPaintTypeDesc;
 else if (sortBy === 'byCustomerAsc') sortArray = sortByCustomerAsc;
 else if (sortBy === 'byCustomerDesc') sortArray = sortByCustomerDesc;
 else if (sortBy === 'byNumberAsc') sortArray = sortByNumberAsc;
 else if (sortBy === 'byNumberDesc') sortArray = sortByNumberDesc;
 else if (sortBy === 'byStatusAsc') sortArray = sortByStatusAsc;
 else if (sortBy === 'byStatusDesc') sortArray = sortByStatusDesc;
 else if (sortBy === 'byDateAsc') sortArray = sortByDateAsc;
 else if (sortBy === 'byDateDesc') sortArray = sortByDateDesc;
 else if (sortBy === 'byFinishDateAsc') sortArray = sortByFinishDateAsc;
 else if (sortBy === 'byFinishDateDesc') sortArray = sortByFinishDateDesc;
 else if (sortBy === 'byPickUpDateAsc') sortArray = sortByPickUpDateAsc;
 else if (sortBy === 'byPickUpDateDesc') sortArray = sortByPickUpDateDesc;
 else if (sortBy === 'byDeadlineForProduction' && position)
  sortArray = (a, b, position) => sortByDeadlineForProduction(a, b, position);
 else if (sortBy === 'byDeadlineForEmployees' && position)
  sortArray = (a, b, position) =>
   sortOrdersByDeadlineForEmployees(a, b, position);
 else sortArray = sortByNumberDesc;

 return sortArray;
};
export const getSortMethodForCustomers = sortBy => {
 let sortArray = null;
 if (sortBy === 'byCompanyAsc') sortArray = sortByCompanyAsc;
 else if (sortBy === 'byCompanyDesc') sortArray = sortByCompanyDesc;
 else if (sortBy === 'byOrdersNumberAsc') sortArray = sortByOrdersNumberAsc;
 else if (sortBy === 'byOrdersNumberDesc') sortArray = sortByOrdersNumberDesc;
 else sortArray = sortByCompanyAsc;

 return sortArray;
};
