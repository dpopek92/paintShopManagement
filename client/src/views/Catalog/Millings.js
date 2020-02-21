import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import FlexTemplate from 'templates/FlexTemplate';
import Row from 'templates/FlexRowTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import DetailsCards from 'components/molecules/catalog/DetailsCard';
import { addMilling, addCustomMilling } from 'actions/newOrder';
import { setComponentInModal } from 'actions/view';
import MILLINGS from 'assets/data/Millings.json';

const StyledInputFile = styled.input`
 width: 0.1px;
 height: 0.1px;
 opacity: 0;
 overflow: hidden;
 position: absolute;
 z-index: -1;
`;
const StyledFileLabel = styled.label`
 color: white;
 background-color: #007bff;
 border: 1px solid #007bff;
 padding: 5px 30px;
 margin: 5px;
 letter-spacing: 1px;
 border-radius: 3px;
 cursor: pointer;
 transition: background-color 200ms ease;
 &:hover {
  background-color: white;
  color: #007bff;
 }
`;

const Millings = () => {
 const dispatch = useDispatch();
 const newOrder = useSelector(state => state.newOrder);
 const userId = useSelector(state => state.auth.user._id);

 const handleClick = name => {
  dispatch(addMilling(name));
  dispatch(setComponentInModal(null));
 };
 return (
  <div>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <Row justify="space-between">
       <Heading>Fronty</Heading>
       <div>
        <Button
         variant="outline-primary"
         title="Elementy gładkie z wyfrezowaniem"
         onClick={() => handleClick('CNC')}
        >
         Gładki CNC
        </Button>
        <StyledInputFile
         disabled={newOrder.veneerSymbol !== null}
         type="file"
         accept="image/*,application/pdf"
         id="file"
         onChange={e => {
          dispatch(addCustomMilling(e.target.files[0], userId, 'Inny'));
          dispatch(setComponentInModal(null));
         }}
        />
        <StyledFileLabel htmlFor="file">
         <FontAwesomeIcon
          icon={faFileUpload}
          style={newOrder.customMilling.file ? { color: 'black' } : null}
         />{' '}
         Dodaj ze zdjęcia
        </StyledFileLabel>
       </div>
      </Row>
      <FlexTemplate>
       {MILLINGS.map(item => (
        <DetailsCards
         key={item.name}
         name={item.name}
         image={item.image}
         item={item}
         type="millings"
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

export default Millings;
