import React from 'react';
import { PageHeader, Button, Card } from 'antd';
import Header from 'components/header';
import WithSidebar from 'components/templates/withSidebar';
import withContext from 'hoc/withContext';
import { useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
import styled from 'styled-components';
import BasicData from '../components/orderData/BasicData';
import ElementsData from '../components/orderData/ElementsData';
import InfoData from '../components/orderData/InfoData';

const StyledCard = styled(Card)`
 width: 100%;
 margin-bottom: 15px;
`;

interface PropsT {
 permissionContext: string;
}

const NewOrderForm: React.FC<PropsT> = ({ permissionContext }) => {
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const author = useSelector((state: AppStateT) => state.auth.user);

 return (
  <WithSidebar sideComponent={<>sidebar</>}>
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
     <ElementsData newOrder={newOrder} />
    </StyledCard>
    <StyledCard>
     <InfoData newOrder={newOrder} />
    </StyledCard>
    <Header title="Dane elementów" type="h2" />
    elementy
   </>
  </WithSidebar>
 );
};

export default withContext(NewOrderForm);
