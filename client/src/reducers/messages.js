import { GET_MESSAGES, GET_MESSAGES_ERROR } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
 switch (action.type) {
  case GET_MESSAGES: {
   return (state = action.value);
  }
  case GET_MESSAGES_ERROR: {
   return state;
  }
  default:
   return state;
 }
};
