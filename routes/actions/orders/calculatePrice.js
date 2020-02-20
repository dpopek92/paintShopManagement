//*
const calculatePrice = async (
  prices,
  discounts,
  backMilling,
  chamfering,
  orderType,
  veneerSymbol,
  color,
  paintType,
  paintStyle,
  handleSymbol1,
  handleSymbol2,
  milledHandle,
  milledPartHandle,
  hingesHoles,
  items
) => {
  let paintPrice = 0,
    handlePrice = 0,
    chamferingPrice = 0,
    backMillingPrice = 0,
    hingesHolesPrice = 0,
    price = 0;

  //POWIERZCHNIA
  let newItems = items.map((item, i) => {
    let itemPrice = 0;
    if (item.type === "Witryna") {
      //WITRYNA
      console.log(`${i}. Witryna = INDYWIDUALNIE`);
      item.includedToPrice = false;
      return item;
    } else if (orderType === "Reklamacja (wina BLOW)") {
      /**
   |--------------------------------------------------
   | REKLAMACJA DARMOWA
   |--------------------------------------------------
   */
      paintPrice += 0;
      console.log(`${i}. Reklamacja = ${itemPrice}`);
      item.includedToPrice = true;
      return item;
    } else if (
      orderType === "Materiał klienta" ||
      orderType === "Poprawa (wina klienta)"
    ) {
      /**
     |--------------------------------------------------
     | MATERIAŁ KLIENTA
     |--------------------------------------------------
     */
      if (veneerSymbol) {
        //FORNIR
        const surface = item.surfaceRight
          ? item.surfaceRight
          : item.surfaceLeft;
        if (item.type === "Gładki") {
          if (color.toLowerCase().includes("bejca")) {
            itemPrice =
              surface *
              (prices.customerMaterial.semiGloss.mordant -
                discounts.customerMaterial.semiGloss.mordant);
            console.log(
              `${i}. Materiał klienta - fornir - bejca = ${itemPrice}`
            );
          } else {
            itemPrice =
              surface *
              (prices.customerMaterial.semiGloss.veneerColorless -
                discounts.customerMaterial.semiGloss.veneerColorless);
            console.log(
              `${i}. Materiał klienta - fornir - bezbarwny = ${itemPrice}`
            );
          }
          paintPrice += itemPrice;
          item.includedToPrice = true;
          return item;
        }
      } else if (paintType === "Połysk") {
        //POŁYSK
        if (item.type !== "Gładki") {
          //-Frez
          item.includedToPrice = false;
          console.log(
            `${i}. Materiał klienta - Połysk - Frezowany = INDYWIDUALNIE`
          );
          return item;
        } else {
          //-Gładki

          if (
            (item.paintRight && !item.paintLeft) ||
            (!item.paintRight && item.paintLeft)
          ) {
            //--Jednostronny
            itemPrice =
              item.surfaceRight *
              (prices.customerMaterial.gloss.oneSide -
                discounts.customerMaterial.gloss.oneSide);
            console.log(
              `${i}. Materiał klienta - Połysk - Gładki - Jednostronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          } else if (item.paintRight && item.paintLeft) {
            //--Dwustronny
            if (paintStyle === "Prawa - połysk / Lewa - półmat") {
              itemPrice =
                item.surfaceLeft *
                (prices.customerMaterial.gloss.oneGlossSecondSemigloss -
                  discounts.customerMaterial.gloss.oneGlossSecondSemigloss);
              console.log(
                `${i}. Materiał klienta - Połysk - Gładki - P.Połysk/L.Półmat = ${itemPrice}`
              );
              paintPrice += itemPrice;
              item.includedToPrice = true;
              return item;
            } else {
              itemPrice =
                item.surfaceLeft *
                (prices.customerMaterial.gloss.bothSides -
                  discounts.customerMaterial.gloss.bothSides);
              console.log(
                `${i}. Materiał klienta - Połysk - Gładki - Dwustronny = ${itemPrice}`
              );
              paintPrice += itemPrice;
              item.includedToPrice = true;
              return item;
            }
          }
        }
      } else {
        //PÓŁMAT/MAT
        if (item.type !== "Gładki") {
          //-Frez
          if (
            (item.paintRight && !item.paintLeft) ||
            (!item.paintRight && item.paintLeft)
          ) {
            //--Jednostronny
            itemPrice =
              item.surfaceRight *
              (prices.customerMaterial.milledElement -
                discounts.customerMaterial.milledElement);
            console.log(
              `${i}. Materiał klienta - Półmat - Frez - Jednostronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          } else {
            //--Dwustronny
            itemPrice =
              item.surfaceLeft *
              (prices.customerMaterial.milledElementBothSides -
                discounts.customerMaterial.milledElementBothSides);
            console.log(
              `${i}. Materiał klienta - Półmat - Frez - Dwustronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          }
        } else {
          if (
            (item.paintRight && !item.paintLeft) ||
            (!item.paintRight && item.paintLeft)
          ) {
            //--Jednostronny
            itemPrice =
              item.surfaceRight *
              (prices.customerMaterial.semiGloss.oneSide -
                discounts.customerMaterial.semiGloss.oneSide);
            console.log(
              `${i}. Materiał klienta - Półmat - Gładki - Jednostronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          } else {
            //--Dwustronny
            itemPrice =
              item.surfaceLeft *
              (prices.customerMaterial.semiGloss.bothSides -
                discounts.customerMaterial.semiGloss.bothSides);
            console.log(
              `${i}. Materiał klienta - Półmat - Gładki - Dwustronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          }
        }
      }
    } else {
      /**
     |--------------------------------------------------
     | MATERIAŁ BLOW
     |--------------------------------------------------
     */
      if (paintType === "Połysk") {
        //POŁYSK
        if (item.type !== "Gładki") {
          //-Frez
          item.includedToPrice = false;
          console.log(
            `${i}. Materiał BLOW - Połysk - Frezowany = INDYWIDUALNIE`
          );
          return item;
        } else {
          //-Gładki

          if (
            (item.paintRight && !item.paintLeft) ||
            (!item.paintRight && item.paintLeft)
          ) {
            //--Jednostronny
            itemPrice =
              item.surfaceRight *
              (prices.gloss.oneSide +
                prices.board[item.thickness] -
                discounts.gloss.oneSide +
                discounts.board[item.thickness]);
            console.log(
              `${i}. Materiał BLOW - Połysk - Gładki - Jednostronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          } else if (item.paintRight && item.paintLeft) {
            //--Dwustronny
            if (paintStyle === "Prawa - połysk / Lewa - półmat") {
              itemPrice =
                item.surfaceLeft *
                (prices.gloss.oneGlossSecondSemigloss +
                  prices.board[item.thickness] -
                  discounts.gloss.oneGlossSecondSemigloss +
                  discounts.board[item.thickness]);
              console.log(
                `${i}. Materiał BLOW - Połysk - Gładki - P.Połysk/L.Półmat = ${itemPrice}`
              );
              paintPrice += itemPrice;
              item.includedToPrice = true;
              return item;
            } else {
              itemPrice =
                item.surfaceLeft *
                (prices.gloss.bothSides +
                  prices.board[item.thickness] -
                  discounts.gloss.bothSides +
                  discounts.board[item.thickness]);
              console.log(
                `${i}. Materiał BLOW - Połysk - Gładki - Dwustronny = ${itemPrice}`
              );
              paintPrice += itemPrice;
              item.includedToPrice = true;
              return item;
            }
          }
        }
      } else {
        //PÓŁMAT/MAT
        if (item.type !== "Gładki") {
          //-Frez
          if (
            (item.paintRight && !item.paintLeft) ||
            (!item.paintRight && item.paintLeft)
          ) {
            //--Jednostronny
            itemPrice =
              item.surfaceRight *
              (prices.milledElement +
                prices.board[item.thickness] -
                discounts.milledElement +
                discounts.board[item.thickness]);
            console.log(
              `${i}. Materiał BLOW - Półmat - Frez - Jednostronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          } else {
            //--Dwustronny
            itemPrice =
              item.surfaceLeft *
              (prices.milledElementBothSides +
                prices.board[item.thickness] -
                discounts.milledElementBothSides +
                discounts.board[item.thickness]);
            console.log(
              `${i}. Materiał BLOW - Półmat - Frez - Dwustronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          }
        } else {
          if (
            (item.paintRight && !item.paintLeft) ||
            (!item.paintRight && item.paintLeft)
          ) {
            //--Jednostronny
            itemPrice =
              item.surfaceRight *
              (prices.semiGloss.oneSide +
                prices.board[item.thickness] -
                discounts.semiGloss.oneSide +
                discounts.board[item.thickness]);
            console.log(
              `${i}. Materiał BLOW - Półmat - Gładki - Jednostronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          } else {
            //--Dwustronny
            itemPrice =
              item.surfaceLeft *
              (prices.semiGloss.bothSides +
                prices.board[item.thickness] -
                discounts.semiGloss.bothSides +
                discounts.board[item.thickness]);
            console.log(
              `${i}. Materiał BLOW - Półmat - Gładki - Dwustronny = ${itemPrice}`
            );
            paintPrice += itemPrice;
            item.includedToPrice = true;
            return item;
          }
        }
      }
    }

    item.includedToPrice = false;
    console.log(`${i} - ???????? = INDYWIDUALNIE`);
    return item;
  });

  console.log("######### CENA LAKIEROWANIA = " + paintPrice);
  //OTWORY POD ZWIASY
  hingesHolesPrice = hingesHoles * (prices.hingeHole - discounts.hingeHole);
  console.log("######### CENA NAWIERCANIA  = " + hingesHolesPrice);
  //UCHWYTY
  if (handleSymbol1 === "UZ" || handleSymbol2 === "UZ") {
    handlePrice += milledHandle * (prices.zobalHandle - discounts.zobalHandle);
  } else if (
    orderType === "Materiał klienta" ||
    orderType === "Poprawa (wina klienta)"
  ) {
    handlePrice += milledHandle * prices.paintHandle;
    if (milledPartHandle) {
      handlePrice += milledPartHandle * 30;
    }
  } else {
    handlePrice +=
      milledHandle * (prices.milledHandle - discounts.milledHandle);
    if (milledPartHandle) {
      handlePrice +=
        milledPartHandle *
        (prices.milledPartHandle - discounts.milledPartHandle);
    }
  }
  console.log("######### CENA UCHWYTÓW     = " + handlePrice);

  //FREZOWANIE POD PLECY
  if (chamfering) {
    chamferingPrice += chamfering * (prices.chamfering - discounts.chamfering);
    console.log("######### CENA GIEROWANIA     = " + chamferingPrice);
  }
  //GIEROWANIE
  if (backMilling) {
    backMillingPrice +=
      backMilling * (prices.backMilling - discounts.backMilling);
    console.log(
      "######### CENA FREZOWANIA POD PLECY     = " + backMillingPrice
    );
  }
  //PODSUMOWANIE
  price =
    paintPrice +
    hingesHolesPrice +
    handlePrice +
    chamferingPrice +
    backMillingPrice;
  if (orderType === "Reklamacja (wina BLOW)") {
    price = 0;
  } else if (
    orderType === "Materiał klienta" ||
    orderType === "Poprawa (wina klienta)"
  ) {
    if (paintType === "Połysk") {
      if (
        paintStyle === "Jednostronne" &&
        price <
          prices.customerMaterial.gloss.oneSide -
            discounts.customerMaterial.gloss.oneSide
      )
        price =
          prices.customerMaterial.gloss.oneSide -
          discounts.customerMaterial.gloss.oneSide;
      else if (
        paintStyle === "Dwustronne" &&
        price <
          prices.customerMaterial.gloss.bothSides -
            discounts.customerMaterial.gloss.bothSides
      )
        price =
          prices.customerMaterial.gloss.bothSides -
          discounts.customerMaterial.gloss.bothSides;
      else if (
        paintStyle === "Prawa - połysk / Lewa - półmat" &&
        price <
          prices.customerMaterial.gloss.oneGlossSecondSemigloss -
            discounts.customerMaterial.gloss.oneGlossSecondSemigloss
      )
        price =
          prices.customerMaterial.gloss.oneGlossSecondSemigloss -
          discounts.customerMaterial.gloss.oneGlossSecondSemigloss;
    } else if (paintType === "Mat" || paintType === "Półmat") {
      if (
        paintStyle === "Jednostronne" &&
        price <
          prices.customerMaterial.semiGloss.oneSide -
            discounts.customerMaterial.semiGloss.oneSide
      )
        price =
          prices.customerMaterial.semiGloss.oneSide -
          discounts.customerMaterial.semiGloss.oneSide;
      else if (
        paintStyle === "Dwustronne" &&
        price <
          prices.customerMaterial.semiGloss.bothSides -
            discounts.customerMaterial.semiGloss.bothSides
      )
        price =
          prices.customerMaterial.semiGloss.bothSides -
          discounts.customerMaterial.semiGloss.bothSides;
    }
  } else {
    if (paintType === "Połysk") {
      if (
        paintStyle === "Jednostronne" &&
        price < prices.gloss.oneSide - discounts.gloss.oneSide
      )
        price = prices.gloss.oneSide - discounts.gloss.oneSide;
      else if (
        paintStyle === "Dwustronne" &&
        price < prices.gloss.bothSides - discounts.gloss.bothSides
      )
        price = prices.gloss.bothSides - discounts.gloss.bothSides;
      else if (
        paintStyle === "Prawa - połysk / Lewa - półmat" &&
        price <
          prices.gloss.oneGlossSecondSemigloss -
            discounts.gloss.oneGlossSecondSemigloss
      )
        price =
          prices.gloss.oneGlossSecondSemigloss -
          discounts.gloss.oneGlossSecondSemigloss;
    } else if (paintType === "Mat" || paintType === "Półmat") {
      if (
        paintStyle === "Jednostronne" &&
        price < prices.semiGloss.oneSide - discounts.semiGloss.oneSide
      )
        price = prices.semiGloss.oneSide - discounts.semiGloss.oneSide;
      else if (
        paintStyle === "Dwustronne" &&
        price < prices.semiGloss.bothSides - discounts.semiGloss.bothSides
      )
        price = prices.semiGloss.bothSides - discounts.semiGloss.bothSides;
    }
  }
  console.log(`Cena: ${price}`);

  return { price, items: newItems };
};

module.exports = { calculatePrice };
