import React from "react";
import PropTypes from "prop-types";
import Fade from "react-reveal/Fade";
import Card from "components/atoms/card/Card";
import Row from "templates/FlexRowTemplate";
import DataElement from "components/molecules/orderForm/data/DataElement";
import { dateToString } from "utils/functions/date";

const OrderData = ({
 customer,
 number,
 currentDate,
 finishDate,
 orderType
}) => {
 return (
  <Fade bottom>
   <Card>
    <Row justify="space-around">
     <DataElement title="Nazwa klienta" caption={customer} />
     <DataElement title="Numer" caption={number} />
     <DataElement title="Typ zamówienia" caption={orderType} />
     <DataElement title="Data" caption={dateToString(currentDate)} />
     <DataElement
      title="Przewidywana data realizacji"
      caption={dateToString(finishDate)}
     />
    </Row>
   </Card>
  </Fade>
 );
};

OrderData.propTypes = {
 customer: PropTypes.string,
 number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
 currentDate: PropTypes.instanceOf(Date),
 finishDate: PropTypes.instanceOf(Date),
 orderType: PropTypes.string
};

export default OrderData;
