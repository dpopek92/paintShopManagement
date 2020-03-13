import React from 'react';
import styled from 'styled-components';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import ElementItem from './components/ElementItem';
import ElementMillingItem from './components/ElementMillingItem';

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
}

const ElementsData: React.FC<PropsT> = ({
 newOrder: {
  color,
  paintType,
  paintStyle,
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  glassCaseSymbol,
  veneerSymbol,
  isFelc,
  isNut,
  isChamfering,
 },
}) => {
 return (
  <StyledWrapper>
   <ElementItem
    title="Kolor"
    primaryValue={color}
    button
    select
    selectItems={['półmat', 'mat', 'połysk']}
    selectValue={paintType}
   />
   <ElementItem
    title="Rodzaj lakierowania"
    select
    selectItems={['jednostronne', 'dwustronne', 'p. połysk/l. półmat']}
    selectValue={paintStyle}
   />
   <ElementItem
    title="Rodzaj uchwytu"
    primaryValue={handleSymbol1}
    secondaryValue={handleSymbol2}
    button
   />
   <ElementItem title="Wzór frontu" primaryValue={millingSymbol} button />
   <ElementItem title="Wzór witryny" primaryValue={glassCaseSymbol} button />
   <ElementItem title="Rodzaj forniru" primaryValue={veneerSymbol} button />
   <ElementMillingItem
    isNut={isNut}
    isFelc={isFelc}
    isChamfering={isChamfering}
    title="Obróbka elementów"
   />
  </StyledWrapper>
 );
};

export default ElementsData;
