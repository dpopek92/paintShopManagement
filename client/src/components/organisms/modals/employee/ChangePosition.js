import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';
import { Button } from 'react-bootstrap';
import Modal from 'components/molecules/modal/Modal';
import Row from 'templates/FlexRowTemplate';
import { setActivePosition } from 'actions/employee';

const StyledButton = styled(Button)`
 color: black;
 background-color: ${({ theme, position }) => theme.positions[position]};
 border-color: ${({ theme, position }) =>
  position === 'Podkład' ? theme.blowDark : theme.positions[position]};
 &:hover {
  color: black;
  border-color: ${({ theme, position }) =>
   position === 'Podkład' ? theme.blowDark : theme.positions[position]};
  background-color: ${({ theme, position }) =>
   darken(0.2, theme.positions[position])};
 }
`;

const ChangePosition = ({ closeModal }) => {
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);

 // HANDLERS
 const handleClick = position => {
  dispatch(setActivePosition(position));
  closeModal();
 };
 return (
  <Modal closeModal={closeModal} title="Zmiana stanowiska">
   <Row column>
    {user.positions &&
     user.positions.map(item => (
      <StyledButton
       key={item}
       onClick={() => handleClick(item)}
       position={item}
      >
       {item}
      </StyledButton>
     ))}
   </Row>
   <hr />
   <Row justify="flex-end">
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Row>
  </Modal>
 );
};

ChangePosition.propTypes = {
 closeModal: PropTypes.func,
};

export default ChangePosition;
