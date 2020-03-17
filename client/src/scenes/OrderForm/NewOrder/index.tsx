import React, { useEffect, useState } from 'react';
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
import { addOrderItem } from 'services/store/actions/newOrder';
import ItemsList from '../components/itemsList';
import CatalogDrawer from '../components/catalogDrawer/indext';
import { setCatalogDrawer } from 'services/store/actions/view';
import { CatalogDrawerTypesT } from 'services/store/types/view/View';

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
`;

interface PropsT {
 permissionContext: string;
}

const NewOrderForm: React.FC<PropsT> = ({ permissionContext }) => {
 const dispatch = useDispatch();
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const author = useSelector((state: AppStateT) => state.auth.user);
 const catalogType = useSelector(
  (state: AppStateT) => state.view.catalogDrawer,
 );
 const { items } = newOrder;

 const [addItems, setAddItems] = useState(1);

 useEffect(() => {
  dispatch(addOrderItem());
 }, []);

 const hadnleCatalog = (type: CatalogDrawerTypesT) =>
  dispatch(setCatalogDrawer(type));
 const handleAddOrderItem = () => {
  for (let i = 0; i < addItems; i++) {
   dispatch(addOrderItem());
  }
 };

 return (
  <WithSidebar sideComponent={<>sidebar</>}>
   <>
    <>
     <PageHeader
      ghost={false}
      title={<Header title="Formularz zamówienia" type="h1" />}
      extra={[
       permissionContext === 'admin' && (
        <Button key="1" type="primary">
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
      <ElementsData newOrder={newOrder} handleCatalog={hadnleCatalog} />
     </StyledCard>
     <StyledCard>
      <InfoData newOrder={newOrder} />
     </StyledCard>
     <StyledRow>
      <Header title="Dane elementów" type="h2" />
      <div>
       <Button>Importuj z pliku</Button>
       <Checkbox>
        Szybkie uzupełnianie <Icon type="question" />
       </Checkbox>
      </div>
     </StyledRow>
     <ItemsList items={items} newOrder={newOrder} />
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
    {/* DRAWER */}
    <CatalogDrawer type={catalogType} onClose={() => hadnleCatalog(null)} />
   </>
  </WithSidebar>
 );
};

export default withContext(NewOrderForm);
