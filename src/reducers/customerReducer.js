import {
  GET_CUSTOMERS,
  GET_DESIGNER_OR_ARCHITECT,
  GET_FABRICATOR,
  GET_KITCHEN_AND_BATH,
  GET_SELECTIONS,
} from "../actions/actionType";

const INITIAL_STATE = {
  customers: [],
  selections: [],
  fabricators: [],
  kitchenAndBath: [],
  designerOrArchitect: [],
};

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.customersPayload,
      };
    case GET_SELECTIONS:
      return {
        ...state,
        selections: action.selectionsPayload,
      };
    case GET_FABRICATOR:
      return {
        ...state,
        fabricator: action.fabricatorsPayload,
      };
    case GET_KITCHEN_AND_BATH:
      return {
        ...state,
        kitchenAndBath: action.kitchenAndBathPayload,
      };
    case GET_DESIGNER_OR_ARCHITECT:
      return {
        ...state,
        designerOrArchitect: action.designerOrArchitectPayload,
      };
    default:
      return state;
  }
};

export default customerReducer;
