import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import FlexTemplate from 'templates/FlexTemplate';
import Row from 'templates/FlexRowTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import DetailsCards from 'components/molecules/catalog/DetailsCard';
import GLASSCASES from 'assets/data/GlassCases.json';
import { addGlassCase } from 'actions/newOrder';
import { setComponentInModal } from 'actions/view';
import { Button } from 'react-bootstrap';

const Veneers = ({}) => {
 const dispatch = useDispatch();
 const veneer = useSelector(state => state.newOrder.veneerSymbol);
 const color = useSelector(state => state.newOrder.color);
 const [glassCases, setGlassCases] = useState(GLASSCASES);

 useEffect(() => {
  if (veneer || color.toLowerCase().includes('bejca')) {
   const newGlassCases = glassCases.filter(item => item.name === 'w4');
   setGlassCases(newGlassCases);
  } else {
   setGlassCases(GLASSCASES);
  }
 }, [veneer, color]);

 const handleClick = name => {
  dispatch(addGlassCase(name));
  dispatch(setComponentInModal(null));
 };
 return (
  <div>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <Row justify="space-between">
       <Heading>Witryny</Heading>
       <div>
        <Button onClick={() => handleClick('INNY')}>Inny</Button>
       </div>
      </Row>
      <FlexTemplate>
       {glassCases.map(item => (
        <DetailsCards
         key={item.name}
         name={item.name}
         image={item.image}
         item={item}
         type="glassCases"
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

export default Veneers;
