import React from "react";
import PropTypes from "prop-types";
import FlexTemplate from "templates/FlexTemplate";
import ImageCard from "components/molecules/catalog/ImageCard";

var x = "c"

const ImageCards = ({ items, type, onclick }) => {
 return (
  <FlexTemplate>
   {items.map((item, index) => (
    <ImageCard
     key={item.name + index}
     name={item.name}
     type={type}
     image={item.image}
     onclick={onclick}
    />
   ))}
  </FlexTemplate>
 );
};

ImageCards.propTypes = {
 items: PropTypes.array,
 type: PropTypes.string,
 onclick: PropTypes.func
};

export default ImageCards;
