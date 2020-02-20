import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledRow = styled.tr`
 cursor: pointer;
 background-color: ${({ isaccepted }) => (!isaccepted ? '#ffa3a3' : 'inherit')};
`;

const ListRow = ({ item, index, history }) => {
 console.log(item);
 return (
  <StyledRow
   onClick={() => history.push(`/customers/${item._id}`, { ...item })}
   isaccepted={item.isAccepted}
   title={!item.isAccepted ? 'Konto niezatwierdzone' : ''}
  >
   <td>{index + 1}</td>
   <td>{item.company}</td>
   <td>{item.firstname}</td>
   <td>{item.ordersNumber}</td>
  </StyledRow>
 );
};

ListRow.propTypes = {
 item: PropTypes.instanceOf(Object),
 index: PropTypes.number,
};

export default withRouter(ListRow);
