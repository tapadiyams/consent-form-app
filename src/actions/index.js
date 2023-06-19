import { auth } from "../firebase";
import db from "../firebase";
import {
  GET_EMPLOYEES,
  GET_MATERIAL,
  SET_LOADING_STATUS,
  GET_CUSTOMERS,
  GET_SELECTIONS,
} from "./actionType";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export function setUpRecaptha(number) {
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {},
    auth
  );
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getEmployees = (payload) => ({
  type: GET_EMPLOYEES,
  payload: payload,
});

export const getMaterials = (payload) => ({
  type: GET_MATERIAL,
  payload: payload,
});

export const getCustomers = (payload) => ({
  type: GET_CUSTOMERS,
  payload: payload,
});

export const getSelections = (payload) => ({
  type: GET_SELECTIONS,
  payload: payload,
});

// customer related actions
export function signUpAPI(payload) {
  return addCustomerAPI(payload);
}

export function addCustomerAPI(payload) {
  const {
    date,
    id,
    firstName,
    lastName,
    email,
    phone,
    // selectedAddress,
    fabricator,
    kitchen_and_bath,
    designer_or_architech,
  } = payload;

  return (dispatch) => {
    db.collection("customers").add({
      date: date,
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      // address: selectedAddress,
      fabricator: fabricator,
      kitchenandbath: kitchen_and_bath,
      designerorarchitech: designer_or_architech,
    });
  };
}

export function getCustomersListAPI() {
  return (dispatch) => {
    db.collection("customers")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        let payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getCustomers(payload));
      });
  };
}

export function addSelectionsAPI(payload) {
  const { customerId, category, option, size, lot, color } = payload;
  return (dispatch) => {
    db.collection("selection").add({
      customerId: customerId,
      selectedCategory: category,
      selectedOption: option,
      size: size,
      lot: lot,
      color: color,
    });
  };
}

export function getSelectionsAPI(payload) {
  return (dispatch) => {
    db.collection("selection")
      .where("customerId", "==", payload.customerId) // Use "=="
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        dispatch(getSelections(data));
      });
  };
}

// admin related actions
export function addEmployeeAPI(payload) {
  const { date, firstName, lastName, email, password, phone, selectedAddress } =
    payload;
  return (dispatch) => {
    db.collection("customer").add({
      date: date,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      address: selectedAddress,
    });
  };
}

export function addMaterialAPI(payload) {
  const { id, material, size, lot, color } = payload;
  return (dispatch) => {
    db.collection("customer").add({
      customerId: id,
      material: material,
      size: size,
      lot: lot,
      color: color,
    });
  };
}
