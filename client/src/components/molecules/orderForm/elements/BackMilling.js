import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import { setIsNut, setIsFelc, setIsChamfering } from 'actions/newOrder';

const StyledWrapper = styled.div`
 text-align: center;
 position: relative;
 margin: 5px 5px;
`;

const BackMilling = ({ setIsBackMillingModal }) => {
 const dispatch = useDispatch();
 const newOrder = useSelector(state => state.newOrder);
 const { isChamfering, isNut, isFelc } = newOrder;

 const handleNut = e => {
  dispatch(setIsNut(e.target.checked));
 };
 const handleFelc = e => {
  dispatch(setIsFelc(e.target.checked));
 };
 const handleChamfering = e => {
  dispatch(setIsChamfering(e.target.checked));
 };
 return (
  <StyledWrapper>
   <Heading>Frezowanie pod plecy</Heading>
   <Form.Check
    style={{ marginBottom: 10 }}
    checked={isChamfering}
    type="checkbox"
    label="Gierunek"
    id="gierunek"
    name="gierunek"
    onChange={handleChamfering}
   />
   <Form.Check
    style={{ marginBottom: 10 }}
    checked={isNut}
    type="checkbox"
    label="Nut"
    id="nut"
    name="Nut"
    onChange={handleNut}
   />
   <Form.Check
    style={{ marginBottom: 10 }}
    checked={isFelc}
    type="checkbox"
    label="Felc"
    id="felc"
    name="Felc"
    onChange={handleFelc}
   />
   <FontAwesomeIcon
    icon={faQuestion}
    onClick={() => setIsBackMillingModal(true)}
    style={{
     cursor: 'pointer',
     position: 'absolute',
     bottom: 0,
     right: 0,
     opacity: 0.3,
    }}
   />
  </StyledWrapper>
 );
};

BackMilling.propTypes = {
 setIsBackMillingModal: PropTypes.func,
};

export default BackMilling;
