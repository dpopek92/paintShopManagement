import React from 'react';
import PropTypes from 'prop-types';
import FlexTemplate from 'templates/FlexTemplate';
import Card from 'components/molecules/catalog/Card';

const Cards = ({ items, onclick }) => {
 return (
  <FlexTemplate>
   {items.map(item => (
    <Card
     key={item.name}
     name={item.name}
     color={item.hexValue}
     onclick={onclick}
    />
   ))}
  </FlexTemplate>
 );
};

Cards.propTypes = {
 items: PropTypes.arrayOf(PropTypes.object),
 onclick: PropTypes.func,
};

export default Cards;
