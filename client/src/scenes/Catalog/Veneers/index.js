import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PageHeader, Input, Tabs, notification } from 'antd';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import FlexTemplate from 'templates/FlexTemplate';
import ALPI from 'assets/data/VeneersAlpi.json';
import CALIFORNIA from 'assets/data/VeneersCalifornia.json';
import NATURAL from 'assets/data/VeneersNatural.json';
import { addVeneer } from 'actions/newOrder';
import { setComponentInModal } from 'actions/view';
import { containsOneOf } from 'services/utils/array';
import withContext from 'hoc/withContext';
import ImageCard from '../components/ImageCard';
import { validateSearch } from '../utils';

const { TabPane } = Tabs;
const veneersArr = { ALPI, CALIFORNIA, NATURAL };

const openNotification = (type, veneer) => {
 notification[type]({
  message: 'Forniry',
  description:
   type === 'error'
    ? 'Nie możesz wybrać forniru dla tego zamówienia'
    : `Wybrałeś fornir: ${veneer.toUpperCase()}`,
 });
};

const excludedHandles = ['UK', 'UP', 'UC'];

const Veneers = ({ permissionContext }) => {
 const history = useHistory();
 const dispatch = useDispatch();
 const newOrder = useSelector(state => state.newOrder);
 const [key, setKey] = useState('ALPI');
 const [search, setSearch] = useState('');
 const [newVeneers, setNewVeneers] = useState(null);
 const {
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  glassCaseSymbol,
 } = newOrder;

 useEffect(() => {
  const veneers = ALPI.concat(CALIFORNIA, NATURAL).filter(item =>
   validateSearch(search, item.name),
  );
  setNewVeneers(veneers);
 }, [search]);

 const handleTab = tab => setKey(tab);
 const handleSearch = e => setSearch(e.target.value);
 const handleClick = name => {
  if (
   permissionContext !== 'employee' &&
   !millingSymbol &&
   !containsOneOf(excludedHandles, [handleSymbol1, handleSymbol2]) &&
   ((glassCaseSymbol && glassCaseSymbol === 'W4') || !glassCaseSymbol)
  ) {
   dispatch(addVeneer(name));
   openNotification('success', name);
   dispatch(setComponentInModal(null));
  } else {
   openNotification('error', name);
  }
 };

 return (
  <div>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <PageHeader
       ghost={false}
       onBack={() => history.goBack()}
       title="Forniry"
       extra={[
        <Input
         key="1"
         placeholder="Znajdź fornir"
         value={search}
         size="large"
         onChange={handleSearch}
         style={{ width: 300 }}
        />,
       ]}
      />
      {!search ? (
       <Tabs defaultActiveKey={key} size="large" onChange={handleTab}>
        {Object.keys(veneersArr).map(veneerKey => (
         <TabPane tab={veneerKey} key={veneerKey}>
          <FlexTemplate>
           {key === veneerKey &&
            veneersArr[veneerKey].map(veneer => (
             <ImageCard
              key={veneer.name}
              itemName={veneer.name}
              itemImage={veneer.image}
              type="veneers"
              onclick={handleClick}
             />
            ))}
          </FlexTemplate>
         </TabPane>
        ))}
       </Tabs>
      ) : (
       <FlexTemplate>
        {newVeneers.map(veneer => (
         <ImageCard
          key={veneer.image}
          itemName={veneer.name}
          itemImage={veneer.image}
          type="veneers"
          onclick={handleClick}
         />
        ))}
       </FlexTemplate>
      )}
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
  </div>
 );
};

export default withContext(Veneers);
