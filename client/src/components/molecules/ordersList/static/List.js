import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import Summary from 'components/molecules/ordersList/summary/Summary';
import { getSortMethodForOrders as getSortMethod } from 'utils/sort/getSortMethod';
import { sortByNumberDesc } from 'utils/sort/sortMethods';
import ListRow from './ListRow';

const StyledTh = styled.th`
 cursor: pointer;
`;

const List = ({
 orders,
 view,
 summary,
 sortBy,
 setSortOrders,
 position,
 ...props
}) => {
 const [sort, setSort] = useState({ sortBy: sortByNumberDesc });

 // SET SORT
 useEffect(() => {
  if (position && view === 'production') {
   setSort({ sortBy: getSortMethod(sortBy, position) });
  } else if (sortBy) {
   setSort({ sortBy: getSortMethod(sortBy) });
  }
 }, [sortBy]);

 // HANDLERS
 const handleSort = sortValue => {
  return sortBy === `by${sortValue}Desc`
   ? setSortOrders(`by${sortValue}Asc`)
   : setSortOrders(`by${sortValue}Desc`);
 };

 return (
  <>
   {sortBy && (
    <Table
     responsive="lg"
     bordered
     striped={
      view !== 'production' &&
      view !== 'generateList' &&
      view !== 'generateCommand'
     }
     hover
     size="sm"
    >
     <thead>
      <tr>
       {(view === 'production' ||
        view === 'generateList' ||
        view === 'generateCommand') && (
        <th style={{ visibility: 'hidden' }}> </th>
       )}

       <th>LP</th>

       <StyledTh onClick={() => handleSort('Customer')}>
        Klient {view !== 'user' && <FontAwesomeIcon icon={faSort} />}
       </StyledTh>

       <StyledTh onClick={() => handleSort('Number')}>
        Nr {<FontAwesomeIcon icon={faSort} />}
       </StyledTh>

       <th>Nazwa</th>
       {view === 'paintsOrder' && <th>Pomiń</th>}
       <StyledTh onClick={() => handleSort('Color')}>
        Kolor {<FontAwesomeIcon icon={faSort} />}
       </StyledTh>

       <StyledTh onClick={() => handleSort('PaintType')}>
        Matowość {<FontAwesomeIcon icon={faSort} />}
       </StyledTh>

       {view !== 'production' || view === 'employee' ? (
        <th>Elementy</th>
       ) : (
        <th>
         Elem./ <span style={{ backgroundColor: '#ccf7b3' }}>popr./</span>{' '}
         <span style={{ backgroundColor: '#e7bcba' }}>brak.</span>
        </th>
       )}

       <th>PL</th>

       <th>PP</th>

       <th>Typ</th>

       {view !== 'paintsOrder' && (
        <StyledTh onClick={() => handleSort('Date')}>
         Data {<FontAwesomeIcon icon={faSort} />}
        </StyledTh>
       )}

       <StyledTh onClick={() => handleSort('FinishDate')}>
        Data realizacji {<FontAwesomeIcon icon={faSort} />}
       </StyledTh>

       {view !== 'ended' && view !== 'new' && (
        <StyledTh onClick={() => handleSort('Status')}>
         Status {<FontAwesomeIcon icon={faSort} />}
        </StyledTh>
       )}

       {(view === 'production' || view === 'generateCommand') && (
        <th>Ostatnia operacja</th>
       )}

       {(view === 'ended' || view === 'customer') && (
        <>
         <StyledTh onClick={() => handleSort('PickUpDate')}>
          Data odbioru {<FontAwesomeIcon icon={faSort} />}
         </StyledTh>
         <th>Status płatności</th>
        </>
       )}

       {view === 'paintsOrder' && (
        <th>
         Ilość <small>[kg]</small>
        </th>
       )}
      </tr>
     </thead>
     <tbody>
      {orders.sort(sort.sortBy).map((item, index) => (
       <ListRow
        key={item._id}
        index={index}
        item={item}
        view={view}
        {...props}
       />
      ))}
     </tbody>
    </Table>
   )}
   {summary && <Summary orders={orders} />}
  </>
 );
};

List.propTypes = {
 orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
 view: PropTypes.oneOf([
  'production',
  'ended',
  'new',
  'generateList',
  'user',
  'customer',
  'search',
  'generateCommand',
  'paintsOrder',
  'inProductionList',
  'addToTimetable',
  'employee',
  'orderProductionPlan',
 ]).isRequired,
 customerId: PropTypes.string,
};

export default List;
