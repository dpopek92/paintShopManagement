import React from 'react';
import PropTypes from 'prop-types';
import { dateToString } from 'utils/functions/date';
import FinishDateCell from 'components/molecules/ordersList/specificCells/FinishDateCell';
import StatusCell from 'components/molecules/ordersList/specificCells/StatusCell';
import { Table, Button } from 'react-bootstrap';
import OrderPlanPosition from './OrderPlanPosition';

const OrderProductionPlanDetails = ({
 order,
 productionPlan,
 addPosition,
 removePosition,
 handleValues,
}) => {
 return (
  <div>
   <Table responsive="lg" bordered striped hover size="sm">
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
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>1</td>
      <td>
       {order.user
        ? `${order.user.company} - ${order.user.firstname[0]}`
        : '??'}
      </td>
      <td>{order.number}</td>
      <td>{order.name}</td>
      <td>{order.color}</td>
      <td>{order.paintType}</td>
      <td>{order.elements}</td>
      <td>{order.surfaceRight ? order.surfaceRight.toFixed(2) : ''}</td>
      <td>{order.surfaceLeft ? order.surfaceLeft.toFixed(2) : ''}</td>
      <td>{order.veneerSymbol ? 'Fornir' : `${!order.isFlat ? 'CNC' : ''}`}</td>
      <td>{dateToString(order.date)}</td>
      <FinishDateCell item={order} view="orderProductionPlan" />
      <StatusCell item={order} view="orderProductionPlan" />
     </tr>
    </tbody>
   </Table>
   <hr />

   {productionPlan.map((item, index) => (
    <OrderPlanPosition
     key={item.date + index}
     item={item}
     index={index}
     removePosition={removePosition}
     handleValues={handleValues}
    />
   ))}
   <Button variant="outline-primary" size="sm" onClick={addPosition}>
    Dodaj
   </Button>
  </div>
 );
};

OrderProductionPlanDetails.propTypes = {};

export default OrderProductionPlanDetails;
