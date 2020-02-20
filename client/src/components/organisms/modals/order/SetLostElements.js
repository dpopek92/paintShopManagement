import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'components/molecules/modal/Modal';
import Buttons from 'templates/FlexRowTemplate';
import Items from 'components/molecules/itemsList/List';
import Select from 'components/atoms/select/Select';
import withContext from 'hoc/withContext';
import { setSpinner } from 'actions/view';
import { getOrder } from 'actions/orders';
import { positionsArray } from 'const/';
import {
 setLostElements as submitLostElements,
 addOrderStatus,
} from 'utils/apiHandlers/orders/update';

const SetLostElements = ({ closeModal, order, permissionContext }) => {
 const dispatch = useDispatch();
 const activePosition = useSelector(state => state.employee.activePosition);
 // toReq
 const [lostElements, setLostElements] = useState([]);
 const [position, setPosition] = useState('');

 // WHERE ELEMENTS ARE LOST
 useEffect(() => {
  if (permissionContext !== 'admin' && activePosition) {
   setPosition(activePosition);
  }
 }, [activePosition]);

 // HANDLERS
 const handleLostElement = (e, _id, quantity, position) => {
  // check is element in array
  let elementInArray = false;
  lostElements.forEach(item => {
   if (item._id === _id) elementInArray = true;
  });

  // if element is in array, get index
  let index;
  if (elementInArray) {
   index = lostElements.map(item => item._id).indexOf(_id);
  }
  // if target is checkbox
  if (e.target.type === 'checkbox') {
   if (e.target.checked) {
    if (!elementInArray) {
     setLostElements(lostElements.concat({ _id, name: position, quantity }));
    }
   } else if (elementInArray) {
    const newlostElements = lostElements.filter(item => item._id !== _id);
    setLostElements(newlostElements);
   }
   // if target is select
  } else if (e.target.type === 'select-one') {
   if (quantity > 0) {
    if (!elementInArray) {
     setLostElements(
      lostElements.concat({
       _id,
       name: position,
       quantity,
      }),
     );
    } else {
     const newlostElements = lostElements;
     newlostElements[index].quantity = quantity;
     setLostElements(newlostElements);
    }
   } else if (elementInArray) {
    const newlostElements = lostElements.filter(item => item._id !== _id);
    setLostElements(newlostElements);
   }
  }
 };

 const handlePosition = value => {
  if (value) {
   setPosition(value);
  }
 };

 const handleSubmit = async (orderId, elements, position) => {
  dispatch(setSpinner(true));
  const newLostElements = lostElements.map(item => {
   item.name = position;
   return item;
  });
  setLostElements(newLostElements);
  await submitLostElements(order._id, elements, position);
  await addOrderStatus(order._id, position);
  dispatch(
   getOrder(
    orderId,
    () => {
     dispatch(setSpinner(false));
     closeModal();
    },
    // signal.token
   ),
  );
 };

 return (
  <Modal closeModal={closeModal} title="Brakujące elementy" variant="danger">
   <>
    <Items order={order} handleElement={handleLostElement} />
    {permissionContext === 'admin' && (
     <Select
      items={positionsArray}
      value={position}
      handleChange={handlePosition}
     />
    )}
    <hr />
    <Buttons justify="flex-end">
     <Button
      variant="success"
      disabled={lostElements.length === 0 || !position}
      onClick={() => {
       handleSubmit(order._id, lostElements, position);
      }}
     >
      Zgłoś brak
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Anuluj
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

SetLostElements.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.instanceOf(Object),
};

export default withContext(SetLostElements);
