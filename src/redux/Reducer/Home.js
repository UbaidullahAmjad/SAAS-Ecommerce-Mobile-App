import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  category_Data: [],
  product_Data: [],
  carousel_Data: [],
  loadingState: false,
  OrderSuccessModal: false,
};

export default (state = initialState, action) => {
  const { payload } = action;
  logfunction("PAYLOAD IN REDUCER AUTH", payload);
  switch (action.type) {
    case types.RECEIVE_CATEGORY_API_DATA:
      return {
        ...state,
        category_Data: payload,
      };
    case types.RECEIVE_PRODUCT_API_DATA:
      return {
        ...state,
        product_Data: payload,
      };
    case types.RECEIVE_CAROUSEL_API_DATA:
      return {
        ...state,
        carousel_Data: payload,
      };
    case types.LOADING_STATE:
      return {
        ...state,
        loadingState: payload,
      };
    case types.ORDER_SUCCESS_MODAL:
      return {
        ...state,
        OrderSuccessModal: payload,
      };
    default:
      return state;
  }
};
