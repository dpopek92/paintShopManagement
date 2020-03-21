import React from 'react';
import { CustomerT } from 'services/store/types/customers/Customers';
import { Descriptions, Tag } from 'antd';

interface PropsT {
 data: CustomerT;
}

const CustomerData: React.FC<PropsT> = ({ data }) => {
 return (
  <div>
   <Descriptions
    title={
     <>
      {data.user.company}{' '}
      <Tag color={data.user.isAccepted ? 'green' : 'red'}>
       {data.user.isAccepted ? 'Zaakceptowany' : 'Niezaakceptowany'}
      </Tag>
     </>
    }
    layout="horizontal"
   >
    <Descriptions.Item label="Imię i nazwisko">{`${data.user.firstname} ${data.user.surname}`}</Descriptions.Item>
    <Descriptions.Item label="E-mail">{data.user.email}</Descriptions.Item>
    <Descriptions.Item label="Nr telefonu">{data.phone}</Descriptions.Item>
    <Descriptions.Item label="NIP">{data.NIP}</Descriptions.Item>
    <Descriptions.Item label="Kod pocztowy">{data.postcode}</Descriptions.Item>
    <Descriptions.Item label="Miejscowość">{data.city}</Descriptions.Item>
    <Descriptions.Item label="Ulica">{data.street}</Descriptions.Item>
   </Descriptions>
  </div>
 );
};

export default CustomerData;
