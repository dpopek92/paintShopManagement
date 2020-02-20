import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import { SmallButton as Button } from 'components/atoms/button/Buttons';
import { setComponentInModal } from 'actions/view';

const StyledWrapper = styled.div`
 text-align: center;
 margin: 5px 5px;
`;

const Millign = () => {
 const dispatch = useDispatch();
 const millingSymbol = useSelector(state => state.newOrder.millingSymbol);
 const color = useSelector(state => state.newOrder.color);
 const veneerSymbol = useSelector(state => state.newOrder.veneerSymbol);

 const handleClick = () => {
  dispatch(setComponentInModal('millings'));
 };
 return (
  <StyledWrapper>
   <Heading>Wzór frontu</Heading>
   {millingSymbol && <p>{millingSymbol}</p>}
   <Button
    onClick={handleClick}
    disabled={color.includes('bejca') || veneerSymbol}
   >
    {millingSymbol ? 'Zmień' : 'Wybierz'}
   </Button>
  </StyledWrapper>
 );
};

export default Millign;
