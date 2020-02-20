import Axios from "axios";
const signal = Axios.CancelToken.source();

//======================
//UPDATE GLOBAL PRICES
//======================
export const updateGlobalPrices = async (prices, onEnd) => {
 try {
  const config = {
   headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(prices);

  await Axios.put("/api/prices/", body, config);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};

//======================
//UPDATE PAINT MAKERS
//======================
export const updatePaintMakers = async (PaintMakers, onEnd) => {
 try {
  const config = {
   headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(PaintMakers);

  await Axios.put("/api/settings/", body, config);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};

//======================
//UPDATE FINISH TERMS
//======================
export const updateFinishTerms = async (updateTerms, onEnd) => {
 try {
  const config = {
   headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(updateTerms);

  await Axios.put("/api/settings/", body, config);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};
