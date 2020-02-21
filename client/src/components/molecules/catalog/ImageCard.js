import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'components/molecules/catalog/Card.scss';
import withContext from 'hoc/withContext';

// const StyledCard = styled.div`
//  position: relative;
//  width: 200px;
//  height: 300px;
//  margin: 5px;
//  border-radius: 5px;
//  border: 1px solid lightgray;
//  background-image: url(${({ image }) => require(image)});
//  transition: transform 0.2s;
//  cursor: pointer;
//  &:hover {
//   z-index:100
//   transform: scale(1.2);
//  }
// `;
// const StyledCaption = styled.div`
//  position: absolute;
//  bottom: 3px;
//  left: 3px;
//  max-width: 97%;
//  border-radius: 5px;
//  background-color: rgba(255, 255, 255, 0.5);
//  padding: 3px;
// `;

const ImageCard = ({ name, image, type, onclick, permissionContext }) => {
 const imgPath = `assets/images/${type}/${image}`;
 return (
  // <StyledCard onClick={() => onclick(name)} type={type} image={imgPath}>
  //  <StyledCaption>{name}</StyledCaption>
  // </StyledCard>
  <div
   className="catalogCard imageCard"
   onClick={() =>
    permissionContext !== 'employee' ? onclick(name, type) : null
   }
   type={type}
   image={imgPath}
   style={{
    backgroundImage: `url(${require(`assets/images/${type}/${image}`)})`,
   }}
  >
   <div className="cardCaption">{name}</div>
  </div>
 );
};

ImageCard.propTypes = {
 name: PropTypes.string,
 color: PropTypes.string,
 permissionContext: PropTypes.string,
 onClick: PropTypes.func,
};

export default withContext(ImageCard);

// "url(" + require(`../../images/mordant/${item.image}`) + ")"
