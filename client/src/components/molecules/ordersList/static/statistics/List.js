/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ListRow from './ListRow';

const List = ({ orders, descriptions }) => {
 return (
  <div>
   <Table responsive="lg" striped bordered hover size="sm">
    <thead>
     <tr>
      <th>LP</th>
      <th>Klient</th>
      <th>Nr</th>
      <th>Nazwa</th>
      <th>Kolor</th>
      <th>Matowość</th>
      <th>Elementy</th>
      <th>PL</th>
      <th>PP</th>
      <th>Typ</th>
      <th>Data</th>
      <th>Data realizacji</th>
      <th>Status</th>
      <th style={{ width: 400 }}>Opis</th>
     </tr>
    </thead>
    <tbody>
     {descriptions &&
      descriptions.map((description, index) => {
       let item;

       orders &&
        orders.forEach(order => {
         if (order._id === description.id) item = order;
        });
       return (
        item && (
         <ListRow
          index={index}
          item={item}
          key={description._id}
          description={description}
         />
        )
       );
      })}
    </tbody>
   </Table>
  </div>
 );
};

List.propTypes = {
 orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
 descriptions: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

export default List;
