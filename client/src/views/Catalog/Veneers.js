import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import ImageCards from 'components/organisms/catalog/ImageCards';
import ALPI from 'assets/data/VeneersAlpi.json';
import CALIFORNIA from 'assets/data/VeneersCalifornia.json';
import NATURAL from 'assets/data/VeneersNatural.json';
import { addVeneer } from 'actions/newOrder';
import { setComponentInModal } from 'actions/view';

const StyledWrapper = styled.div`
 margin-top: 5px;
 width: 400px;
 @media (max-width: 600px) {
  margin: 5px auto;
  width: 100%;
 }
`;
const StyledFlex = styled.div`
 display: flex;
 justify-content: space-between;
 @media (max-width: 600px) {
  flex-direction: column;
 }
`;

const Veneers = () => {
 const dispatch = useDispatch();
 const [key, setKey] = useState('ALPI');
 const [search, setSearch] = useState('');
 const [newVeneers, setNewVeneers] = useState(null);

 useEffect(() => {
  let newVeneers = ALPI.concat(CALIFORNIA, NATURAL).filter(
   item =>
    item.name
     .toLowerCase()
     .replace(/[\s-]/g, '')
     .indexOf(search.toLowerCase().replace(/[/\s-]/g, '')) !== -1,
  );
  setNewVeneers(newVeneers);
 }, [search]);

 const handleClick = name => {
  dispatch(addVeneer(name));
  dispatch(setComponentInModal(null));
 };
 const handleSearch = e => {
  setSearch(e.target.value);
 };
 return (
  <div>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <StyledFlex>
       <Heading>Forniry</Heading>
       <StyledWrapper>
        <Form.Control
         type="text"
         value={search}
         onChange={handleSearch}
         placeholder="Wyszukaj"
        />
       </StyledWrapper>
      </StyledFlex>
      {!search ? (
       <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={key => setKey(key)}
       >
        <Tab eventKey={'ALPI'} title={'Alpi'}>
         {key === 'ALPI' && (
          <ImageCards type="veneers" items={ALPI} onclick={handleClick} />
         )}
        </Tab>
        <Tab eventKey={'CALIFORNIA'} title={'California'}>
         {key === 'CALIFORNIA' && (
          <ImageCards type="veneers" items={CALIFORNIA} onclick={handleClick} />
         )}
        </Tab>
        <Tab eventKey={'NATURAL'} title={'Natural'}>
         {key === 'NATURAL' && (
          <ImageCards type="veneers" items={NATURAL} onclick={handleClick} />
         )}
        </Tab>
       </Tabs>
      ) : (
       <ImageCards items={newVeneers} type="veneers" onclick={handleClick} />
      )}
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
  </div>
 );
};

export default Veneers;
