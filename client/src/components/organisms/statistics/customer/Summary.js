import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import Row from 'templates/FlexRowTemplate';
import { months } from 'const/';
import styled from 'styled-components';
import List from 'components/molecules/ordersList/static/List';
import { setSortList } from 'actions/view';

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
 }};
`;
const StyledParagraph = styled.p`
 font-size: 24px;
 margin-bottom: 5px;
`;

const Summary = () => {
 const dispatch = useDispatch();
 const stats = useSelector(state => state.stats);
 const customer = useSelector(state => state.customers.customerData);
 const orders = useSelector(state => state.orders.list);
 const sortEndedOrders = useSelector(state => state.view.sortList.endedOrders);
 const { activeYear: year, activeMonth: month, customerStats: values } = stats;

 const handleSortEndedOrders = sortBy => {
  dispatch(setSortList('endedOrders', sortBy));
 };
 return (
  values &&
  customer && (
   <div style={{ textAlign: 'center' }}>
    <div>
     {month ? (
      <StyledH1>
       W miesiącu <span style={{ color: 'blue' }}>{months[month - 1]}</span>
      </StyledH1>
     ) : (
      <StyledH1>
       W roku <span style={{ color: 'blue' }}>{year}</span>
      </StyledH1>
     )}

     <Row justify="center">
      <div>
       <StyledH2 variant="green">
        {customer.firstname}
        <span style={{ color: 'black' }}> z firmy</span> {customer.company}
        <span style={{ color: 'black' }}> odebrał:</span>
       </StyledH2>
       <StyledParagraph>
        <strong>{values.surfaceSummary.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        za kwotę{' '}
        <strong style={{ color: 'green' }}>{values.price.toFixed(2)} </strong>
        <small>zł</small>.
       </StyledParagraph>
      </div>
     </Row>
     <hr />
     <StyledH2 variant="yellow">Zamówienia zawierały:</StyledH2>
     <Row justify="space-around">
      <div>
       <StyledParagraph>
        <strong>{values.surfaceCnc.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów CNC
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.surfaceFlat.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów gładkich
       </StyledParagraph>
       <hr style={{ width: '70%' }} />
       <StyledParagraph>
        <strong>{values.surfacePL.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów jednostronnych
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.surfacePP.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów dwustronnych
       </StyledParagraph>
       <hr style={{ width: '70%' }} />
       <StyledParagraph>
        <strong>{values.surfaceVeneers.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        elementów fornirowanych
       </StyledParagraph>
      </div>
      <div>
       <StyledParagraph>
        <strong>{values.surfaceGloss.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        połysku
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.surfaceSemigloss.toFixed(2)}</strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        półmatu / matu
       </StyledParagraph>
      </div>
      <div>
       <StyledParagraph>
        <strong>{values.milledHandle.toFixed(2)}</strong> <small>mb</small>{' '}
        uchwytów frezowanych
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.milledPartHandle}</strong> <small>szt</small> uchwytów
        częściowych
       </StyledParagraph>
       <StyledParagraph>
        <strong>{values.hingesHoles}</strong> <small>szt</small> otworów pod
        zawiasy
       </StyledParagraph>
      </div>
     </Row>
     <hr />
     <Row justify="center">
      <div>
       <StyledH2 variant="lightBlue">Zgłosił:</StyledH2>
       <StyledParagraph>
        <strong style={{ color: 'red' }}>
         {values.reclamationsSurface.toFixed(2)}
        </strong>{' '}
        <small>
         m<sup>2</sup>
        </small>{' '}
        reklamacji <small>({values.reclamationsElements} element/ów)</small>
       </StyledParagraph>
      </div>
     </Row>
     <hr />
     <Row justify="center">
      <div>
       <StyledParagraph>
        <strong>
         {values.customerMaterial
          ? ((values.customerMaterial / values.surfaceSummary) * 100).toFixed(2)
          : 0}
        </strong>
        <small>%</small> powierzchni zamówień pochodziło z materiału
        powierzonego
       </StyledParagraph>
      </div>
     </Row>
     {month && orders && (
      <>
       <hr />
       <List
        orders={orders}
        view="ended"
        sortBy={sortEndedOrders}
        setSortOrders={handleSortEndedOrders}
       />
      </>
     )}

     <small style={{ textAlign: 'center' }}>
      Dane pochodzą z zamówień odebranych danego miesiąca
     </small>
    </div>
   </div>
  )
 );
};

// Summary.propTypes = {};

export default Summary;
