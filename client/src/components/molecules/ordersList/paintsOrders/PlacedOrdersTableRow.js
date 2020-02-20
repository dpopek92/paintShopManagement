import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { dateToString } from 'utils/functions/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { setSpinner } from 'actions/view';
import { useDispatch } from 'react-redux';
import { getOrderById } from 'utils/apiHandlers/paints/get';

const StyledIcon = styled(FontAwesomeIcon)`
 /* cursor: pointer; */
 font-size: 20px;
 transition: color 0.2s;
 &:hover {
  color: ${({ theme }) => theme.blowGreen};
 }
`;

const PlacedOrdersTableRow = ({ item, index, year, month }) => {
 const dispatch = useDispatch();
 const date = new Date(item.date);
 const day = date.getDate();

 const handleDownload = async () => {
  console.log('Button disabled');
  dispatch(setSpinner(true));
  await getOrderById(year, month, day, item._id, () => {
   dispatch(setSpinner(false));
  });
 };
 return (
  <tr>
   <td>{index + 1}</td>
   <td>{dateToString(item.date)}</td>
   <td>{item.user}</td>
   <td>
    {item.colors
     .sort((a, b) => a.color.localeCompare(b.color))
     .map(color => (
      <span
       key={color._id}
       style={color.paintType === 'Połysk' ? { fontWeight: 'bold' } : {}}
      >{`${color.color} ${color.paintType}, `}</span>
     ))}
   </td>
   <td>
    <StyledIcon icon={faDownload} onClick={handleDownload} />
   </td>
  </tr>
 );
};

PlacedOrdersTableRow.propTypes = {
 index: PropTypes.number,
 year: PropTypes.string,
 month: PropTypes.string,
 item: PropTypes.instanceOf(Object),
};

export default PlacedOrdersTableRow;
