import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { PageHeader, Input, Tabs, notification } from 'antd';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import FlexTemplate from 'components/templates/flexTemplate';
import RAL from 'assets/data/ColorsRal.json';
import NCS from 'assets/data/ColorsNcs.json';
import mordantBrown from 'assets/data/mordantBrown.json';
import mordantYellow from 'assets/data/mordantYellow.json';
import mordantWhite from 'assets/data/mordantWhite.json';
import mordantGreen from 'assets/data/mordantGreen.json';
// import { addColor } from 'actions/newOrder';
// import { setComponentInModal } from 'actions/view';
import ColorCard from './components/ColorCard';
import ImageCard from '../components/ImageCard';
import { validateSearch } from '../utils';
import Header from 'components/header';
import withContext from 'hoc/withContext';

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

const openNotification = (color: string) => {
 notification.success({
  message: 'Kolory',
  description: `Wybrałeś kolor: ${color.toUpperCase()}`,
 });
};

interface Props {
 permissionContext: string;
}
interface mordant {
 name: string;
 image: string;
}
interface color {
 name: string;
 hexValue: string;
}

const Colors: React.FC<Props> = ({ permissionContext }) => {
 const [key, setKey] = useState<string>('RAL');
 const [customMordant, setCustomMordant] = useState<string>('');
 const [search, setSearch] = useState<string>('');
 const [newMordant, setNewMordant] = useState<mordant[]>([]);
 const [newColors, setNewColors] = useState<color[]>([]);

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

 const handleCustomMordant = (e: { target: HTMLInputElement }) =>
  setCustomMordant(e.target.value);
 const handleSearch = (e: { target: HTMLInputElement }) =>
  setSearch(e.target.value);
 const handleTab = (tab: string) => setKey(tab);

 const handleColor = (name: string, type: string) => {
  if (permissionContext !== 'employee') {
   if (type === 'mordant') {
    // dispatch(addColor(`bejca ${name}`));
    openNotification(`bejca ${name}`);
   } else {
    // dispatch(addColor(name));
    openNotification(name);
   }
   //  dispatch(setComponentInModal(null));
  }
 };
 const addCustomMordant = () => {
  // dispatch(addColor(`bejca ${customMordant}`));
  openNotification(`bejca ${customMordant}`);
  // dispatch(setComponentInModal(null));
 };

 return (
  <div>
   <FullWidthPageTemplate>
    <>
     <PageHeader
      ghost={false}
      title={<Header title="Kolory" />}
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
          // onclick={addColor}
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
          // onclick={addColor}
         />
        ))}
       </FlexTemplate>
      </>
     )}
    </>
   </FullWidthPageTemplate>
  </div>
 );
};

export default withContext(Colors);
