import React, { useEffect, useState, useRef } from 'react';
import {
 PageHeader,
 Button,
 Card,
 Input,
 InputNumber,
 Checkbox,
 Icon,
} from 'antd';
import Header from 'components/header';
import WithSidebar from 'components/templates/withSidebar';
import withContext from 'hoc/withContext';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateT } from 'services/store';
import styled from 'styled-components';
import BasicData from '../components/orderData/BasicData';
import ElementsData from '../components/orderData/ElementsData';
import InfoData from '../components/orderData/InfoData';
import {
 addOrderItem,
 handleItemField,
 handleItemInput,
 removeOrderItem,
} from 'services/store/actions/newOrder';
import ItemsList from '../components/itemsList';
import CatalogDrawer from '../components/catalogDrawer/indext';
import { setCatalogDrawer } from 'services/store/actions/view';
import { CatalogDrawerTypesT } from 'services/store/types/view/View';
import BackMillingModal from '../components/backMillingModal';
import Sidebar from '../components/sidebar';
import { getGlobalSettings } from 'services/store/actions/settings';

const StyledCard = styled(Card)`
 width: 100%;
 margin-bottom: 15px;
`;
const StyledBottomWrapper = styled.div`
 display: flex;
 justify-content: space-between;
 margin-top: 60px;
 button.submitBtn {
  padding: 10px 30px;
  letter-spacing: 2px;
 }
`;
const StyledRow = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 button {
  margin-right: 20px;
 }
 @media (max-width: 768px) {
  flex-direction: column;
  text-align: center;
  button {
   margin: 0 auto 10px auto;
   display: block;
  }
 }
`;
const StyledInfo = styled.p`
 font-size: 42px;
 letter-spacing: 6px;
 text-align: center;
 color: orange;
`;

interface PropsT {
 permissionContext: string;
}

const NewOrderForm: React.FC<PropsT> = ({ permissionContext }) => {
 const scrollTo = useRef<null | HTMLDivElement>(null);
 const dispatch = useDispatch();
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const author = useSelector((state: AppStateT) => state.auth.user);
 const realizationDates = useSelector(
  (state: AppStateT) => state.settings.realizationDates,
 );
 const catalogType = useSelector(
  (state: AppStateT) => state.view.catalogDrawer,
 );
 const { items, color, veneerSymbol } = newOrder;

 const [addItems, setAddItems] = useState(1);
 const [isMillingModal, setIsMillingModal] = useState(false);
 const [isFastWrite, setIsFastWrite] = useState(false);

 useEffect(() => {
  dispatch(addOrderItem());
  dispatch(getGlobalSettings(() => {}));
 }, []);

 //  HANDLERS
 const scrollToBottom = () => {
  setTimeout(() => {
   if (scrollTo.current)
    scrollTo.current.scrollIntoView({ behavior: 'smooth' });
  }, 200);
 };

 const hadnleCatalog = (type: CatalogDrawerTypesT) =>
  dispatch(setCatalogDrawer(type));

 const handleBackMillingModal = () => setIsMillingModal(true);
 const handleFastWrite = (value: boolean) => setIsFastWrite(value);

 const handleAddOrderItem = () => {
  for (let i = 0; i < addItems; i++) {
   dispatch(addOrderItem());
  }
  scrollToBottom();
 };

 const handleRemoveItem = (index: number) => dispatch(removeOrderItem(index));

 const handleItem = (index: number, field: string, value: any) => {
  if (field === 'width' || field === 'height') {
   dispatch(handleItemInput(index, field, value));
  } else {
   dispatch(handleItemField(index, field, value));
  }
 };

 return (
  <WithSidebar
   sideComponent={
    <>
     <Sidebar />
    </>
   }
  >
   <>
    <>
     <PageHeader
      ghost={false}
      title={<Header title="Formularz zamówienia" type="h1" />}
      extra={[
       permissionContext === 'admin' && (
        <Button key="1" type="primary" disabled>
         Zamów jako
        </Button>
       ),
      ]}
     />
     <Header title="Dane zamówienia" type="h2" />
     <StyledCard>
      <BasicData newOrder={newOrder} author={author} />
     </StyledCard>
     <StyledCard>
      <ElementsData
       newOrder={newOrder}
       handleCatalog={hadnleCatalog}
       handleBackMillingModal={handleBackMillingModal}
      />
     </StyledCard>
     <StyledCard>
      <InfoData newOrder={newOrder} />
     </StyledCard>
     {!color ? (
      <StyledInfo>Wybierz kolor</StyledInfo>
     ) : color.toLowerCase().includes('bejca') && !veneerSymbol ? (
      <StyledInfo>Wybierz fornir</StyledInfo>
     ) : (
      <>
       <StyledRow>
        <Header title="Dane elementów" type="h2" />
        <div>
         <Button>Importuj z pliku</Button>
         <Checkbox
          checked={isFastWrite}
          onChange={e => handleFastWrite(e.target.checked)}
         >
          Szybkie uzupełnianie <Icon type="question" />
         </Checkbox>
        </div>
       </StyledRow>
       <ItemsList
        items={items}
        handleItem={handleItem}
        handleRemoveItem={handleRemoveItem}
        isFastWrite={isFastWrite}
       />
       <StyledBottomWrapper>
        <Button className="submitBtn" type="primary" size="large">
         Wyślij
        </Button>
        <div>
         <InputNumber
          value={addItems}
          onChange={value => value && setAddItems(value)}
         />
         <Button onClick={handleAddOrderItem}>Dodaj</Button>
        </div>
       </StyledBottomWrapper>
      </>
     )}

     <div id="scrollTo" ref={scrollTo} />
    </>
    {/* DRAWER */}
    <CatalogDrawer type={catalogType} onClose={() => hadnleCatalog(null)} />
    {/* MODAL */}
    {
     <BackMillingModal
      isModal={isMillingModal}
      closeModal={() => setIsMillingModal(false)}
     />
    }
   </>
  </WithSidebar>
 );
};

export default withContext(NewOrderForm);
