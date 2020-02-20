import React, { useState } from "react";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import Card from "components/atoms/card/Card";
import Row from "templates/FlexRowTemplate";
import Veneer from "components/molecules/orderForm/elements/Veneer";
import Color from "components/molecules/orderForm/elements/Color";
import Milling from "components/molecules/orderForm/elements/Milling";
import GlassCase from "components/molecules/orderForm/elements/GlassCase";
import PaintStyle from "components/molecules/orderForm/elements/PaintStyle";
import Handle from "components/molecules/orderForm/elements/Handle";
import BackMilling from "components/molecules/orderForm/elements/BackMilling";
import Catalog from "components/organisms/modals/orderForm/Catalog";
import BackMillingModal from "components/organisms/modals/orderForm/BackMilling";

const OrderElements = () => {
 //display
 const catalogComponent = useSelector(state => state.view.catalogComponent);
 const [isBackMillingModal, setIsBackMillingModal] = useState(false);

 return (
  <>
   <Fade bottom>
    <Card>
     <Row justify="space-around">
      <Color />
      <PaintStyle />
      <Handle />
      <Milling />
      <GlassCase />
      <Veneer />
      <BackMilling setIsBackMillingModal={() => setIsBackMillingModal(true)} />
     </Row>
    </Card>
   </Fade>
   {/* MODALS */}
   {catalogComponent && <Catalog />}
   {isBackMillingModal && (
    <BackMillingModal closeModal={() => setIsBackMillingModal(false)} />
   )}
  </>
 );
};

export default OrderElements;
