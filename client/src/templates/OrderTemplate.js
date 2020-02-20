/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Row from 'templates/FlexRowTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import OrderData from 'components/molecules/order/OrderData';
import OrderItemsList from 'components/molecules/order/ItemsList';
import OrderEmployeeComments from 'components/molecules/order/EmployeeComments';
import Images from 'components/molecules/order/Images';
import Summary from 'components/molecules/order/Summary';
import SurfaceSummary from 'components/molecules/order/SurfaceSummary';
import Legend from 'components/molecules/order/Legend';
import HistoryButtons from 'components/molecules/order/HistoryButtons';
import PaintMakers from 'components/molecules/order/PaintMakers';
import OrderStatus from 'components/molecules/order/OrderStatus';
import FullWidthTemplate from './FullWidthPageTemplate';
import ButtonsRowTemplate from './FlexRowTemplate';

const StyledH3 = styled.h3`
 color: ${({ theme }) => theme.blowGreen};
 letter-spacing: 3px;
 margin-bottom: 10px;
`;
const StyledH5 = styled.h5`
 color: ${({ theme }) => theme.blowInfo};
 letter-spacing: 2px;
 margin-bottom: 10px;
`;

const Col = styled.div`
 width: 49%;
 @media (max-width: 600px) {
  width: 100%;
 }
`;

const OrderTemplate = ({ match, order, history, ...props }) => {
 const { path } = match;

 return (
  <FullWidthTemplate>
   <>
    {!path.includes('summary') && (
     <Row justify="space-between">
      <Heading
       style={{ cursor: 'pointer' }}
       onClick={() => history.push(`/customers/${order.user._id}`)}
      >
       {order.user.company} - {order.user.firstname}
      </Heading>
      <OrderStatus order={order} {...props} />
     </Row>
    )}
    <StyledH3>
     {order.number} {order.name ? ` - ${order.name}` : ''}
    </StyledH3>
    {order.veneerSymbol && <StyledH5>Zamówienie fornirowane</StyledH5>}
    <OrderData order={order} />
    <OrderItemsList items={order.items} />
    <Row justify="space-between">
     <Col>
      <OrderEmployeeComments comments={order.employeesComments} />
      <Images order={order} />
     </Col>
     <Col>
      <Summary order={order} />
      <SurfaceSummary order={order} />
      <Legend />
      <ButtonsRowTemplate justify="flex-start">
       {!path.includes('summary') && (
        <HistoryButtons order={order} {...props} />
       )}
      </ButtonsRowTemplate>
      <PaintMakers order={order} {...props} />
     </Col>
    </Row>
   </>
  </FullWidthTemplate>
 );
};

OrderTemplate.propTypes = {
 order: PropTypes.instanceOf(Object),
 setIsPaintMakers: PropTypes.func,
 setIsChangeHistory: PropTypes.func,
 setIsProductionHistory: PropTypes.func,
};

export default withRouter(OrderTemplate);
