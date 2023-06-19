import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import materialReducer from "./materialReducer";

const rootReducer = combineReducers({
  customerState: customerReducer,
  materialState: materialReducer,
});

export default rootReducer;
