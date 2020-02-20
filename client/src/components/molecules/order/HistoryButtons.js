import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import withContext from "hoc/withContext";

const HistoryButtons = ({
 order,
 permissionContext,
 setIsChangeHistory,
 setIsProductionHistory
}) => {
 return (
  <>
   {permissionContext === "admin" && (
    <>
     {order &&
     order.hasOwnProperty("updateHistory") &&
     order.updateHistory.length > 0 ? (
      <Button
       variant="outline-primary"
       onClick={() => setIsChangeHistory(true)}
      >
       Historia zmian
      </Button>
     ) : null}
     {order &&
     order.hasOwnProperty("productionHistory") &&
     order.productionHistory.length > 0 ? (
      <Button
       variant="outline-info"
       onClick={() => setIsProductionHistory(true)}
      >
       Historia produkcji
      </Button>
     ) : null}
    </>
   )}
  </>
 );
};

HistoryButtons.propTypes = {
 order: PropTypes.object,
 permissionContext: PropTypes.string,
 setIsChangeHistory: PropTypes.func,
 setIsProductionHistory: PropTypes.func
};

export default withContext(HistoryButtons);
