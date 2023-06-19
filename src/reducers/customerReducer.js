import { GET_CUSTOMERS, GET_SELECTIONS } from "../actions/actionType";

const INITIAL_STATE = {
  customers: [],
  selections: [],
};

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case GET_SELECTIONS:
      return {
        ...state,
        selections: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
