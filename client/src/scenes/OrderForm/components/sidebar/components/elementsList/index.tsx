import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateT } from 'services/store';
import Item from './components/item';
import {
 setColor,
 setVeneer,
 setGlassCase,
 setMilling,
 removeHandle,
} from 'services/store/actions/newOrder';

interface PropsT {}

const ElementsList: React.FC<PropsT> = () => {
 const dispatch = useDispatch();
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const {
  color,
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  veneerSymbol,
  glassCaseSymbol,
 } = newOrder;
 return (
  <div>
   {color && (
    <Item
     name="Kolor"
     value={color}
     handleRemove={() => dispatch(setColor(''))}
    />
   )}
   {handleSymbol1 && (
    <Item
     name="Uchwyt (1)"
     value={handleSymbol1}
     handleRemove={() => dispatch(removeHandle('handleSymbol1'))}
    />
   )}
   {handleSymbol2 && (
    <Item
     name="Uchwyt (2)"
     value={handleSymbol2}
     handleRemove={() => dispatch(removeHandle('handleSymbol2'))}
    />
   )}
   {millingSymbol && (
    <Item
     name="Rodzaj frezowania"
     value={millingSymbol}
     handleRemove={() => dispatch(setMilling(''))}
    />
   )}
   {glassCaseSymbol && (
    <Item
     name="Rodzaj witryny"
     value={glassCaseSymbol}
     handleRemove={() => dispatch(setGlassCase(''))}
    />
   )}
   {veneerSymbol && (
    <Item
     name="Rodzaj forniru"
     value={veneerSymbol}
     handleRemove={() => dispatch(setVeneer(''))}
    />
   )}
  </div>
 );
};

export default ElementsList;
