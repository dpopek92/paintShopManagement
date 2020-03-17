import React from 'react';
import styled from 'styled-components';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import ElementItem from './components/ElementItem';
import ElementMillingItem from './components/ElementMillingItem';
import { CatalogDrawerTypesT } from 'services/store/types/view/View';
import { useDispatch } from 'react-redux';
import {
 setPaintType,
 setPaintStyle,
 setNut,
 setFelc,
 setChamfering,
} from 'services/store/actions/newOrder';
import { containsOneOf } from 'services/utils/array';

const veneerExcludedHandles = ['up', 'uc', 'uk'];

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
 handleCatalog: (type: CatalogDrawerTypesT) => void;
}

const ElementsData: React.FC<PropsT> = ({
 handleCatalog,
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
 const dispatch = useDispatch();
 return (
  <StyledWrapper>
   <ElementItem
    title="Kolor"
    primaryValue={color}
    button
    handleButton={() => handleCatalog('colors')}
    select
    selectItems={['półmat', 'mat', 'połysk']}
    selectValue={paintType}
    handleSelect={value => dispatch(setPaintType(value))}
   />
   <ElementItem
    title="Rodzaj lakierowania"
    select
    selectItems={['jednostronne', 'dwustronne', 'p. połysk/l. półmat']}
    selectValue={paintStyle}
    handleSelect={value => dispatch(setPaintStyle(value))}
   />
   <ElementItem
    title="Rodzaj uchwytu"
    primaryValue={handleSymbol1}
    secondaryValue={handleSymbol2}
    button
    handleButton={() => handleCatalog('handles')}
   />
   <ElementItem
    title="Wzór frontu"
    primaryValue={millingSymbol}
    button
    handleButton={() => handleCatalog('millings')}
    buttonDisabled={
     !!veneerSymbol || color.toLocaleLowerCase().includes('bejca')
    }
   />
   <ElementItem
    title="Wzór witryny"
    primaryValue={glassCaseSymbol}
    button
    handleButton={() => handleCatalog('glassCases')}
   />
   <ElementItem
    title="Rodzaj forniru"
    primaryValue={veneerSymbol}
    button
    handleButton={() => handleCatalog('veneers')}
    buttonDisabled={
     !!millingSymbol ||
     containsOneOf(veneerExcludedHandles, [handleSymbol1, handleSymbol2]) ||
     (!!glassCaseSymbol && glassCaseSymbol !== 'w4')
    }
   />
   <ElementMillingItem
    isNut={isNut}
    handleNut={value => dispatch(setNut(value))}
    isFelc={isFelc}
    handleFelc={value => dispatch(setFelc(value))}
    isChamfering={isChamfering}
    handleChamfering={value => dispatch(setChamfering(value))}
    title="Obróbka elementów"
   />
  </StyledWrapper>
 );
};

export default ElementsData;
