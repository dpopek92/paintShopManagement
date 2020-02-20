import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledH3 as Heading } from 'components/atoms/heading/Headings';
import { getOrdersFromArray } from 'utils/apiHandlers/orders/get';
import List from 'components/molecules/ordersList/static/statistics/List';

const Orders = ({ title, descriptions }) => {
 const [ordersToDisplay, setOrdersToDisplay] = useState(null);

 useEffect(() => {
  if (descriptions) {
   const arrayOfId = descriptions.map(item => {
    return { _id: item.id };
   });
   if (arrayOfId.length > 0) {
    getOrdersFromArray(arrayOfId).then(res => setOrdersToDisplay(res));
   }
  }
 }, [descriptions]);

 //  console.log(descriptions);
 return (
  <div>
   <Heading>{title}</Heading>
   <List orders={ordersToDisplay} descriptions={descriptions} />
  </div>
 );
};

Orders.propTypes = {
 title: PropTypes.string,
 descriptions: PropTypes.arrayOf(PropTypes.object),
};

export default Orders;
