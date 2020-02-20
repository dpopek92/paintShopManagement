import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from "prop-types";
import styled from 'styled-components';
import {
 StyledH3 as Heading,
 StyledH6,
} from 'components/atoms/heading/Headings';
import PriceInfo from 'components/molecules/price/PriceInfo';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import Row from 'templates/FlexRowTemplate';
import { loadPrices } from 'actions/prices';
import { setSpinner } from 'actions/view';
import { signal } from 'const/';

const StyledWrapper = styled.div`
 width: 400px;
 margin-right: 50px;
 @media (max-width: 600px) {
  width: 100%;
  margin: 5px auto;
 }
`;

const UserPriceList = () => {
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);
 const prices = useSelector(state => state.prices.globalPrices);
 const [values, setValues] = useState(null);

 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(loadPrices(() => dispatch(setSpinner(false)), signal.token));
 }, []);
 useEffect(() => {
  let obj = {
   board: {},
   customerMaterial: { gloss: {}, semiGloss: {} },
   gloss: {},
   semiGloss: {},
  };
  if (user.discounts && prices) {
   const disc = user.discounts;

   obj.board[22] = prices.board[22] - disc.board[22];
   obj.board[25] = prices.board[25] - disc.board[25];
   obj.board[28] = prices.board[28] - disc.board[28];
   obj.board[30] = prices.board[30] - disc.board[30];
   obj.board[38] = prices.board[38] - disc.board[38];

   obj.customerMaterial.gloss.oneSide =
    prices.customerMaterial.gloss.oneSide - disc.customerMaterial.gloss.oneSide;
   obj.customerMaterial.gloss.bothSides =
    prices.customerMaterial.gloss.bothSides -
    disc.customerMaterial.gloss.bothSides;
   obj.customerMaterial.gloss.oneGlossSecondSemigloss =
    prices.customerMaterial.gloss.oneGlossSecondSemigloss -
    disc.customerMaterial.gloss.oneGlossSecondSemigloss;
   obj.customerMaterial.semiGloss.oneSide =
    prices.customerMaterial.semiGloss.oneSide -
    disc.customerMaterial.semiGloss.oneSide;
   obj.customerMaterial.semiGloss.bothSides =
    prices.customerMaterial.semiGloss.bothSides -
    disc.customerMaterial.semiGloss.bothSides;
   obj.customerMaterial.semiGloss.mordant =
    prices.customerMaterial.semiGloss.mordant -
    disc.customerMaterial.semiGloss.mordant;
   obj.customerMaterial.semiGloss.veneerColorless =
    prices.customerMaterial.semiGloss.veneerColorless -
    disc.customerMaterial.semiGloss.veneerColorless;
   obj.customerMaterial.milledElement =
    prices.customerMaterial.milledElement - disc.customerMaterial.milledElement;
   obj.customerMaterial.milledElementBothSides =
    prices.customerMaterial.milledElementBothSides -
    disc.customerMaterial.milledElementBothSides;

   obj.gloss.oneSide = prices.gloss.oneSide - disc.gloss.oneSide;
   obj.gloss.bothSides = prices.gloss.bothSides - disc.gloss.bothSides;
   obj.gloss.oneGlossSecondSemigloss =
    prices.gloss.oneGlossSecondSemigloss - disc.gloss.oneGlossSecondSemigloss;

   obj.semiGloss.oneSide = prices.semiGloss.oneSide - disc.semiGloss.oneSide;
   obj.semiGloss.bothSides =
    prices.semiGloss.bothSides - disc.semiGloss.bothSides;

   obj.chamfering = prices.chamfering - disc.chamfering;
   obj.backMilling = prices.backMilling - disc.backMilling;
   obj.hingeHole = prices.hingeHole - disc.hingeHole;
   obj.milledElement = prices.milledElement - disc.milledElement;
   obj.milledElementBothSides =
    prices.milledElementBothSides - disc.milledElementBothSides;
   obj.milledHandle = prices.milledHandle - disc.milledHandle;
   obj.milledPartHandle = prices.milledPartHandle - disc.milledPartHandle;
   obj.millingHandle = prices.millingHandle - disc.millingHandle;
   obj.paintHandle = prices.paintHandle - disc.paintHandle;
   obj.zobalHandle = prices.zobalHandle - disc.zobalHandle;

   setValues(obj);
  }
 }, [user, prices]);

 return (
  values && (
   <FullWidthPageTemplate title="Cennik">
    <Row justify="flex-start">
     <div>
      <Heading>Materiał BLOW</Heading>
      <div>
       <Row justify="flex-start">
        <StyledWrapper>
         <StyledH6>Połysk</StyledH6>
         <PriceInfo
          name="Gładki - Jednostronny"
          value={values.gloss.oneSide}
          unit="m2"
         />
         <PriceInfo
          name="Gładki - Dwustronny"
          value={values.gloss.bothSides}
          unit="m2"
         />
         <PriceInfo
          name="Gładki - P.połysk / L.półmat"
          value={values.gloss.oneGlossSecondSemigloss}
          unit="m2"
         />
         <StyledH6>Półmat/mat</StyledH6>
         <PriceInfo
          name="Gładki - Jednostronny"
          value={values.semiGloss.oneSide}
          unit="m2"
         />
         <PriceInfo
          name="Gładki - Dwustronny"
          value={values.semiGloss.bothSides}
          unit="m2"
         />
         <PriceInfo
          name="CNC - Jednostronny"
          value={values.milledElement}
          unit="m2"
         />
         <PriceInfo
          name="CNC - Dwustronny"
          value={values.milledElementBothSides}
          unit="m2"
         />
        </StyledWrapper>
        <StyledWrapper>
         <StyledH6>Obróbka elementów</StyledH6>
         <PriceInfo
          name="Frezowanie uchwytu + lak."
          value={values.milledHandle}
          unit="mb"
         />
         <PriceInfo
          name="Frezowanie uchwytu częściowego + lak."
          value={values.milledPartHandle}
          unit="szt"
         />
         <PriceInfo
          name="Frezowanie uchwytu"
          value={values.millingHandle}
          unit="mb"
         />
         <PriceInfo
          name="Frezowanie pod uchwyt zobal"
          value={values.zobalHandle}
          unit="mb"
         />
         <PriceInfo
          name="Otw. pod zawiasy."
          value={values.hingeHole}
          unit="szt"
         />
         <PriceInfo name="Gierowanie" value={values.chamfering} unit="mb" />
         <PriceInfo
          name="Frezowanie pod plecy"
          value={values.backMilling}
          unit="mb"
         />
         <StyledH6>Elementy o grubości >19mm</StyledH6>
         <PriceInfo name="22mm." value={'+' + values.board[22]} unit="m2" />
         <PriceInfo name="25mm." value={'+' + values.board[25]} unit="m2" />
         <PriceInfo name="28mm." value={'+' + values.board[28]} unit="m2" />
         <PriceInfo name="30mm." value={'+' + values.board[30]} unit="m2" />
         <PriceInfo name="38mm." value={'+' + values.board[38]} unit="m2" />
        </StyledWrapper>
       </Row>
      </div>
     </div>
     <StyledWrapper>
      <Heading>Materiał własny</Heading>
      <div>
       <StyledH6>Połysk</StyledH6>
       <PriceInfo
        name="Gładki - Jednostronny"
        value={values.customerMaterial.gloss.oneSide}
        unit="m2"
       />
       <PriceInfo
        name="Gładki - Dwustronny"
        value={values.customerMaterial.gloss.bothSides}
        unit="m2"
       />
       <PriceInfo
        name="Gładki - P.połysk / L.półmat"
        value={values.customerMaterial.gloss.oneGlossSecondSemigloss}
        unit="m2"
       />
       <StyledH6>Półmat/mat</StyledH6>
       <PriceInfo
        name="Gładki - Jednostronny"
        value={values.customerMaterial.semiGloss.oneSide}
        unit="m2"
       />
       <PriceInfo
        name="Gładki - Dwustronny"
        value={values.customerMaterial.semiGloss.bothSides}
        unit="m2"
       />
       <PriceInfo
        name="CNC - Jednostronny"
        value={values.customerMaterial.milledElement}
        unit="m2"
       />
       <PriceInfo
        name="CNC - Dwustronny"
        value={values.customerMaterial.milledElementBothSides}
        unit="m2"
       />
       <PriceInfo
        name="Fornir - Bejca + Bezbarwny"
        value={values.customerMaterial.semiGloss.mordant}
        unit="m2"
       />
       <PriceInfo
        name="Fornir - Bezbarwny"
        value={values.customerMaterial.semiGloss.veneerColorless}
        unit="m2"
       />
       <PriceInfo
        name="Lakierowanie uchwytu"
        value={values.paintHandle}
        unit="mb"
       />
      </div>
     </StyledWrapper>
    </Row>
   </FullWidthPageTemplate>
  )
 );
};

// UserPriceList.propTypes = {};

export default UserPriceList;
