import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { getOrder } from "actions/orders";
import { setOrderPaintMakers } from "utils/apiHandlers/orders/update";

//STYLES
const StyledWrapper = styled.div`
 width: 65%;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 margin-bottom: 5px;
`;

const StyledInput = styled(Form.Control)`
 width: 120px;
 display: inline-block;
`;

//COMPONENT
const PaidStatus = ({ closeModal, order }) => {
 const [paintMakerBase, setPaintMakerBase] = useState(order.paintMakerBase);
 const [paintMaker, setPaintMaker] = useState(order.paintMaker);
 const dispatch = useDispatch();

 const handleSubmit = async () => {
  dispatch(setSpinner(true));
  await setOrderPaintMakers(order._id, paintMaker, paintMakerBase);
  dispatch(getOrder(order._id, () => dispatch(setSpinner(false)), null));

  closeModal();
 };

 return (
  <Modal closeModal={closeModal} title={"Zmiana producentów"} variant="success">
   <>
    <StyledWrapper>
     <span>Producent podkładu:</span>{" "}
     <StyledInput
      type="text"
      placeholder="Podkład"
      value={paintMakerBase}
      onChange={e => {
       setPaintMakerBase(e.target.value);
      }}
     />
    </StyledWrapper>
    <StyledWrapper>
     <span>Producent lakieru:</span>{" "}
     <StyledInput
      type="text"
      placeholder="Lakier"
      value={paintMaker}
      onChange={e => {
       setPaintMaker(e.target.value);
      }}
     />
    </StyledWrapper>
    <hr />
    <Buttons justify="flex-end">
     <Button variant="success" onClick={handleSubmit}>
      Zmień
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Anuluj
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

PaidStatus.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.object
};

export default PaidStatus;
