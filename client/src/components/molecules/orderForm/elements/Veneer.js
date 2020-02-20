import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import { SmallButton as Button } from 'components/atoms/button/Buttons';
import { setComponentInModal } from 'actions/view';

const handles = ['UK', 'UP', 'UC'];

const StyledWrapper = styled.div`
 text-align: center;
 margin: 5px 5px;
`;

const Veneer = () => {
 const dispatch = useDispatch();
 const order = useSelector(state => state.newOrder);

 const {
  veneerSymbol,
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  glassCaseSymbol,
 } = order;

 const handleClick = () => {
  dispatch(setComponentInModal('veneers'));
 };
 return (
  <StyledWrapper>
   <Heading>Rodzaj forniru</Heading>
   {veneerSymbol && <p>{veneerSymbol}</p>}
   <Button
    onClick={handleClick}
    disabled={
     millingSymbol ||
     handles.includes(handleSymbol1) ||
     handles.includes(handleSymbol2) ||
     (glassCaseSymbol && glassCaseSymbol !== 'W4')
    }
   >
    {veneerSymbol ? 'Zmień' : 'Wybierz'}
   </Button>
  </StyledWrapper>
 );
};

export default Veneer;
