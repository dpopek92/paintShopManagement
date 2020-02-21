import React, { useEffect } from 'react';
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthTemplate from 'templates/FullWidthPageTemplate';
import Prices from 'components/organisms/settings/global/Prices';
import PaintMakers from 'components/organisms/settings/global/PaintMakers';
import Terms from 'components/organisms/settings/global/Terms';
import { setSpinner } from 'actions/view';
import { loadPrices } from 'actions/prices';
import { loadGlobalSettings } from 'actions/settings';
import { signal } from 'const/';

const GlobalSettings = () => {
 const dispatch = useDispatch();
 const globalPrices = useSelector(state => state.prices.globalPrices);
 const paintMakers = useSelector(state => state.settings.paintMaker);
 const finishTerms = useSelector(state => state.settings.finishTerm);

 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(loadPrices(() => dispatch(setSpinner(false)), signal.token));
  dispatch(loadGlobalSettings(() => dispatch(setSpinner(false)), signal.token));
 }, []);
 return (
  <PageTemplate>
   <FullWidthTemplate>
    <>
     {globalPrices && (
      <>
       <Heading>Cennik</Heading>
       <Prices />
       <hr />
      </>
     )}
     {paintMakers && (
      <>
       <Heading>Producenci lakierów</Heading>
       <PaintMakers />
       <hr />
      </>
     )}
     {finishTerms && (
      <div>
       <>
        <Heading>Terminy realizacji</Heading>
        <Terms />
       </>
      </div>
     )}
    </>
   </FullWidthTemplate>
  </PageTemplate>
 );
};

GlobalSettings.propTypes = {};

export default GlobalSettings;
