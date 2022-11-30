import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  cartCount: 0,
  cartData: [],
  CouponData: null,
  OrderPlace: null,
};
export default (state = initialState, action) => {
  const { payload } = action;
  logfunction("PAYLOAD IN REDUCER ", payload);
  switch (action.type) {
    case types.SUCCESS_CART:
      return {
        ...state,
        cartCount: payload.cartData.totalCount,
        cartData: payload.cartData.cartProducts,
      };
    case types.SUCCESS_CHECKOUT:
      return {
        ...state,
        cartCount: 0,
        cartData: [],
      };
    case types.RECEIVE_COUPON_DATA:
      return {
        ...state,
        CouponData: payload,
      };
    case types.RECEIVE_ORDER_PLACE:
      return {
        ...state,
        OrderPlace: payload,
      };
    default:
      return state;
  }
};
