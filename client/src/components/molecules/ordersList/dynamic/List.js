import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import ListRow from './ListRow';
import Summary from 'components/molecules/ordersList/summary/Summary';
import { getSortMethodForOrders as getSortMethod } from 'utils/sort/getSortMethod';

const StyledTh = styled.th`
 cursor: pointer;
`;

const List = ({ orders, sortBy, setSortOrders, position, view, summary }) => {
 const tableElements = useSelector(state => state.view.tableElements);
 const [sort, setSort] = useState({ sortBy: null });
 const [endedOrders, setEndedOrders] = useState([]);
 const [notEndedOrders, setNotEndedOrders] = useState([]);

 //  SPLIT ORDERS
 useEffect(() => {
  if (orders) {
   let notEndedOrdersVar = orders.filter(
    item => item.productionStatus !== 'Zakończone',
   );

   let endedOrdersVar = orders.filter(
    item => item.productionStatus === 'Zakończone',
   );

   setNotEndedOrders(notEndedOrdersVar);
   setEndedOrders(endedOrdersVar);
  }
 }, [orders]);

 //  SET SORT
 useEffect(() => {
  if (position && sortBy) {
   setSort({ sortBy: getSortMethod(sortBy, position) });
  }
 }, [sortBy, position]);

 //  HANDLERS
 const handleSort = sortValue => {
  if (view !== 'important') {
   return sortBy === `by${sortValue}Desc`
    ? setSortOrders(`by${sortValue}Asc`)
    : setSortOrders(`by${sortValue}Desc`);
  }
 };

 return (
  <div>
   {sort.sortBy && (
    <Table responsive="lg" bordered hover>
     <thead>
      <tr>
       <th>LP</th>
       <StyledTh onClick={() => handleSort('Customer')}>
        Klient {view !== 'important' && <FontAwesomeIcon icon={faSort} />}
       </StyledTh>
       <th>Nr</th>
       {tableElements.name && <th>Nazwa</th>}

       {tableElements.color && (
        <StyledTh onClick={() => handleSort('Color')}>
         Kolor {view !== 'important' && <FontAwesomeIcon icon={faSort} />}
        </StyledTh>
       )}
       {tableElements.paintType && (
        <StyledTh onClick={() => handleSort('PaintType')}>
         Matowość {view !== 'important' && <FontAwesomeIcon icon={faSort} />}
        </StyledTh>
       )}
       {tableElements.elements && (
        <th>
         Elem./ <span style={{ backgroundColor: '#ccf7b3' }}>popr./</span>{' '}
         <span style={{ backgroundColor: '#e7bcba' }}>brak.</span>
        </th>
       )}
       {tableElements.PL && <th>PL</th>}
       {tableElements.PP && <th>PP</th>}
       {tableElements.finishDate && (
        <StyledTh onClick={() => handleSort('FinishDate')}>
         Data realizacji{' '}
         {view !== 'important' && <FontAwesomeIcon icon={faSort} />}
        </StyledTh>
       )}
       {tableElements.type && <th>Typ</th>}
       {tableElements.status && <th>Status</th>}
       {tableElements.lastOperation && <th>Ostatnia operacja</th>}
      </tr>
     </thead>
     <tbody>
      {notEndedOrders.sort(sort.sortBy).map((item, index) => (
       <ListRow
        item={item}
        index={index}
        position={position}
        key={index}
        view={view}
       />
      ))}
      {endedOrders.sort(sort.sortBy).map((item, index) => (
       <ListRow
        item={item}
        index={index}
        position={position}
        key={index}
        view={view}
       />
      ))}
     </tbody>
    </Table>
   )}
   {summary && <Summary orders={orders} />}
  </div>
 );
};

List.propTypes = {
 orders: PropTypes.array,
 sortBy: PropTypes.string,
 setSortOrders: PropTypes.func,
 summary: PropTypes.bool,
};

export default List;
