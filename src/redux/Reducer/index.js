import { combineReducers } from "redux";
import Cart from "./Cart";
import MainScreenReducer from "./MainScreenReducer";
import Auth from "./Auth";
import Wishlist from "./Wishlist";
import Home from "./Home";

const Reducers = combineReducers({
  mainScreenInit: MainScreenReducer,
  cart: Cart,
  auth: Auth,
  wishlist: Wishlist,
  Home: Home,
});

export default Reducers;
