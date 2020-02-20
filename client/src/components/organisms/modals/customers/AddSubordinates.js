import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Modal from 'components/molecules/modal/Modal';
import Row from 'templates/FlexRowTemplate';
import { loadCustomers, loadCustomerData } from 'actions/customers';
import { setSpinner } from 'actions/view';
import { signal } from 'const';
import { sortByCompanyDesc } from 'utils/sort/sortMethods';
import { setCustomerSubordinates } from 'utils/apiHandlers/customers/update';

const StyledWrapper = styled.div`
 max-height: 60vh;
 display: flex;
 flex-direction: column;
 flex-flow: column wrap;
`;
const StyledCheckbox = styled(Form.Check)`
 margin: 3px;
`;

const AddSubordinates = ({ closeModal, customerId }) => {
 const dispatch = useDispatch();
 const customers = useSelector(state => state.customers.list);

 const [subordinates, setSubordinates] = useState([]);

 // GET CUSTOMERS
 useEffect(() => {
  if (!customers) {
   dispatch(setSpinner(true));
   dispatch(loadCustomers(() => dispatch(setSpinner(false)), signal.token));
  }
 }, []);

 // HANDLERS
 const handleChange = e => {
  const { name, value } = e.target;
  if (e.target.checked) {
   setSubordinates(subordinates.concat({ id: value, name }));
  } else {
   const newSubordinates = subordinates.filter(item => item.id !== value);
   setSubordinates(newSubordinates);
  }
 };

 const handleAddSubordinates = async () => {
  dispatch(setSpinner(true));
  await setCustomerSubordinates(customerId, subordinates, () => {
   dispatch(
    loadCustomerData(
     customerId,
     () => {
      dispatch(setSpinner(false));
      closeModal();
     },
     signal.token,
    ),
   );
  });
 };

 return (
  <Modal closeModal={closeModal} title="Dodaj podwładnych" size="xl">
   <StyledWrapper>
    {customers &&
     customers.sort(sortByCompanyDesc).map(item => (
      <StyledCheckbox
       key={item._id}
       value={item._id}
       type="checkbox"
       // checked={positions.includes(item)}
       id={item._id}
       name={`${item.company} - ${item.firstname}`}
       label={`${item.company} - ${item.firstname}`}
       onChange={handleChange}
      />
     ))}
   </StyledWrapper>
   <hr />
   <Row justify="flex-end">
    <Button variant="success" onClick={handleAddSubordinates}>
     Zatwierdź
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Row>
  </Modal>
 );
};

AddSubordinates.propTypes = {
 closeModal: PropTypes.func,
};

export default AddSubordinates;
// 5df0c949d34f10641e74bcbe
