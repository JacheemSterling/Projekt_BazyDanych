import { combineReducers } from "redux";
import drinkReducer from "./drinkReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  drinks: drinkReducer,
  comments: commentReducer,
});
