import {
  GET_WEBSITE_CREDENTIALS,
  GET_EMPLOYEES,
  SET_LOADING_STATUS,
  GET_STONES,
  SET_EMPLOYEE,
} from "../actions/actionType";

export const initState = {
  websiteCredentials: [],
  employees: [],
  employee: {},
  stones: [],
  loading: false,
};

const stoneReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_WEBSITE_CREDENTIALS:
      return {
        ...state,
        websiteCredentials: action.websiteCredentials,
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.employeesPayload,
      };
    case SET_EMPLOYEE:
      return {
        ...state,
        employee: action.employeePayload,
      };
    case GET_STONES:
      return {
        ...state,
        stones: action.stonesPayload,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    default:
      return state;
  }
};

export default stoneReducer;
