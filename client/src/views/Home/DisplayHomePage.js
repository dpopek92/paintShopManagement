import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "components/atoms/spinner/SpinnerSmall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import FullWidthTemplate from "templates/FullWidthPageTemplate";
import Row from "templates/FlexRowTemplate";
import { StyledH1 as Heading } from "components/atoms/heading/Headings";
import Lists from "components/organisms/displayLists/Lists";
import ChangeDisplaySettings from "components/organisms/modals/displayList/ChangeDisplaySettings";
import { setDisplayFromStorage, setSpinner } from "actions/view";
import { loadProductionOrders } from "actions/production";
import { signal } from "const";
import Legend from "components/molecules/ordersList/Legend";

const DisplayHomePage = props => {
 let _isMounted = false;
 const dispatch = useDispatch();

 const orders = useSelector(state => state.production.list);
 const positions = useSelector(state => state.view.positions);
 //display
 const [isDisplaySettings, setIsDisplaySettings] = useState(false);
 const [isSpinner, setIsSpinner] = useState(false);

 const getOrders = onEnd =>
  dispatch(
   loadProductionOrders(
    "inproduction",
    () => (_isMounted ? onEnd() : null),
    signal.token
   )
  );

 // GET DISPLAY SETTINGS && GET ORDERS && SET INTERVAL
 useEffect(() => {
  _isMounted = true;
  dispatch(setSpinner(true));
  getOrders(() => dispatch(setSpinner(false)));

  const interval = setInterval(() => {
   setIsSpinner(true);
   getOrders(() => setIsSpinner(false));
  }, 30000);

  let positions;
  let tableElements;
  if (localStorage.positionsToDisplay) {
   positions = JSON.parse(localStorage.positionsToDisplay);
  }
  if (localStorage.tableElements) {
   tableElements = JSON.parse(localStorage.tableElements);
  }

  if (positions && tableElements) {
   dispatch(setDisplayFromStorage(positions, tableElements));
  }
  return () => {
   _isMounted = false;
   clearInterval(interval);
  };
 }, []);

 // HANDLERS
 const handleDisplaySettings = () => setIsDisplaySettings(true);
 return (
  <>
   <FullWidthTemplate>
    <>
     <Row justify="space-between">
      <Heading>Zamówienia</Heading>
      {isSpinner && <Spinner />}
      <div>
       <Button variant="secondary" onClick={handleDisplaySettings}>
        <FontAwesomeIcon icon={faList} /> Ustawienia listy
       </Button>
      </div>
     </Row>
     <Lists orders={orders} positions={positions} />
     <Legend />
    </>
   </FullWidthTemplate>
   {/* MODALS */}
   {isDisplaySettings && (
    <ChangeDisplaySettings closeModal={() => setIsDisplaySettings(false)} />
   )}
  </>
 );
};

DisplayHomePage.propTypes = {};

export default DisplayHomePage;
