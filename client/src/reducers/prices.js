import { LOAD_PRICES, LOAD_PRICES_ERROR } from "../actions/types";

const initialState = {
 globalPrices: null
};

export default (state = initialState, action) => {
 switch (action.type) {
  case LOAD_PRICES:
   return {
    ...state,
    globalPrices: action.prices
   };
  case LOAD_PRICES_ERROR:
   return { ...state, globalPrices: null };

  default:
   return state;
 }
};
