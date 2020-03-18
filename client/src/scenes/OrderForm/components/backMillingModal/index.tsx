import React from 'react';
import styled from 'styled-components';
import { Modal, Button, Card } from 'antd';
const { Meta } = Card;

const StyledWrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 @media (max-width: 768px) {
  flex-direction: column;
  & > div {
   margin-bottom: 20px;
  }
 }
`;

interface PropsT {
 isModal: boolean;
 closeModal: () => void;
}

const BackMillingModal: React.FC<PropsT> = ({ isModal, closeModal }) => {
 return (
  <Modal
   title="Obróbka krawędzi"
   visible={isModal}
   onCancel={closeModal}
   width={800}
   footer={[
    <Button onClick={closeModal} type="primary">
     Ok
    </Button>,
   ]}
  >
   <StyledWrapper>
    <Card
     style={{ width: 240, margin: 5 }}
     cover={<img src={require('assets/images/nut.jpg')} />}
    >
     <Meta title="Nut" />
    </Card>
    <Card
     style={{ width: 240, margin: 5 }}
     cover={<img src={require('assets/images/felc.jpg')} />}
    >
     <Meta title="Felc" />
    </Card>
    <Card
     style={{ width: 240, margin: 5 }}
     cover={<img src={require('assets/images/chamfering.jpg')} />}
    >
     <Meta title="Gierunek" />
    </Card>
   </StyledWrapper>
   <small>
    <strong>Felc</strong> i <strong>nut</strong> będzie dostępny w opisie
    krawędzi lewej strony elementu (w1'/w2'/s1'/s2'). <strong>Gierunek</strong>{' '}
    można wybrać również na prawej stronie (w1/w2/s1/s2).
   </small>
  </Modal>
 );
};

export default BackMillingModal;
