import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Row from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import List from 'components/molecules/ordersList/static/List';
import { setSortList, setSpinner } from 'actions/view';
import { downloadProductionList } from 'utils/apiHandlers/orders/get';

const GenerateProductionList = ({ closeModal }) => {
 const dispatch = useDispatch();
 const orders = useSelector(state => state.production.activeList);
 const sortOrders = useSelector(state => state.view.sortList.production);
 const [listToPrint, setListToPrint] = useState([]);

 // HANDLERS
 const handleGenListCheckbox = e => {
  const { checked, value } = e.target;
  if (checked) {
   if (!listToPrint.includes(value)) {
    setListToPrint(listToPrint.concat(value));
   }
  } else {
   const list = listToPrint.filter(item => item !== value);
   setListToPrint(list);
  }
 };
 const handleSortOrders = sortBy => {
  dispatch(setSortList('production', sortBy));
 };
 const handleSubmit = async () => {
  dispatch(setSpinner(true));
  await downloadProductionList(listToPrint, () => {
   dispatch(setSpinner(false));
   closeModal();
  });
 };

 return (
  <Modal closeModal={closeModal} title="Generuj listę" size="xl">
   <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
    {orders && (
     <List
      orders={orders}
      sortBy={sortOrders}
      view="generateList"
      handleGenListCheckbox={handleGenListCheckbox}
      setSortOrders={handleSortOrders}
     />
    )}
   </div>
   <hr />
   <Row justify="flex-end">
    <Button variant="success" onClick={handleSubmit}>
     Generuj
    </Button>
   </Row>
  </Modal>
 );
};

GenerateProductionList.propTypes = {
 closeModal: PropTypes.func,
};

export default GenerateProductionList;
