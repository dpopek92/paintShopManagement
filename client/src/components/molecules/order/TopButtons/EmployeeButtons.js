import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faPlay,
 faEdit,
 faStop,
 faPause,
 faCheck,
 faFileAlt,
 faStickyNote,
 faBinoculars,
 faReply,
 faDownload,
} from '@fortawesome/free-solid-svg-icons';

const StyledButton = styled(Button)`
 background-color: ${({ theme }) => theme.blowPurple};
 border-color: ${({ theme }) => theme.blowPurple};
 &:hover {
  background-color: ${({ theme }) => darken(0.2, theme.blowPurple)};
  border-color: ${({ theme }) => theme.blowPurple};
 }
`;

const EmployeeButtons = ({
 order,
 setIsLostElements,
 setIsAddComment,
 setIsPickUpReport,
 setIsElementToCorrect,
 setIsReadyToPickUp,
 setIsStartOrder,
 setIsStopOrder,
 setIsPauseOrder,
 getOrderFiles,
 getOrderLabel,
 handleOrderDeliver,
}) => {
 const activePosition = useSelector(state => state.employee.activePosition);
 return (
  <>
   {activePosition && activePosition !== 'Transport' && (
    <>
     <Button
      disabled={!order.productionStatus.includes(activePosition)}
      variant="danger"
      onClick={() => {
       setIsLostElements(true);
      }}
     >
      <FontAwesomeIcon icon={faBinoculars} /> Brak elementów
     </Button>
     <Button
      disabled={!order.productionStatus.includes(activePosition)}
      variant="warning"
      onClick={() => {
       setIsElementToCorrect(true);
      }}
     >
      <FontAwesomeIcon icon={faReply} /> Elementy do poprawy
     </Button>
     {order.inProduction.includes(activePosition) && (
      <Button
       variant="outline-success"
       onClick={() => {
        setIsPauseOrder(true);
       }}
      >
       <FontAwesomeIcon icon={faPause} /> Pauza
      </Button>
     )}
     <Button
      variant="success"
      onClick={() =>
       order.inProduction.includes(activePosition)
        ? setIsStopOrder(true)
        : setIsStartOrder(true)
      }
      disabled={!order.productionStatus.includes(activePosition)}
     >
      {order.inProduction.includes(activePosition) ? (
       <>
        <FontAwesomeIcon icon={faStop} /> {'Zakończ'}
       </>
      ) : (
       <>
        <FontAwesomeIcon icon={faPlay} /> {'Rozpocznij'}
       </>
      )}
     </Button>
     {activePosition === 'Pakowanie' &&
      order.productionStatus === 'Zakończone' &&
      !order.isReadyToPickUp && (
       <StyledButton
        onClick={() => {
         setIsReadyToPickUp(true);
        }}
       >
        <FontAwesomeIcon icon={faCheck} /> Gotowe do odbioru
       </StyledButton>
      )}
     {activePosition === 'Pakowanie' && (
      <Button variant="dark" onClick={getOrderFiles}>
       <FontAwesomeIcon icon={faDownload} /> Pobierz
      </Button>
     )}
     {activePosition === 'Pakowanie' && (
      <Button variant="outline-dark" onClick={getOrderLabel}>
       <FontAwesomeIcon icon={faStickyNote} /> Pobierz naklejkę
      </Button>
     )}
     {activePosition === 'Pakowanie' &&
      order.productionStatus.includes('Zakończone') && (
       <Button
        variant="primary"
        onClick={() => {
         setIsPickUpReport(true);
        }}
       >
        <FontAwesomeIcon icon={faFileAlt} /> Protokół odbioru
       </Button>
      )}
     <Button
      variant="secondary"
      onClick={() => {
       setIsAddComment(true);
      }}
     >
      <FontAwesomeIcon icon={faEdit} /> Dodaj komentarz
     </Button>
    </>
   )}

   {activePosition && activePosition === 'Transport' && (
    <Button onClick={() => handleOrderDeliver(activePosition)}>
     Zamówienie dostarczone
    </Button>
   )}
  </>
 );
};

EmployeeButtons.propTypes = {
 order: PropTypes.instanceOf(Object),
 setIsLostElements: PropTypes.func,
 setIsStartOrder: PropTypes.func,
 setIsStopOrder: PropTypes.func,
 setIsPauseOrder: PropTypes.func,
 setIsAddComment: PropTypes.func,
 setIsPickUpReport: PropTypes.func,
 setIsElementToCorrect: PropTypes.func,
 setIsReadyToPickUp: PropTypes.func,
 getOrderFiles: PropTypes.func,
 getOrderLabel: PropTypes.func,
};

export default EmployeeButtons;
