import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faDownload,
 faTrashAlt,
 faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const UserButtons = ({
 order,
 handleEditOrder,
 getOrderFiles,
 setIsOrderRemove,
}) => {
 const userId = useSelector(state => state.auth.user._id);
 const { user } = order;
 return (
  <>
   <Button variant="secondary" onClick={getOrderFiles}>
    <FontAwesomeIcon icon={faDownload} /> Pobierz
   </Button>

   <Button
    style={{
     backgroundColor: '#6f42c1',
     borderColor: '#6f42c1',
     color: 'white',
    }}
    onClick={handleEditOrder}
    disabled={
     !order.productionStatus ||
     order.productionStatus !== 'Wysłane' ||
     user._id !== userId
    }
   >
    <FontAwesomeIcon icon={faEdit} /> Edytuj
   </Button>

   <Button
    variant="danger"
    onClick={() => setIsOrderRemove(true)}
    disabled={
     !order.productionStatus ||
     order.productionStatus !== 'Wysłane' ||
     user._id !== userId
    }
   >
    <FontAwesomeIcon icon={faTrashAlt} /> Usuń
   </Button>
  </>
 );
};

UserButtons.propTypes = {
 order: PropTypes.instanceOf(Object),
 handleEditOrder: PropTypes.func,
 getOrderFiles: PropTypes.func,
 setIsOrderRemove: PropTypes.func,
};

export default UserButtons;
