import React from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'components/molecules/modal/Modal';
import Colors from 'views/Catalog/Colors';
import Veneers from 'views/Catalog/Veneers';
import Handles from 'views/Catalog/Handles';
import Millings from 'views/Catalog/Millings';
import GlassCases from 'views/Catalog/GlassCases';
import { setComponentInModal } from 'actions/view';

const components = {
 colors: Colors,
 handles: Handles,
 millings: Millings,
 glassCases: GlassCases,
 veneers: Veneers,
};

const Catalog = () => {
 const dispatch = useDispatch();
 const component = useSelector(state => state.view.catalogComponent);
 const Component = components[component];

 const handleCloseModal = () => {
  dispatch(setComponentInModal(null));
 };
 return (
  <Modal closeModal={handleCloseModal} size="xl">
   <Component />
  </Modal>
 );
};

// Catalog.propTypes = {  };

export default Catalog;
