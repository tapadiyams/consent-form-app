import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import stoneReducer from "./stoneReducer";

const rootReducer = combineReducers({
  customerState: customerReducer,
  stoneState: stoneReducer,
});

export default rootReducer;
