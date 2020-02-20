import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Card.scss';
import withContext from 'hoc/withContext';

const StyledCard = styled.div`
 position: relative;
 width: 300px;
 height: ${({ type }) => (type !== 'handles' ? `400px` : `300px`)};
 margin: 10px;
 border-radius: 5px;
 border: 1px solid lightgray;
 transition: transform 0.2s;
 background-size: 300px ${({ type }) => (type !== 'handles' ? `350px` : `250px`)};
 background-position: top;
 background-repeat: no-repeat;
 &:hover {
  z-index: 100;
  transform: scale(1.05);
 }
 div.box {
  position: absolute;
  width: 100%;
  height: ${({ type }) => (type !== 'handles' ? `350px` : `250px`)};
  cursor: pointer;
  &:hover {
   span {
    opacity: 0.5;
   }
  }
  span {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-size: 50px;
   letter-spacing: 5px;
   opacity: 0;
   background-color: rgba(0, 0, 0, 0.2);
   border-radius: 5px;
   padding: 5px 10px;
   transition: opacity 0.2s;
  }
 }
`;
const StyledCaption = styled.div`
 border-radius: 5px;
 background-color: rgba(0, 0, 0, 0.08);
 padding: 3px 10px;
 letter-spacing: 2px;
`;
const StyledRow = styled.div`
 position: absolute;
 width: 100%;
 bottom: 0px;
 padding: 9px;
 display: flex;
 justify-content: space-between;
 flex-wrap: nowrap;
`;

const DetailsCard = ({ item, name, image, type, onclick, history, permissionContext }) => {
 const imgPath = `assets/images/${type}/${name}/${image}`;
 return (
  <StyledCard
   type={type}
   image={imgPath}
   style={{
    backgroundImage: `url(${require(`assets/images/${type}/${name}/${image}`)})`,
   }}
  >
   {permissionContext !== 'employee' && (
    <div className="box" onClick={() => onclick(name)}>
     <span>Wybierz</span>
    </div>
   )}
   <StyledRow>
    <StyledCaption>{name.toUpperCase()}</StyledCaption>
    <Button
     variant="outline-secondary"
     size="sm"
     onClick={() => history.push(`/catalog/element/${name}`, { ...item })}
    >
     Szczegóły
    </Button>
   </StyledRow>
  </StyledCard>
 );
};

DetailsCard.propTypes = {
 name: PropTypes.string,
 color: PropTypes.string,
 permissionContext: PropTypes.string,
 onClick: PropTypes.func,
};

export default withRouter(withContext(DetailsCard));
