import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Row from 'templates/FlexRowTemplate';
import ReclamationDetails from 'components/organisms/statistics/ReclamationDetails';
import { getMonthProductionSummary } from 'utils/apiHandlers/statistics/get';
import { isObjectEmpty } from 'utils/functions/objects';
import { months } from 'const';

const StyledH1 = styled.h1`
 font-weight: bold;
 letter-spacing: 3px;
`;
const StyledH2 = styled.h2`
 font-weight: bold;
 color: ${({ theme, variant }) => {
  if (variant === 'green') return theme.blowGreen;
  if (variant === 'yellow') return theme.blowWarning;
  if (variant === 'red') return theme.blowDanger;
  if (variant === 'lightBlue') return theme.blowPrimary;
  if (variant === 'blue') return theme.blowInfo;
  return theme.blowDark;
 }};
`;
const StyledParagraph = styled.p`
 font-size: 24px;
 margin-bottom: 5px;
`;
const StyledTr = styled.tr`
 cursor: pointer;
`;
const StyledIcon = styled(FontAwesomeIcon)`
 cursor: pointer;
 &:hover {
  color: ${({ theme }) => theme.blowInfo};
 }
`;

const MonthSummary = ({ history }) => {
 const month = useSelector(state => state.stats.activeMonth);
 const year = useSelector(state => state.stats.activeYear);
 const [values, setValues] = useState(null);
 const [bestCustomers, setBestCustomers] = useState(null);
 // display
 const [isReclamationDetails, setIsReclamationDetails] = useState(false);

 // GET STATS
 useEffect(() => {
  getMonthProductionSummary(year, month, data => setValues(data));
 }, [year, month]);

 useEffect(() => {
  let customers = [];
  if (values && !isObjectEmpty(values.customers)) {
   Object.keys(values.customers).forEach(key => {
    const item = values.customers[key];
    customers.push(item);
   });

   customers = customers.sort((a, b) => b.ordersPrice - a.ordersPrice);
   customers.length = 3;
   setBestCustomers(customers);
  }
 }, [values]);

 //  HANDLERS
 const handleReclamationDetails = () => setIsReclamationDetails(true);

 return (
  <>
   {values && !isObjectEmpty(values.customers) && (
    <div style={{ textAlign: 'center' }}>
     <StyledH1>
      W miesiącu <span style={{ color: 'blue' }}>{months[month - 1]}</span>
     </StyledH1>
     <Row justify="center">
      <div>
       <StyledH2 variant="green">Sprzedaliśmy:</StyledH2>
       <StyledParagraph>
        <strong>{values.ordersValues.surfaceSummary.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        za kwotę{' '}
        <strong style={{ color: 'green' }}>
         {values.ordersValues.price.toFixed(2)}{' '}
        </strong>
        <small>zł</small>.
       </StyledParagraph>
      </div>
     </Row>
     <hr />
     <Row justify="space-around">
      <div>
       <StyledH2 variant="yellow">Wykonaliśmy:</StyledH2>
       <StyledParagraph>
        <strong>{values.ordersValues.surfaceCnc.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów CNC
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.ordersValues.surfaceFlat.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów gładkich
       </StyledParagraph>
       <hr style={{ width: '70%' }} />
       <StyledParagraph>
        <strong>{values.ordersValues.surfacePL.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów jednostronnych
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.ordersValues.surfacePP.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów dwustronnych
       </StyledParagraph>
       <hr style={{ width: '70%' }} />
       <StyledParagraph>
        <strong>{values.ordersValues.surfaceVeneers.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów fornirowanych
       </StyledParagraph>
      </div>
      <div>
       <StyledH2 variant="yellow">Polakierowaliśmy:</StyledH2>
       <StyledParagraph>
        <strong>{values.ordersValues.surfaceGloss.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        połysku
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.ordersValues.surfaceSemigloss.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        półmatu / matu
       </StyledParagraph>
      </div>
      <div>
       <StyledH2 variant="yellow">Wyfrezowaliśmy:</StyledH2>
       <StyledParagraph>
        <strong>{values.ordersValues.milledHandle.toFixed(2)}</strong>{' '}
        <small>mb</small> uchwytów frezowanych
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.ordersValues.milledPartHandle}</strong>{' '}
        <small>szt</small> uchwytów częściowych
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.ordersValues.hingesHoles}</strong> <small>szt</small>{' '}
        otworów pod zawiasy
       </StyledParagraph>
      </div>
     </Row>
     <hr />
     <Row justify="center">
      <div>
       <StyledH2 variant="lightBlue">Poprawiliśmy:</StyledH2>
       <StyledParagraph>
        <strong style={{ color: 'red' }}>
         {values.reclamations.blowFault.toFixed(2)}
        </strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        z winy BLOW{' '}
        <small>({values.reclamations.blowFaultElements} element/ów)</small>{' '}
        <StyledIcon
         title="Przyczyny reklamacji"
         icon={faInfoCircle}
         onClick={handleReclamationDetails}
        />
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.reclamations.customerFault.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        z winy klienta{' '}
        <small>({values.reclamations.customerFaultElements} element/ów)</small>
       </StyledParagraph>
      </div>
     </Row>
     <hr />
     <Row justify="center">
      <div>
       <StyledParagraph>
        <strong>
         {(
          (values.ordersValues.customerMaterial /
           values.ordersValues.surfaceSummary) *
          100
         ).toFixed(2)}
        </strong>
        <small>%</small> powierzchni zamówień wykonaliśmy z materiału
        powierzonego
       </StyledParagraph>
      </div>
     </Row>
     <hr />

     {bestCustomers && (
      <div>
       <StyledH2 variant="blue">Najaktywniejsi klienci:</StyledH2>
       <Table responsive striped bordered hover size="sm">
        <thead>
         <tr>
          <th>Klient</th>
          <th>Ilość zamówień</th>
          <th>
           Ilość{' '}
           <small>
            m<sup>2</sup>
           </small>
          </th>
          <th>
           Kwota <small>zł</small>
          </th>
         </tr>
        </thead>
        <tbody>
         {bestCustomers.map(item => (
          <StyledTr
           key={item.name}
           onClick={() => history.push(`/customers/${item.id}`, { ...item })}
          >
           <td>{item.name}</td>
           <td>{item.ordersCount}</td>
           <td>{item.ordersSurface.toFixed(2)}</td>
           <td>{item.ordersPrice.toFixed(2)}</td>
          </StyledTr>
         ))}
        </tbody>
       </Table>
      </div>
     )}
     <small style={{ textAlign: 'center' }}>
      Dane pochodzą z zamówień odebranych danego miesiąca
     </small>
    </div>
   )}
   {/* MODALS */}
   {values && isReclamationDetails && (
    <ReclamationDetails
     closeModal={() => setIsReclamationDetails(false)}
     values={values.reclamationReasons}
    />
   )}
  </>
 );
};

// MonthSummary.propTypes = {};

export default withRouter(MonthSummary);
