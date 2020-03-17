import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PageHeader, Input, Tabs, notification } from 'antd';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import FlexTemplate from 'components/templates/flexTemplate';
import ALPI from 'assets/data/VeneersAlpi.json';
import CALIFORNIA from 'assets/data/VeneersCalifornia.json';
import NATURAL from 'assets/data/VeneersNatural.json';
import { containsOneOf } from 'services/utils/array';
import withContext from 'hoc/withContext';
import ImageCard from '../components/ImageCard';
import { validateSearch } from '../utils';
import Header from 'components/header';
import { AppStateT } from 'services/store';
import { setVeneer } from 'services/store/actions/newOrder';
import { setCatalogDrawer } from 'services/store/actions/view';

const { TabPane } = Tabs;
const veneersArr: { [key: string]: veneer[] } = { ALPI, CALIFORNIA, NATURAL };

const openNotification = (type: 'error' | 'success', veneer: string) => {
 notification[type]({
  message: 'Forniry',
  description:
   type === 'error'
    ? 'Nie możesz wybrać forniru dla tego zamówienia'
    : `Wybrałeś fornir: ${veneer.toUpperCase()}`,
 });
};

const excludedHandles = ['uk', 'up', 'uc'];

interface Props {
 permissionContext: string;
}
interface veneer {
 type: string;
 id: string;
 symbol: string;
 distribution: string;
 name: string;
 image: string;
 text: string;
}

const Veneers = ({ permissionContext }: Props) => {
 const history = useHistory();
 const dispatch = useDispatch();
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const {
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  glassCaseSymbol,
 } = newOrder;

 const [key, setKey] = useState<string>('ALPI');
 const [search, setSearch] = useState<string>('');
 const [newVeneers, setNewVeneers] = useState<veneer[] | []>([]);

 useEffect(() => {
  const veneers = ALPI.concat(CALIFORNIA, NATURAL).filter(item =>
   validateSearch(search, item.name),
  );
  setNewVeneers(veneers);
 }, [search]);

 const handleTab = (tab: string) => setKey(tab);
 const handleSearch = (e: { target: HTMLInputElement }) =>
  setSearch(e.target.value);
 const handleClick = (name: string) => {
  if (
   permissionContext !== 'employee' &&
   !millingSymbol &&
   !containsOneOf(excludedHandles, [handleSymbol1, handleSymbol2]) &&
   ((glassCaseSymbol && glassCaseSymbol === 'W4') || !glassCaseSymbol)
  ) {
   dispatch(setVeneer(name));
   openNotification('success', name);
   dispatch(setCatalogDrawer(null));
  } else {
   openNotification('error', name);
   dispatch(setCatalogDrawer(null));
  }
 };

 type ArrayElem<A> = A extends Array<infer Elem> ? Elem : never;

 function elemT<T>(array: T): Array<ArrayElem<T>> {
  return array as any;
 }

 return (
  <div>
   <FullWidthPageTemplate>
    <>
     <PageHeader
      ghost={false}
      title={<Header title="Forniry" type="h1" />}
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
       {elemT(newVeneers).map((veneer: veneer) => (
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
  </div>
 );
};

export default withContext(Veneers);
