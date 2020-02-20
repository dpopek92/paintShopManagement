import React from 'react';
import styled from 'styled-components';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const TightColumn = styled.th`
 width: 65px;
 background-color: ${({ side, theme }) => {
  if (side === 'left') return theme.blowWarning;
  if (side === 'right') return theme.blowGreen;
  return null;
 }};
`;
const PrimaryColumn = styled.td`
 vertical-align: middle;
 background-color: rgba(205, 231, 169, 0.5);
`;
const SecondaryColumn = styled.td`
 vertical-align: middle;
 background-color: rgba(252, 215, 160, 0.5);
`;

const List = ({ order, handleElement }) => {
 return (
  <>
   <Table size="sm" responsive="lg" hover bordered>
    <thead>
     <tr>
      <TightColumn>Brak</TightColumn>
      <TightColumn>Wys.</TightColumn>
      <TightColumn>Szer.</TightColumn>
      <TightColumn side="right">P</TightColumn>
      <TightColumn side="left">L</TightColumn>
      <TightColumn>Ilość</TightColumn>
     </tr>
    </thead>
    <tbody>
     {order &&
      order.items.map(item => {
       const options = [];
       if (item.quantity > 1) {
        for (let i = 0; i < item.quantity + 1; i += 1) {
         options.push(i);
        }
       }
       let noItem;
       if (item.elementLost && item.elementLost.position) {
        noItem = item.elementLost.position;
       } else if (item.elementToCorrect && item.elementToCorrect.position) {
        noItem = item.elementToCorrect.position;
       }
       return (
        <tr key={item._id}>
         <td>
          {
           <>
            {item.quantity <= 1 ? (
             <Form.Check
              id={item._id}
              value={item._id}
              type="checkbox"
              name="element"
              onChange={e => handleElement(e, item._id, 1)}
             />
            ) : (
             <Form.Control
              style={{ padding: 3, height: 25, textAlign: 'center' }}
              id={item._id}
              // value={item._id}
              as="select"
              name="element"
              onChange={e =>
               handleElement(e, item._id, parseInt(e.target.value, 10))
              }
             >
              {options.map(option => (
               <option key={option} value={option}>
                {option}
               </option>
              ))}
             </Form.Control>
            )}
           </>
          }
         </td>
         <td>{item.height}</td>
         <td>{item.width}</td>
         <PrimaryColumn>
          {item.paintRight ? <FontAwesomeIcon icon={faCheck} /> : ''}
         </PrimaryColumn>
         <SecondaryColumn>
          {item.paintLeft ? <FontAwesomeIcon icon={faCheck} /> : ''}
         </SecondaryColumn>
         <td>{item.quantity}</td>
         {noItem ? <td style={{ fontSize: 14 }}>{noItem}</td> : null}
        </tr>
       );
      })}
    </tbody>
   </Table>
  </>
 );
};

List.propTypes = {
 order: PropTypes.instanceOf(Object),
 handleElement: PropTypes.func,
};

export default List;
