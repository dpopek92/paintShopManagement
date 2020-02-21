import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { PageHeader, Input, Tabs, notification } from 'antd';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import FlexTemplate from 'templates/FlexTemplate';
import RAL from 'assets/data/ColorsRal.json';
import NCS from 'assets/data/ColorsNcs.json';
import mordantBrown from 'assets/data/mordantBrown.json';
import mordantYellow from 'assets/data/mordantYellow.json';
import mordantWhite from 'assets/data/mordantWhite.json';
import mordantGreen from 'assets/data/mordantGreen.json';
import { addColor } from 'actions/newOrder';
import { setComponentInModal } from 'actions/view';
import ColorCard from './components/ColorCard';
import ImageCard from '../components/ImageCard';
import { validateSearch } from '../utils';

const { Search: CustomMordantInput } = Input;
const { TabPane } = Tabs;

const StyledWrapper = styled.div`
 margin-top: 5px;
 width: 400px;
 @media (max-width: 600px) {
  margin: 5px auto;
  width: 100%;
 }
`;

const openNotification = color => {
 notification.success({
  message: 'Kolory',
  description: `Wybrałeś kolor: ${color.toUpperCase()}`,
 });
};

const Colors = ({ permissionContext }) => {
 const history = useHistory();
 const dispatch = useDispatch();
 const [key, setKey] = useState('RAL');
 const [customMordant, setCustomMordant] = useState('');
 const [search, setSearch] = useState('');
 const [newMordant, setNewMordant] = useState(null);
 const [newColors, setNewColors] = useState(null);

 useEffect(() => {
  const mordant = mordantBrown
   .concat(mordantGreen, mordantWhite, mordantYellow)
   .filter(item => validateSearch(search, item.name));
  const colors = RAL.concat(NCS).filter(item =>
   validateSearch(search, item.name),
  );
  setNewColors(colors);
  setNewMordant(mordant);
 }, [search]);

 const handleCustomMordant = e => setCustomMordant(e.target.value);
 const handleSearch = e => setSearch(e.target.value);
 const handleTab = tab => setKey(tab);

 const handleColor = (name, type) => {
  if (permissionContext !== 'employee') {
   if (type === 'mordant') {
    dispatch(addColor(`bejca ${name}`));
    openNotification(`bejca ${name}`);
   } else {
    dispatch(addColor(name));
    openNotification(name);
   }
   dispatch(setComponentInModal(null));
  }
 };
 const addCustomMordant = () => {
  dispatch(addColor(`bejca ${customMordant}`));
  openNotification(`bejca ${customMordant}`);
  dispatch(setComponentInModal(null));
 };

 return (
  <div>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <PageHeader
       ghost={false}
       onBack={() => history.goBack()}
       title="Kolory"
       extra={[
        <Input
         key="1"
         placeholder="Znajdź kolor/bejcę"
         value={search}
         size="large"
         onChange={handleSearch}
         style={{ width: 300 }}
        />,
       ]}
      />
      {!search ? (
       <Tabs defaultActiveKey={key} size="large" onChange={handleTab}>
        <TabPane tab="RAL" key="RAL">
         <FlexTemplate>
          {key === 'RAL' &&
           RAL.map(color => (
            <ColorCard
             key={color.name}
             colorName={color.name}
             colorValue={color.hexValue}
             onclick={handleColor}
            />
           ))}
         </FlexTemplate>
        </TabPane>
        <TabPane tab="NCS" key="NCS">
         <FlexTemplate>
          {key === 'NCS' &&
           NCS.map(color => (
            <ColorCard
             key={color.name}
             colorName={color.name}
             colorValue={color.hexValue}
             onclick={handleColor}
            />
           ))}
         </FlexTemplate>
        </TabPane>
        <TabPane tab="Bejca" key="MORDANT">
         <>
          {permissionContext !== 'employee' && (
           <StyledWrapper>
            <CustomMordantInput
             value={customMordant}
             onChange={handleCustomMordant}
             placeholder="Inny numer bejcy"
             enterButton="Dodaj"
             size="large"
             onSearch={addCustomMordant}
            />

            <small>
             Pełny wzornik bejc na stronie:{' '}
             <a href="https://www.sopur.com.pl/pl/katalog-kolorow">
              sopur.com.pl
             </a>
             .
            </small>
           </StyledWrapper>
          )}
          <FlexTemplate>
           {key === 'MORDANT' &&
            newMordant.map(mordant => (
             <ImageCard
              key={mordant.name}
              itemName={mordant.name}
              itemImage={mordant.image}
              type="mordant"
              onclick={handleColor}
             />
            ))}
          </FlexTemplate>
         </>
        </TabPane>
       </Tabs>
      ) : (
       <>
        <FlexTemplate>
         {newColors.map(color => (
          <ColorCard
           key={color.name}
           colorName={color.name}
           colorValue={color.hexValue}
           onclick={addColor}
          />
         ))}
        </FlexTemplate>
        <FlexTemplate>
         {' '}
         {newMordant.map(mordant => (
          <ImageCard
           key={mordant.name}
           itemName={mordant.name}
           itemImage={mordant.image}
           type="mordant"
           onclick={addColor}
          />
         ))}
        </FlexTemplate>
       </>
      )}
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
  </div>
 );
};

Colors.propTypes = {};

export default Colors;
