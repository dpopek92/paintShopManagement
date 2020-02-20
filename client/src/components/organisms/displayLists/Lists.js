import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DisplayList from 'components/molecules/ordersList/dynamic/DisplayList';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  div {
    margin: 5px;
  }
`;

const Lists = ({ orders, positions }) => {
  //display
  const [surowka, setSurowka] = useState([]);
  const [podklad, setPodklad] = useState([]);
  const [szlifiernia, setSzlifiernia] = useState([]);
  const [lakiernia, setLakiernia] = useState([]);
  const [polernia, setPolernia] = useState([]);
  const [pakowanie, setPakowanie] = useState([]);

  //  console.log(szlifiernia);
  // SET ORDERS
  useEffect(() => {
    if (orders) {
      const surowka = orders.filter(item => {
        if (item.productionStatus && item.productionStatus.includes('Surówka'))
          return item;
        else return;
      });
      setSurowka(surowka);

      const podklad = orders.filter(item => {
        if (item.productionStatus && item.productionStatus.includes('Podkład'))
          return item;
        else return;
      });
      setPodklad(podklad);

      const szlifiernia = orders.filter(item => {
        if (
          item.productionStatus &&
          item.productionStatus.includes('Szlifiernia')
        )
          return item;
        else return;
      });
      setSzlifiernia(szlifiernia);

      const lakiernia = orders.filter(item => {
        if (
          item.productionStatus &&
          item.productionStatus.includes('Lakiernia')
        )
          return item;
        else return;
      });
      setLakiernia(lakiernia);

      const polernia = orders.filter(item => {
        if (item.productionStatus && item.productionStatus.includes('Polernia'))
          return item;
        else return;
      });
      setPolernia(polernia);

      const pakowanie = orders.filter(item => {
        if (
          item.productionStatus &&
          (item.productionStatus.includes('Pakowanie') ||
            item.productionStatus.includes('Zakończone'))
        )
          return item;
        else return;
      });
      setPakowanie(pakowanie);
    }
  }, [orders]);

  return (
    <StyledWrapper>
      {positions.Surówka && (
        <>
          <DisplayList orders={surowka} position="Surówka" />
        </>
      )}
      {positions.Podkład && (
        <>
          <DisplayList orders={podklad} position="Podkład" />
        </>
      )}
      {positions.Szlifiernia && (
        <>
          <DisplayList orders={szlifiernia} position="Szlifiernia" />
        </>
      )}
      {positions.Lakiernia && (
        <>
          <DisplayList orders={lakiernia} position="Lakiernia" />
        </>
      )}
      {positions.Polernia && (
        <>
          <DisplayList orders={polernia} position="Polernia" />
        </>
      )}
      {positions.Pakowanie && (
        <>
          <DisplayList orders={pakowanie} position="Pakowanie" />
        </>
      )}
    </StyledWrapper>
  );
};

Lists.propTypes = {
  orders: PropTypes.array,
  positions: PropTypes.object
};

export default Lists;
