import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ExcelRenderer } from 'react-excel-renderer';
import Modal from 'components/molecules/modal/Modal';
import Row from 'templates/FlexRowTemplate';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { setSpinner } from 'actions/view';
import { getNewOrderSheetTemplate } from 'utils/apiHandlers/sheet/get';
import { useDispatch, useSelector } from 'react-redux';
import { setImportDataFile, addImportedItems } from 'actions/newOrder';

const StyledInputFile = styled.input`
 width: 0.1px;
 height: 0.1px;
 opacity: 0;
 overflow: hidden;
 position: absolute;
 z-index: -1;
`;
const StyledFileLabel = styled.label`
 color: white;
 font-size: 16px;
 background-color: #007bff;
 border: 1px solid #007bff;
 padding: 5px 20px;
 margin: 5px;
 letter-spacing: 1px;
 border-radius: 3px;
 cursor: pointer;
 transition: background-color 200ms ease;
 &:hover {
  background-color: white;
  color: #007bff;
 }
`;

const ImportDataFromSheet = ({ closeModal }) => {
 const dispatch = useDispatch();
 const dataFile = useSelector(state => state.newOrder.importDataFile);
 const [fileName, setFileName] = useState('');
 const [items, setItems] = useState([]);
 const [errors, setErrors] = useState('');

 // HANDLERS
 const getSheetTemplate = async () => {
  dispatch(setSpinner(true));
  await getNewOrderSheetTemplate(() => dispatch(setSpinner(false)));
 };
 const handleFile = e => {
  const file = e.target.files[0];
  if (!file) {
   setErrors('Brak pliku');
   return console.log('No file');
  }
  if (
   !(
    file.type === 'application/vnd.ms-excel' ||
    file.type ===
     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
   )
  ) {
   setErrors('Nieprawidłowy format pliku');
   return console.log('Wrong file');
  }
  ExcelRenderer(file, (err, res) => {
   if (err) {
    console.log(err);
   } else {
    setErrors('');
    dispatch(setImportDataFile(file));
    setFileName(file.name);
    setItems(res.rows.slice(15));
   }
  });
 };
 const handleConfirm = () => {
  dispatch(addImportedItems(items));
  closeModal();
 };
 console.log(items);
 return (
  <Modal closeModal={closeModal} title="Import wymiarów z arkusza">
   <Row justify="space-between">
    <p>
     Z arkusza pobrane zostaną wartości takie jak: wysokość, szerokość i ilość
     elementów.
    </p>
    <Button variant="outline-primary" onClick={getSheetTemplate}>
     Pobierz wzór akusza
    </Button>
    <StyledInputFile
     onChange={e => handleFile(e)}
     type="file"
     name="sheet"
     multiple={false}
     id="importDataSheet"
     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    />
    <StyledFileLabel htmlFor="importDataSheet">
     <FontAwesomeIcon
      icon={faFileUpload}
      style={dataFile ? { color: 'black' } : null}
     />{' '}
     Wybierz plik z dysku
    </StyledFileLabel>
    <small>{fileName}</small>
    <small style={{ color: 'red' }}>{errors}</small>
   </Row>
   <hr />
   <Row justify="flex-end">
    <Button
     variant="success"
     onClick={handleConfirm}
     disabled={errors || !dataFile}
    >
     Zatwierdź
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Row>
  </Modal>
 );
};

ImportDataFromSheet.propTypes = {
 closeModal: PropTypes.func,
};

export default ImportDataFromSheet;
