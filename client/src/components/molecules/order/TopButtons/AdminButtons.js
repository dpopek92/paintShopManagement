import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faDownload,
 faTrashAlt,
 faComments,
 faEdit,
 faDollarSign,
 faCalendarDay,
 faExclamation,
 faArrowAltCircleRight,
 faHandHoldingUsd,
 faStickyNote,
 faFileAlt,
 faBinoculars,
 faReply,
 faClock,
} from '@fortawesome/free-solid-svg-icons';

const AdminButtons = ({
 order,
 setIsOrderRemove,
 setIsFinishDateChange,
 setIsLostElements,
 setIsElementToCorrect,
 setIsPaymentStatusChange,
 setIsPriceChange,
 setIsStatusChange,
 setIsAddComment,
 setIsPickUpReport,
 getOrderFiles,
 getOrderLabel,
 handleOrderPriority,
 handleEditOrder,
 setIsManHours,
}) => {
 const user = useSelector(state => state.auth.user);
 return (
  <>
   <Button variant="danger" onClick={() => setIsOrderRemove(true)}>
    <FontAwesomeIcon icon={faTrashAlt} /> Usuń
   </Button>
   <Button
    variant="outline-danger"
    onClick={() => {
     setIsLostElements(true);
    }}
    disabled={!order.productionStatus}
   >
    <FontAwesomeIcon icon={faBinoculars} /> Elementy brakujący
   </Button>
   <Button
    variant="outline-primary"
    onClick={() => {
     setIsElementToCorrect(true);
    }}
    disabled={!order.productionStatus}
   >
    <FontAwesomeIcon icon={faReply} /> Elementy do poprawy
   </Button>
   <Button
    style={{
     backgroundColor: '#6f42c1',
     borderColor: '#6f42c1',
     color: 'white',
    }}
    onClick={handleEditOrder}
   >
    <FontAwesomeIcon icon={faEdit} /> Edytuj
   </Button>

   <Button variant="info" onClick={() => setIsStatusChange(true)}>
    <FontAwesomeIcon icon={faArrowAltCircleRight} /> Status
   </Button>

   <Button
    style={{
     backgroundColor: '#33cec3',
     borderColor: '#33cec3',
     color: 'black',
    }}
    onClick={() => setIsFinishDateChange(true)}
   >
    <FontAwesomeIcon icon={faCalendarDay} /> Zmień Datę realizacji
   </Button>

   <Button variant="outline-info" onClick={setIsManHours}>
    <FontAwesomeIcon icon={faClock} /> Roboczogodziny
   </Button>

   <Button variant="secondary" onClick={getOrderFiles}>
    <FontAwesomeIcon icon={faDownload} /> Pobierz
   </Button>

   <Button variant="outline-secondary" onClick={getOrderLabel}>
    <FontAwesomeIcon icon={faStickyNote} /> Pobierz naklejkę
   </Button>

   {(user.surname === 'Kępa' || user.surname === 'Popek') && (
    <Button
     variant="success"
     onClick={() => {
      setIsPaymentStatusChange(true);
     }}
    >
     <FontAwesomeIcon icon={faHandHoldingUsd} /> Status płatności
    </Button>
   )}

   <Button variant="warning" onClick={() => setIsPriceChange(true)}>
    <FontAwesomeIcon icon={faDollarSign} /> Zmień cenę
   </Button>

   <Button variant="outline-dark" onClick={() => setIsAddComment(true)}>
    <FontAwesomeIcon icon={faComments} /> Dodaj komentarz
   </Button>

   <OverlayTrigger
    placement="bottom"
    overlay={
     <Tooltip id="tooltip-disabled">
      Zamówienienie z priorytetem zawsze będzie wyświetlane jako pierwsze na
      liście produkcyjnej
     </Tooltip>
    }
   >
    <Button
     variant={order.priority ? 'outline-dark' : 'dark'}
     onClick={handleOrderPriority}
    >
     <FontAwesomeIcon icon={faExclamation} />{' '}
     {order.priority ? 'Usuń priorytet' : 'Nadaj priorytet'}
    </Button>
   </OverlayTrigger>

   {order.productionStatus && order.productionStatus.includes('Zakończone') && (
    <Button variant="outline-primary" onClick={() => setIsPickUpReport(true)}>
     <FontAwesomeIcon icon={faFileAlt} /> Protokół odbioru
    </Button>
   )}
  </>
 );
};

AdminButtons.propTypes = {
 order: PropTypes.instanceOf(Object),
 setIsOrderRemove: PropTypes.func,
 setIsFinishDateChange: PropTypes.func,
 setIsLostElements: PropTypes.func,
 setIsElementToCorrect: PropTypes.func,
 setIsPaymentStatusChange: PropTypes.func,
 setIsPriceChange: PropTypes.func,
 setIsStatusChange: PropTypes.func,
 setIsAddComment: PropTypes.func,
 setIsPickUpReport: PropTypes.func,
 getOrderFiles: PropTypes.func,
 getOrderLabel: PropTypes.func,
 handleOrderPriority: PropTypes.func,
};

export default AdminButtons;
