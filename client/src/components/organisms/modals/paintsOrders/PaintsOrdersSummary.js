import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/molecules/modal/Modal';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import { Button } from 'react-bootstrap';
import SkippedOrders from 'components/molecules/ordersList/paintsOrders/SkippedOrders';
import PaintsOrdersSummaryTable from 'components/molecules/ordersList/paintsOrders/PaintsOrdersSummaryTable';
import { useDispatch } from 'react-redux';
import { setSpinner } from 'actions/view';
import { newOrder } from 'utils/apiHandlers/paints/post';
import { getOrdersToPaintsOrder } from 'actions/orders';

const PaintsOrdersSummary = ({
 closeModal,
 orders,
 paintsOrdersValues,
 paintsOrdersSkipped,
}) => {
 const dispatch = useDispatch();

 // to req
 const [colors, setColors] = useState([]);

 // get appropriate data from props
 useEffect(() => {
  const colors = [];

  Object.keys(paintsOrdersValues).map(id => {
   const value = parseFloat(paintsOrdersValues[id].replace(',', '.'));
   if (value) {
    let colorObj = {};
    const order = orders.find(order => order._id === id);
    if (
     colors.find(
      item => item.color === order.color && item.paintType === order.paintType,
     )
    ) {
     colorObj = colors.find(
      item => item.color === order.color && item.paintType === order.paintType,
     );
     colorObj.quantity += value;
     colorObj.orders = colorObj.orders.concat(order._id);
     colorObj.surfaceRight += order.surfaceRight;
     colorObj.surfaceLeft += order.surfaceLeft;
    } else {
     colorObj = {};
     colorObj.color = order.color;
     colorObj.paintType = order.paintType;
     colorObj.surfaceRight = order.surfaceRight;
     colorObj.surfaceLeft = order.surfaceLeft;
     colorObj.quantity = value;
     colorObj.orders = [order._id];

     colors.push(colorObj);
    }
   }
  });

  setColors(colors);
 }, [paintsOrdersValues]);

 //  HANDLERS
 const handleSubmit = async () => {
  dispatch(setSpinner(true));
  await newOrder(paintsOrdersSkipped, colors, () => {
   setColors([]);
   dispatch(
    getOrdersToPaintsOrder(() => {
     dispatch(setSpinner(false));
     closeModal();
    }),
   );
  });
 };
 const handleRoundUp = () => {
  const newColors = colors.map(item => {
   item.quantity = Math.ceil(item.quantity);
   return item;
  });
  setColors(newColors);
 };

 console.log(colors);
 return (
  <Modal closeModal={closeModal} title="Podsumowanie" size="xl">
   {colors.length > 0 && (
    <>
     <Row justify="space-between">
      <Heading>Lakiery do zamówienia*</Heading>
      <div>
       <Button variant="outline-primary" onClick={handleRoundUp}>
        Zaokrąglij w górę
       </Button>
      </div>
     </Row>
     <PaintsOrdersSummaryTable colors={colors} orders={orders} />
    </>
   )}

   {paintsOrdersSkipped.length > 0 && (
    <>
     <Heading>Zamówienia pominięte*</Heading>
     <SkippedOrders orders={orders} skippedOrders={paintsOrdersSkipped} />
    </>
   )}

   <hr />
   <Row justify="flex-end">
    <Button
     variant="success"
     onClick={handleSubmit}
     disabled={colors.length === 0 && paintsOrdersSkipped.length === 0}
    >
     Zatwierdź
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Row>
   <small>* - wybrane zamówienia nie pojawią się więcej na liście</small>
  </Modal>
 );
};

PaintsOrdersSummary.propTypes = {
 closeModal: PropTypes.func,
 orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
 paintsOrdersSkipped: PropTypes.arrayOf(PropTypes.string),
 paintsOrdersValues: PropTypes.instanceOf(Object),
};

export default PaintsOrdersSummary;
