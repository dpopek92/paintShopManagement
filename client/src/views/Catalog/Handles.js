import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import FlexTemplate from 'templates/FlexTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import DetailsCards from 'components/molecules/catalog/DetailsCard';
import HANDLES from 'assets/data/Handles.json';
import { addHandle } from 'actions/newOrder';
import { setComponentInModal } from 'actions/view';

const Handles = ({}) => {
 const dispatch = useDispatch();
 const veneer = useSelector(state => state.newOrder.veneerSymbol);
 const color = useSelector(state => state.newOrder.color);
 const [handles, setHandles] = useState(HANDLES);

 useEffect(() => {
  if (veneer || color.toLowerCase().includes('bejca')) {
   const newHandles = handles.filter(
    item => item.name !== 'uk' && item.name !== 'up' && item.name !== 'uc',
   );

   console.log(newHandles);
   setHandles(newHandles);
  } else {
   setHandles(HANDLES);
  }
 }, [veneer, color]);

 const handleClick = name => {
  dispatch(addHandle(name));
  dispatch(setComponentInModal(null));
 };
 return (
  <div>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <Heading>Uchwyty</Heading>
      <FlexTemplate>
       {handles.map(item => (
        <DetailsCards
         key={item.name}
         name={item.name}
         image={item.image}
         item={item}
         type="handles"
         onclick={handleClick}
        />
       ))}
      </FlexTemplate>
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
  </div>
 );
};

export default Handles;
