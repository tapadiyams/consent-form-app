import {
  GET_WEBSITE_CREDENTIALS,
  GET_EMPLOYEES,
  SET_LOADING_STATUS,
  GET_STONES,
  SET_EMPLOYEE,
  SET_EMPLOYEE_PERMISSION,
} from "../actions/actionType";

export const initState = {
  websiteCredentials: [],
  employee: null,
  permission: null,

  employees: [],
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
    case SET_EMPLOYEE:
      return {
        ...state,
        employee: action.employee,
      };

    case SET_EMPLOYEE_PERMISSION:
      return {
        ...state,
        permission: action.permission,
      };

    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.employeesPayload,
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
