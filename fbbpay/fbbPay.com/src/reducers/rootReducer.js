import { combineReducers } from "redux";
import getCartItems from "./getCartItems";

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    //makes the state undefined whenever the users logged outs
    state = undefined
  }
  return appReducer(state, action)
}

const appReducer = combineReducers({
  cartItems : getCartItems,
});

export default rootReducer;
