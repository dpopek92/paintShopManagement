import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import {
 Form,
 Popover,
 OverlayTrigger,
 InputGroup,
 FormControl,
 Button,
} from 'react-bootstrap';
import Row from 'templates/FlexRowTemplate';
import ItemsList from './ItemsList';
import { addOrderItem } from 'actions/newOrder';

const StyledHeading = styled.h1`
 text-align: center;
 font-weight: bold;
 letter-spacing: 10px;
 color: ${({ theme }) => theme.blowWarning};
`;
const StyledWrapper = styled.div`
 display: flex;
 justify-content: flex-end;
`;
const StyledInputGroup = styled(InputGroup)`
 width: 250px;
 input {
  text-align: center;
 }
`;
const StyledButton = styled(Button)`
 padding: 5px 40px;
 font-size: 18px;
`;

const popoverToFastWrite = (
 <Popover id="popover-basic">
  <Popover.Title as="h3">Szybkie uzupełnianie</Popover.Title>
  <Popover.Content>
   Jeżeli opcja jest zaznaczona, przycisk TAB zmienia pozycję kursora tylko
   pomiędzy okienkami <strong>wysokości, szerokości i ilości</strong> elementów,
   pomijając inne
  </Popover.Content>
 </Popover>
);

const OrderItems = ({ scrollToBottom, handleSummaryButton, setIsImport }) => {
 const dispatch = useDispatch();
 const [numberOfPositions, setNumberOfPositions] = useState('');
 const [fastWrite, setFastWrite] = useState(false);
 const color = useSelector(state => state.newOrder.color);
 const veneer = useSelector(state => state.newOrder.veneerSymbol);

 const handleNumberOfPositions = e => {
  const numbers = /^(\s*|\d+)$/;
  if (!e.target.value.match(numbers)) return;
  setNumberOfPositions(e.target.value);
 };

 const handleAddPositions = () => {
  if (!numberOfPositions) {
   dispatch(addOrderItem());
   scrollToBottom();
  } else {
   for (let i = 0; i < numberOfPositions; i++) {
    dispatch(addOrderItem());
   }
  }
  setNumberOfPositions('');
 };

 if (!color) {
  return (
   <>
    <Fade bottom>
     <StyledHeading>Musisz wybrać kolor</StyledHeading>
    </Fade>
   </>
  );
 }
 if (color.includes('bejca') && !veneer) {
  return (
   <>
    <Fade bottom>
     <StyledHeading>Musisz wybrać Fornir</StyledHeading>
    </Fade>
   </>
  );
 }
 return (
  <>
   <Fade bottom>
    {/* FAST WRITE CHECKBOX */}
    <Row justify="space-between">
     <Row justify="flex-start">
      <Form.Check
       custom
       type="checkbox"
       onChange={e => setFastWrite(e.target.checked)}
       checked={fastWrite}
       id="fastWriteCheckbox"
       label="Szybkie uzupełnianie"
      />{' '}
      <OverlayTrigger
       trigger="click"
       placement="right"
       overlay={popoverToFastWrite}
      >
       <FontAwesomeIcon
        icon={faQuestion}
        style={{
         opacity: 0.5,
         margin: 3,
         cursor: 'pointer',
        }}
       />
      </OverlayTrigger>
     </Row>
     <div>
      <Button
       variant="outline-primary"
       onClick={() => setIsImport(true)}
       size="sm"
      >
       Importuj wymiary z pliku
      </Button>
     </div>
    </Row>
   </Fade>
   {/* ITEMS LIST */}
   <Fade bottom>
    <ItemsList fastWrite={fastWrite} />
   </Fade>
   {/* ADD ITEMS BUTTON */}
   <Fade bottom>
    <StyledWrapper>
     <StyledInputGroup>
      <FormControl
       placeholder="liczba pozycji"
       value={numberOfPositions}
       onChange={handleNumberOfPositions}
      />
      <InputGroup.Append>
       <Button variant="outline-primary" onClick={handleAddPositions}>
        Dodaj
       </Button>
      </InputGroup.Append>
     </StyledInputGroup>
    </StyledWrapper>
    <StyledButton variant="success" onClick={handleSummaryButton}>
     Dalej
    </StyledButton>
   </Fade>
  </>
 );
};

OrderItems.propTypes = {
 scrollToBottom: PropTypes.func,
 handleSummaryButton: PropTypes.func,
 setIsImport: PropTypes.func,
};

export default OrderItems;
