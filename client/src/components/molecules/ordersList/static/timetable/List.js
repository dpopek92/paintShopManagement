import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ListRow from './ListRow';
import Summary from './Summary';

const List = ({ orders, view, ...props }) => {
 return (
  <>
   {orders.length ? (
    <>
     <Table responsive="lg" bordered striped hover size="sm">
      <thead>
       <tr>
        <th>LP</th>
        <th>Klient</th>
        <th>Nr</th>
        <th>Nazwa</th>
        <th>Kolejność</th>
        <th>Kolor</th>
        <th>Matowość</th>
        <th>Elementy</th>
        <th>PL</th>
        <th>PP</th>
        <th>Typ</th>
        <th>Data</th>
        <th>Data realizacji</th>
        <th>Status</th>
        <th>Usuń</th>
       </tr>
      </thead>
      <tbody>
       {orders.map((item, index) => (
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
     <Summary orders={orders} />
    </>
   ) : (
    <h3>Brak zaplanowanych zamówień</h3>
   )}
  </>
 );
};

List.propTypes = {
 orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default List;
