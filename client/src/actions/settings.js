import {
 LOAD_GLOBAL_SETTINGS,
 LOAD_GLOBAL_SETTINGS_ERROR
} from "../actions/types";
import setAuthToken from "../helpers/setAuthToken";
import Axios from "axios";

//LOAD PRICES
export const loadGlobalSettings = (end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/settings/`, {
   cancelToken: cancel
  });
  // console.log(res);
  const paintMaker = {
   Gloss: res.data.paintGloss,
   Semigloss: res.data.paintSemigloss,
   Base: res.data.paintBase
  };
  const finishTerm = {
   dateVeneer: res.data.dateVeneer,
   dateMilling: res.data.dateMilling,
   dateGloss: res.data.dateGloss,
   dateSemigloss: res.data.dateSemigloss
  };
  dispatch({
   type: LOAD_GLOBAL_SETTINGS,
   paintMaker: paintMaker,
   finishTerm: finishTerm
  });
  // console.log(res.data);
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
   dispatch({ type: LOAD_GLOBAL_SETTINGS_ERROR });
  } else {
   console.log(err);
   dispatch({ type: LOAD_GLOBAL_SETTINGS_ERROR });
   end();
  }
 }
};
