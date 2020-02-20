import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/molecules/modal/Modal';
import { Table } from 'react-bootstrap';

const ReclamationDetails = ({ closeModal, values }) => {
 return (
  <Modal closeModal={closeModal} title="Przyczyny reklamacji">
   <Table bordered striped hover responsive>
    <tbody>
     {Object.keys(values).map(key => (
      <tr key={key}>
       <th>{`${key}`}</th>
       <td>
        {values[key].toFixed(2)}{' '}
        <small>
         m<sup>2</sup>
        </small>
       </td>
      </tr>
     ))}
    </tbody>
   </Table>
  </Modal>
 );
};

ReclamationDetails.propTypes = {
 closeModal: PropTypes.func,
 values: PropTypes.instanceOf(Object),
};

export default ReclamationDetails;
