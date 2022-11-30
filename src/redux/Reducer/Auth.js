import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  authStatus: false,
  registerUser: null,
  LoginUser: null,
  OrderList: null,
};
export default (state = initialState, action) => {
  const { payload } = action;
  console.log("PAYLOAD IN REDUCER AUTH", payload);
  switch (action.type) {
    case types.AUTH_STATUS:
      return {
        ...state,
        authStatus: payload.status,
      };
    case types.RECEIVE_REGISTER_USER:
      return {
        ...state,
        registerUser: payload,
      };
    case types.RECEIVE_LOGIN_USER:
      return {
        ...state,
        LoginUser: payload,
      };
    case types.RECEIVE_GET_ORDERS:
      return {
        ...state,
        OrderList: payload,
      };
    default:
      return state;
  }
};
