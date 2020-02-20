/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { Button, Form } from 'react-bootstrap';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import Buttons from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import Items from 'components/molecules/itemsList/List';
import Select from 'components/atoms/select/Select';
import { positionsArray, signal, reasonsOfComplaint } from 'const/';
import { setElementsToCorrect as submitElements } from 'utils/apiHandlers/orders/update';
import { setSpinner } from 'actions/view';
import { getOrder } from 'actions/orders';

import withContext from 'hoc/withContext';

const StyledButton = styled(Button)`
 color: black;
 background-color: ${({ theme, activePosition }) =>
  theme.positions[activePosition]};
 border-color: ${({ theme, activePosition }) =>
  activePosition === 'Podkład'
   ? theme.blowDark
   : theme.positions[activePosition]};
 &:hover,
 &:disabled {
  color: black;
  border-color: ${({ theme, activePosition }) =>
   activePosition === 'Podkład'
    ? theme.blowDark
    : theme.positions[activePosition]};
  background-color: ${({ theme, activePosition }) =>
   darken(0.2, theme.positions[activePosition])};
 }
 &:disabled {
  background-color: ${({ theme, activePosition }) =>
   lighten(0.2, theme.positions[activePosition])};
 }
`;

const SetElementsToCorrect = ({ closeModal, order, permissionContext }) => {
 const dispatch = useDispatch();
 const activePosition = useSelector(state => state.employee.activePosition);

 // toReq
 const [elementsToCorrect, setElementsToCorrect] = useState([]);
 const [complaintReason, setComplaintReason] = useState('');

 // display
 const [title, setTitle] = useState('Elementy do poprawy');
 const [isPositions, setIsPositions] = useState(false);
 const [position, setPosition] = useState('');

 // WHERE ELEMENTS ARE LOST
 useEffect(() => {
  if (permissionContext !== 'admin' && activePosition) {
   setPosition(activePosition);
  }
 }, [activePosition]);

 // HANDLERS
 const handleSubmit = async whereElementsToCorrect => {
  dispatch(setSpinner(true));
  const newElementsToCorrect = elementsToCorrect.map(item => {
   item.name = position;
   return item;
  });
  setElementsToCorrect(newElementsToCorrect);
  await submitElements(
   order._id,
   elementsToCorrect,
   activePosition,
   whereElementsToCorrect,
   complaintReason,
   () => {
    dispatch(
     getOrder(
      order._id,
      () => {
       dispatch(setSpinner(false));
       closeModal();
      },
      signal.token,
     ),
    );
   },
  );
 };

 const handlePosition = value => {
  if (value) {
   setPosition(value);
  }
 };

 const handleNext = () => {
  setIsPositions(true);
  setTitle('Gdzie mają trafić elementy?');
 };

 const handleElementToCorrect = (e, _id, quantity) => {
  // check is element in array
  let elementInArray = false;
  elementsToCorrect.forEach(item => {
   if (item._id === _id) elementInArray = true;
  });

  // if element is in array, get index
  let index;
  if (elementInArray) {
   index = elementsToCorrect.map(item => item._id).indexOf(_id);
  }
  // if target is checkbox
  if (e.target.type === 'checkbox') {
   if (e.target.checked) {
    if (!elementInArray) {
     setElementsToCorrect(
      elementsToCorrect.concat({ _id, name: '', quantity }),
     );
    }
   } else {
    const newElementsToCorrect = elementsToCorrect.filter(
     item => item._id !== _id,
    );
    setElementsToCorrect(newElementsToCorrect);
   }
   // if target is select
  } else if (e.target.type === 'select-one') {
   if (quantity > 0) {
    if (!elementInArray) {
     setElementsToCorrect(
      elementsToCorrect.concat({
       _id,
       name: '',
       quantity,
      }),
     );
    } else {
     const newElementsToCorrect = elementsToCorrect;
     newElementsToCorrect[index].quantity = quantity;
     setElementsToCorrect(newElementsToCorrect);
    }
   } else {
    const newElementsToCorrect = elementsToCorrect.filter(
     item => item._id !== _id,
    );
    setElementsToCorrect(newElementsToCorrect);
   }
  }
 };
 const handleReasonsOfComplaint = e => setComplaintReason(e.target.value);

 //  console.log(elementsToCorrect);
 return (
  <Modal closeModal={closeModal} title={title}>
   {!isPositions ? (
    <>
     <Items order={order} handleElement={handleElementToCorrect} />

     <hr />
     <Buttons justify="flex-end">
      <Button
       disabled={elementsToCorrect.length === 0}
       variant="success"
       onClick={handleNext}
      >
       Dalej
      </Button>
      <Button variant="danger" onClick={closeModal}>
       Anuluj
      </Button>
     </Buttons>
    </>
   ) : (
    <>
     <Heading>Przyczyna</Heading>
     <Form.Control
      as="select"
      onChange={handleReasonsOfComplaint}
      value={complaintReason}
     >
      <option value="" />
      {reasonsOfComplaint.map(item => {
       const { type } = item;
       return (
        <option key={type} value={type}>
         {type}
        </option>
       );
      })}
     </Form.Control>
     <hr />
     {permissionContext === 'admin' ? (
      <>
       <Heading>Stanowisko</Heading>
       <Select
        items={positionsArray}
        value={position}
        handleChange={handlePosition}
       />
       <hr />
       <Buttons justify="flex-end">
        <Button
         variant="success"
         onClick={() => handleSubmit(position)}
         disabled={!position || !complaintReason}
        >
         Zatwierdź
        </Button>
        <Button variant="danger" onClick={closeModal}>
         Anuluj
        </Button>
       </Buttons>
      </>
     ) : (
      <>
       <Buttons column>
        {activePosition !== 'Szlifiernia' && (
         <StyledButton
          activePosition="Szlifiernia"
          disabled={!complaintReason}
          onClick={() => handleSubmit('Szlifiernia')}
         >
          Szlifiernia
         </StyledButton>
        )}
        {(activePosition === 'Lakiernia' ||
         activePosition === 'Szlifiernia') && (
         <StyledButton
          activePosition="Podkład"
          disabled={!complaintReason}
          onClick={() => handleSubmit('Podkład')}
         >
          Podkład
         </StyledButton>
        )}
        {activePosition === 'Polernia' && (
         <StyledButton
          activePosition="Lakiernia"
          disabled={!complaintReason}
          onClick={() => handleSubmit('Lakiernia')}
         >
          Lakiernia
         </StyledButton>
        )}
        {activePosition === 'Pakowanie' && (
         <StyledButton
          activePosition="Polernia"
          onClick={() => handleSubmit('Polernia')}
          disabled={order.paintType !== 'Połysk' || !complaintReason}
         >
          Polernia
         </StyledButton>
        )}
       </Buttons>
      </>
     )}
    </>
   )}
  </Modal>
 );
};

SetElementsToCorrect.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.instanceOf(Object),
};

export default withContext(SetElementsToCorrect);
