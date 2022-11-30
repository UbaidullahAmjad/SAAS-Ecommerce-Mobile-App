import { types } from "./actionTypes";
import AsyncStorage from "@react-native-community/async-storage";

export function requestInit(user) {
  return {
    type: types.REQUEST_INIT,
    payload: {
      userAuth: user != null ? 1 : 0,
    },
  };
}

export function successInt(navigateScreen) {
  return {
    type: types.SUCCESS_INIT,
    payload: {
      navigateScreen,
    },
  };
}

export function addToCart(id, quantity) {
  return {
    type: types.ADD_TO_CART,
    payload: {
      id,
      quantity,
    },
  };
}

export function addToWishList(data) {
  return {
    type: types.ADD_TO_WISHLIST,
    payload: {
      data,
    },
  };
}

export function successCart(data) {
  return {
    type: types.SUCCESS_CART,
    payload: {
      cartData: data,
    },
  };
}

export function successWishlist(data) {
  return {
    type: types.SUCCESS_WISHLIST,
    payload: {
      wishlistData: data,
    },
  };
}

export function removeFromCart(id) {
  return {
    type: types.REMOVE_CART,
    payload: {
      id,
    },
  };
}

export function decrementQuantity(id) {
  return {
    type: types.DEREMENT_QUANTITY,
    payload: {
      id,
    },
  };
}

export function incrementQuantity(id) {
  return {
    type: types.INCREMENT_QUANTITY,
    payload: {
      id,
    },
  };
}

export function proceedCheckout() {
  return {
    type: types.PROCEED_CHECKOUT,
    payload: {},
  };
}

export function successCheckout() {
  return {
    type: types.SUCCESS_CHECKOUT,
    payload: {},
  };
}

export function authStatus(status) {
  return {
    type: types.AUTH_STATUS,
    payload: {
      status: status,
    },
  };
}

export function doLogin(data) {
  return {
    type: types.DO_LOGIN,
    payload: data,
  };
}

export function doLogout() {
  return {
    type: types.DO_LOGOUT,
    payload: {},
  };
}

export const requestCategoryData = () => ({
  type: types.REQUEST_CATEGORY_API_DATA,
});

export const receiveCategoryAPI = (data) => ({
  type: types.RECEIVE_CATEGORY_API_DATA,
  payload: data?.categories,
});

export const requestProductyData = () => ({
  type: types.REQUEST_PRODUCT_API_DATA,
});

export const receiveProductAPI = (data) => ({
  type: types.RECEIVE_PRODUCT_API_DATA,
  payload: data?.products,
});

export const requestCarouselData = () => ({
  type: types.REQUEST_CAROUSEL_API_DATA,
});

export const receiveCarouselAPI = (data) => ({
  type: types.RECEIVE_CAROUSEL_API_DATA,
  payload: data?.carousel,
});

export const requestRegisterUser = (data) => ({
  type: types.REQUEST_REGISTER_USER,
  payload: data,
});

export const receiveRegisterUser = (data) => ({
  type: types.RECEIVE_REGISTER_USER,
  payload: data,
});

export const receiveLoginUser = (data) => ({
  type: types.RECEIVE_LOGIN_USER,
  payload: data,
});

export const UpdateUserProfile = (data) => ({
  type: types.REQUEST_UPDATE_PROFILE,
  payload: data,
});

export const _couponData = (data) => ({
  type: types.REQUEST_COUPON_DATA,
  payload: data,
});

export const _RecievecouponData = (data) => ({
  type: types.RECEIVE_COUPON_DATA,
  payload: data,
});

export const _RemoveCouponData = () => ({
  type: types.REMOVE_COUPON_DATA,
  payload: null,
});

export const _RequestPlaceOrder = (data) => ({
  type: types.REQUEST_ORDER_PLACE,
  payload: data,
});

export const _ReceivePlaceOrder = (data) => ({
  type: types.RECEIVE_ORDER_PLACE,
  payload: data,
});

export const doLoginGuest = (data) => ({
  type: types.REQUEST_CONTINUE_AS_A_GUEST,
  payload: data,
});

export const _receiveGetOrders = (data) => ({
  type: types.RECEIVE_GET_ORDERS,
  payload: data,
});

export const _loadingState = (data) => ({
  type: types.LOADING_STATE,
  payload: data,
});

export const _loadingOrderSuccess = (data) => ({
  type: types.ORDER_SUCCESS_MODAL,
  payload: data,
});

export const RemoveLoadingOrderState = () => ({
  type: types.REMOVE_ORDER_LOADING_STATE,
  payload: null,
});
