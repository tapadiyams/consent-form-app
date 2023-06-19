import {
  IS_ADMIN,
  IS_EMPLOYEE,
  GET_EMPLOYEES,
  LOGGED_EMPLOYEE,
  GET_MATERIAL,
  SET_LOADING_STATUS,
} from "../actions/actionType";

export const initState = {
  materials: [],
  loading: false,
  isAdmin: false,
  isEmployee: false,
  employees: [],
  logged_employee: [],
};

const materialReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_ADMIN:
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    case IS_EMPLOYEE:
      return {
        ...state,
        isEmployee: action.isEmployee,
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
      };
    case LOGGED_EMPLOYEE:
      return {
        ...state,
        logged_employee: action.logged_employee,
      };

    case GET_MATERIAL:
      return {
        ...state,
        materials: action.payload,
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

export default materialReducer;
