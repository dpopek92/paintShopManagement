import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import Row from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';

const StyledCard = styled(Card)`
 width: 220px;
 margin: 10;
`;

const BackMilling = ({ closeModal }) => {
 return (
  <Modal closeModal={closeModal} title="Obróbka krawędzi" size="lg">
   <Row justify="space-between">
    <StyledCard>
     <Card.Img variant="top" src={require('assets/images/nut.jpg')} />
     <Card.Body style={{ padding: 5 }}>
      <Card.Title style={{ margin: 0, textAlign: 'center' }}>Nut</Card.Title>
     </Card.Body>
    </StyledCard>
    <StyledCard>
     <Card.Img variant="top" src={require('assets/images/felc.jpg')} />
     <Card.Body style={{ padding: 5 }}>
      <Card.Title style={{ margin: 0, textAlign: 'center' }}>Flec</Card.Title>
     </Card.Body>
    </StyledCard>
    <StyledCard>
     <Card.Img variant="top" src={require('assets/images/chamfering.jpg')} />
     <Card.Body style={{ padding: 5 }}>
      <Card.Title style={{ margin: 0, textAlign: 'center' }}>
       Gierunek
      </Card.Title>
     </Card.Body>
    </StyledCard>
   </Row>
   <small>
    Felc i nut będzie dostępny w opisie krawędzi lewej strony elementu
    (w1'/w2'/s1'/s2'). Gierunek można wybrać również na prawej stronie
    (w1/w2/s1/s2).
   </small>
  </Modal>
 );
};

BackMilling.propTypes = {
 closeModal: PropTypes.func,
};

export default BackMilling;
