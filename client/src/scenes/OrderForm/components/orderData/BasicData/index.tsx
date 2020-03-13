import React from 'react';
import styled from 'styled-components';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import InfoItem from './components/InfoItem';
import { UserT } from 'services/store/types/auth/Auth';
import { dateToString } from 'services/utils/date';

const StyledWrapper = styled.div`
 width: 100%;
 display: flex;
 flex-direction: row;
 justify-content: space-around;
 @media (max-width: 768px) {
  flex-direction: column;
 }
`;

interface PropsT {
 newOrder: NewOrderT;
 author: UserT;
}

const BasicData: React.FC<PropsT> = ({
 author,
 newOrder: { date, finishDate, type },
}) => {
 return (
  <StyledWrapper>
   <InfoItem
    title="Nazwa użytkownika"
    text={`${author.firstname} ${author.surname}`}
   />
   <InfoItem title="Typ zamówienia" text={type} />
   <InfoItem title="Data złożenia" text={dateToString(date)} />
   <InfoItem
    title="Przewidywana data realizacji"
    text={dateToString(finishDate)}
   />
  </StyledWrapper>
 );
};

export default BasicData;
