import {
  call,
  put,
  putResolve,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { types } from "@actions/actionTypes";
import {
  successInt,
  successCart,
  successCheckout,
  authStatus,
  successWishlist,
} from "@actions";
import AsyncStorage from "@react-native-community/async-storage";
import { logfunction, _getLocalCart } from "@helpers/FunctionHelper";
import getDataService from "../Api/getApi";
import {
  receiveCarouselAPI,
  receiveCategoryAPI,
  receiveLoginUser,
  receiveProductAPI,
  receiveRegisterUser,
  _loadingOrderSuccess,
  _loadingState,
  _receiveGetOrders,
  _ReceivePlaceOrder,
  _RecievecouponData,
} from "../Action/general";
import { ToastAndroid } from "react-native";

export function* watchGeneralRequest() {
  yield takeEvery(types.REQUEST_CATEGORY_API_DATA, getCategoryAPIData);
  yield takeEvery(types.REQUEST_PRODUCT_API_DATA, getProductAPIData);
  yield takeEvery(types.REQUEST_CAROUSEL_API_DATA, getCarouselAPIData);
  yield takeEvery(types.REQUEST_REGISTER_USER, resgiterUser);
  yield takeEvery(types.REQUEST_UPDATE_PROFILE, UpdateProfile);
  yield takeEvery(types.REQUEST_COUPON_DATA, couponData);
  yield takeEvery(types.REMOVE_COUPON_DATA, _removeCouponData);
  yield takeEvery(types.REQUEST_ORDER_PLACE, _requestOrder);
  yield takeEvery(types.REQUEST_CONTINUE_AS_A_GUEST, guestLogin);
  yield takeEvery(types.REMOVE_ORDER_LOADING_STATE, removeOrderState);

  yield takeEvery(types.REQUEST_INIT, requestInit);
  yield takeEvery(types.ADD_TO_CART, addToCart);
  yield takeEvery(types.ADD_TO_WISHLIST, addToWishlist);
  yield takeEvery(types.REMOVE_CART, removeFromCart);
  yield takeEvery(types.INCREMENT_QUANTITY, incrementQuantity);
  yield takeEvery(types.DEREMENT_QUANTITY, decrementQuantity);
  yield takeEvery(types.PROCEED_CHECKOUT, proceedCheckout);
  yield takeEvery(types.DO_LOGIN, doLogin);
  yield takeEvery(types.DO_LOGOUT, doLogout);
}

function* requestInit(action) {
  try {
    // ************** If you want to login based home page then do stuff here ****************

    // if (action.payload.userAuth) {
    //     yield put(successInt('HomeScreen'));
    // }
    // else {
    //     yield put(successInt('LoginScreen'));
    // }

    // ************** Else here ****************

    //AsyncStorage.removeItem('IS_AUTH');

    //cart count set
    let getLocalCart = yield call(AsyncStorage.getItem, "CART_DATA");
    logfunction("LOCAL CART  ", JSON.parse(getLocalCart));
    getLocalCart = JSON.parse(getLocalCart);
    if (getLocalCart) {
      yield put(successCart(getLocalCart));
    }

    //get local login data
    let getAuth = yield call(AsyncStorage.getItem, "IS_AUTH");
    logfunction("IS LODDED ", getAuth);
    if (getAuth == 1) {
      yield put(authStatus(true));
    } else {
      yield put(authStatus(false));
    }

    let getAuthLogin = yield call(AsyncStorage.getItem, "IS_AUTH_LOGIN_USER");
    getAuthLogin = JSON.parse(getAuthLogin);
    console.log("Async Storage Login Data: ", getAuthLogin);
    if (getAuthLogin) {
      yield put(receiveLoginUser(getAuthLogin));
    }

    yield put(successInt("MainScreen"));

    let GteAllOrders = yield call(AsyncStorage.getItem, "All_Orders");
    GteAllOrders = JSON.parse(GteAllOrders);
    console.log("All_Orders: ", GteAllOrders);
    if (GteAllOrders) {
      yield put(_receiveGetOrders(GteAllOrders));
    }

    //Wishlist count set
    let getLocalWishlist = yield call(
      AsyncStorage.getItem,
      "GET_LOCAL_WISHLIST"
    );
    logfunction("LOCAL Wishlist  ", JSON.parse(getLocalWishlist));
    getLocalWishlist = JSON.parse(getLocalWishlist);
    if (getLocalWishlist) {
      let wishData = {
        totalCount: getLocalWishlist.length,
        wishlistData: getLocalWishlist,
      };
      yield put(successWishlist(wishData));
    }
  } catch (e) {
    logfunction(e);
  }
}

function* addToCart(action) {
  try {
    const { payload } = action;
    logfunction("Payload ==", payload);
    //
    let getLocalCart = yield call(AsyncStorage.getItem, "CART_DATA");
    logfunction("LOCAL CART  ", JSON.parse(getLocalCart));
    getLocalCart = JSON.parse(getLocalCart);
    if (getLocalCart != null) {
      // let findProduct = getLocalCart.cartProducts.filter(item => item.product_id.indexOf(payload.id) > -1);
      let findProductIndex = getLocalCart.cartProducts.findIndex(
        (item) => item.product_id === payload.id
      );
      let storeProducts = getLocalCart.cartProducts;
      if (findProductIndex > -1) {
        let quantity = parseInt(
          getLocalCart.cartProducts[findProductIndex].quantity
        );
        logfunction("QTY", quantity);
        getLocalCart.cartProducts.splice(findProductIndex, 1);
        storeProducts.push({
          product_id: payload.id,
          quantity: quantity + payload.quantity,
        });
      } else {
        storeProducts.push({
          product_id: payload.id,
          quantity: payload.quantity,
        });
      }
      let totalQty = parseInt(getLocalCart.totalCount);
      logfunction("TOTAL ", totalQty);
      let storeArr = {
        cartProducts: storeProducts,
        totalCount: totalQty + payload.quantity,
      };
      logfunction("FINAL ARRR ", storeArr);
      AsyncStorage.setItem("CART_DATA", JSON.stringify(storeArr));
      yield put(successCart(storeArr));
    } else {
      let storeArr = {
        cartProducts: [{ product_id: payload.id, quantity: payload.quantity }],
        totalCount: payload.quantity,
      };
      logfunction("storeArr ", storeArr);
      AsyncStorage.setItem("CART_DATA", JSON.stringify(storeArr));
      yield put(successCart(storeArr));
    }
  } catch (e) {
    logfunction("ERROR =", e);
  }
}

function* removeFromCart(action) {
  try {
    const { payload } = action;
    let newArr = [];
    let getLocalCart = yield call(AsyncStorage.getItem, "CART_DATA");
    getLocalCart = JSON.parse(getLocalCart);
    let finalCount = getLocalCart.totalCount;
    logfunction("finalCount", finalCount);
    logfunction("getLocalCart", getLocalCart);
    getLocalCart.cartProducts.forEach(function (item, index) {
      if (item.product_id != payload.id) {
        newArr.push(item);
      } else {
        finalCount -= item.quantity;
        logfunction("ITEM TO DEELTE", item);
      }
    });

    logfunction("QUANTITY ", finalCount);

    logfunction("NEW ARRR", newArr);
    let storeArr = { cartProducts: newArr, totalCount: finalCount };
    logfunction("ARR TO STORE ", storeArr);
    AsyncStorage.setItem("CART_DATA", JSON.stringify(storeArr));
    yield put(successCart(storeArr));
  } catch (e) {
    logfunction("ERROR =", e);
  }
}

function* incrementQuantity(action) {
  try {
    const { payload } = action;
    let newArr = [];
    let getLocalCart = yield call(AsyncStorage.getItem, "CART_DATA");
    getLocalCart = JSON.parse(getLocalCart);
    let finalCount = getLocalCart.totalCount;
    logfunction("finalCount", finalCount);
    logfunction("getLocalCart", getLocalCart);

    // let findProduct = getLocalCart.cartProducts.filter(
    //   (item) => item.product_id.indexOf(payload.id) > -1
    // );
    // let findProduct = getLocalCart.cartProducts.filter(
    //   (item) => item.product_id == payload.id
    // );

    let findProductIndex = getLocalCart.cartProducts.findIndex(
      (item) => item.product_id === payload.id
    );

    getLocalCart.cartProducts[findProductIndex].quantity =
      getLocalCart.cartProducts[findProductIndex].quantity + 1;

    // getLocalCart.cartProducts.push({
    //   product_id: findProduct[0].product_id,
    //   quantity: parseInt(findProduct[0].quantity) + 1,
    // });
    // getLocalCart.cartProducts.splice(findProductIndex, 1);

    let storeArr = {
      cartProducts: getLocalCart.cartProducts,
      totalCount: finalCount + 1,
    };

    logfunction("ARR TO STORE ", storeArr);
    AsyncStorage.setItem("CART_DATA", JSON.stringify(storeArr));
    yield put(successCart(storeArr));
  } catch (e) {
    logfunction("ERROR =", e);
  }
}

function* decrementQuantity(action) {
  try {
    const { payload } = action;
    let newArr = [];
    let getLocalCart = yield call(AsyncStorage.getItem, "CART_DATA");
    getLocalCart = JSON.parse(getLocalCart);
    let finalCount = getLocalCart.totalCount;
    logfunction("finalCount", finalCount);
    logfunction("getLocalCart", getLocalCart);

    // let findProduct = getLocalCart.cartProducts.filter(
    //   (item) =>{
    //     console.log("item", item);
    //     console.log("payload", payload);
    //     item.product_id.indexOf(payload.id) > -1
    //   }
    // );

    // let findProduct = getLocalCart.cartProducts.filter(
    //   (item) => item.product_id == payload.id
    // );

    let findProductIndex = getLocalCart.cartProducts.findIndex(
      (item) => item.product_id === payload.id
    );

    getLocalCart.cartProducts[findProductIndex].quantity =
      getLocalCart.cartProducts[findProductIndex].quantity - 1;

    // getLocalCart.cartProducts.push({
    //   product_id: findProduct[0].product_id,
    //   quantity: parseInt(findProduct[0].quantity) - 1,
    // });
    // getLocalCart.cartProducts.splice(findProductIndex, 1);

    let storeArr = {
      cartProducts: getLocalCart.cartProducts,
      totalCount: finalCount - 1,
    };

    logfunction("ARR TO STORE ", storeArr);
    AsyncStorage.setItem("CART_DATA", JSON.stringify(storeArr));
    yield put(successCart(storeArr));
  } catch (e) {
    logfunction("ERROR =", e);
  }
}

function* proceedCheckout(action) {
  try {
    AsyncStorage.removeItem("CART_DATA");
    yield put(successCheckout());
  } catch (e) {
    logfunction("ERROR =", e);
  }
}

function* addToWishlist(action) {
  try {
    let wishData = {
      totalCount: action.payload.data.length,
      wishlistData: action.payload.data,
    };
    yield put(successWishlist(wishData));
  } catch (e) {
    logfunction("ERROR =", e);
  }
}

function* doLogin(action) {
  try {
    yield put(_loadingState(true));

    const { payload } = action;
    console.log("Login User Payload: ", payload);

    const data = yield call(
      getDataService.jsonpostData,
      "signin-pagee",
      payload
    );

    console.log("******Login User After API Call************", data?.data);

    if (data.success == true) {
      yield put(receiveLoginUser(data?.data));
      AsyncStorage.setItem("IS_AUTH_LOGIN_USER", JSON.stringify(data?.data));
      AsyncStorage.setItem("IS_AUTH", "1");
      yield put(authStatus(true));
      yield put(_loadingState(false));

      const data1 = yield call(
        getDataService.getDataCoupon,
        `userdashboard?user_id=${data?.data?.id}`
      );

      console.log("******Order Data After API Call************", data1);

      if (data1.success == true) {
        yield put(_receiveGetOrders(data1));
        AsyncStorage.setItem("All_Orders", JSON.stringify(data1));

        ToastAndroid.show(data1.message, ToastAndroid.LONG);
      } else {
        yield put(_receiveGetOrders(null));
        ToastAndroid.show(data1.message, ToastAndroid.LONG);
      }
    } else {
      yield put(_loadingState(false));
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
  } catch (e) {
    yield put(_loadingState(false));
    logfunction("ERROR =", e);
  }
}

function* UpdateProfile(action) {
  try {
    yield put(_loadingState(true));
    const { payload } = action;
    console.log("Update User Payload: ", payload);

    const data = yield call(getDataService.jsonpostData, "proff", payload);

    console.log("********Update Profile After API Call**********", data);

    if (data.success == "true") {
      yield put(receiveLoginUser(null));
      AsyncStorage.removeItem("IS_AUTH_LOGIN_USER");
      ToastAndroid.show(data.message, ToastAndroid.LONG);
      yield put(_loadingState(false));

      yield put(receiveLoginUser(data?.user));
      AsyncStorage.setItem("IS_AUTH_LOGIN_USER", JSON.stringify(data?.user));
    } else {
      yield put(_loadingState(false));
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
  } catch (e) {
    yield put(_loadingState(false));
    logfunction("ERROR =", e);
  }
}

function* doLogout(action) {
  try {
    yield put(_loadingState(true));
    const { payload } = action;
    AsyncStorage.removeItem("IS_AUTH");
    yield put(authStatus(false));
    yield put(_loadingState(false));
  } catch (e) {
    logfunction("ERROR =", e);
    yield put(_loadingState(false));
  }
}

function* getCategoryAPIData(action) {
  try {
    const data = yield call(getDataService.getData, "get_category");
    yield put(receiveCategoryAPI(data));
  } catch (error) {
    console.log("Category API error: ", error);
  }
}

function* getProductAPIData(action) {
  try {
    const data = yield call(getDataService.getData, "products");
    yield put(receiveProductAPI(data));
  } catch (error) {
    console.log("Product API error: ", error);
  }
}

function* getCarouselAPIData(action) {
  try {
    const data = yield call(getDataService.getData, "carousel_setting");
    yield put(receiveCarouselAPI(data));
  } catch (error) {
    console.log("Carousel API error: ", error);
  }
}

function* resgiterUser(action) {
  try {
    yield put(_loadingState(true));
    const { payload } = action;
    console.log("User Regitser Payload", payload);

    const data = yield call(
      getDataService.jsonpostData,
      "signup-pagee",
      payload
    );

    console.log(
      "*******************User Regitser After API Call*******************",
      data
    );

    if (data.success == true) {
      yield put(receiveRegisterUser(data?.data));
      yield put(receiveLoginUser(data?.data));
      AsyncStorage.setItem("IS_AUTH_LOGIN_USER", JSON.stringify(data?.data));
      AsyncStorage.setItem("IS_AUTH", "1");
      yield put(authStatus(true));
      yield put(_loadingState(false));

      ToastAndroid.show(data?.message, ToastAndroid.LONG);
    } else {
      yield put(_loadingState(false));
      ToastAndroid.show(data?.data, ToastAndroid.LONG);
    }
  } catch (error) {
    yield put(_loadingState(false));
    console.log("resgiter error: ", error);
  }
}

function* couponData(action) {
  try {
    yield put(_loadingState(true));
    const { payload } = action;
    console.log("coupon Payload", payload);

    const data = yield call(
      getDataService.getDataCoupon,
      `checkcoupon?coupon=${payload}`
    );

    console.log("coupon After API Call", data);

    if (data.code == "1") {
      yield put(_RecievecouponData(data));
      yield put(_loadingState(false));
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    } else {
      yield put(_loadingState(false));
      yield put(_RecievecouponData(null));
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
  } catch (error) {
    yield put(_loadingState(false));
    console.log("Coupon Data error: ", error);
  }
}

function* _removeCouponData() {
  try {
    yield put(_RecievecouponData(null));
  } catch (error) {
    console.log("Remove Coupon Data error: ", error);
  }
}

function* _requestOrder(action) {
  try {
    yield put(_loadingState(true));
    const { payload } = action;
    console.log("Place Order Payload", payload);

    const data = yield call(
      getDataService.jsonpostData,
      "placeorder",
      payload.data
    );

    console.log("************Place Order After API Call************", data);

    if (data.success == true) {
      yield put(_ReceivePlaceOrder(data));
      yield put(_loadingState(false));
      AsyncStorage.removeItem("CART_DATA");
      yield put(successCheckout());
      yield put(_RecievecouponData(null));
      yield put(_loadingOrderSuccess(true));

      if (payload.Login_id != null) {
        const data1 = yield call(
          getDataService.getDataCoupon,
          `userdashboard?user_id=${payload.Login_id}`
        );
        if (data1.success == true) {
          yield put(_receiveGetOrders(null));
          AsyncStorage.removeItem("All_Orders");
          ToastAndroid.show(data1.message, ToastAndroid.LONG);
          yield put(_receiveGetOrders(data1));
          AsyncStorage.setItem("All_Orders", JSON.stringify(data1));
        } else {
          yield put(_receiveGetOrders(null));
          ToastAndroid.show(data1.message, ToastAndroid.LONG);
        }
      }

      ToastAndroid.show(data.message, ToastAndroid.LONG);
    } else {
      yield put(_loadingState(false));
      yield put(_ReceivePlaceOrder(null));
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
  } catch (error) {
    yield put(_loadingState(false));
    console.log("Place Order Request error: ", error);
  }
}

function* guestLogin(action) {
  try {
    yield put(_loadingState(true));

    const { payload } = action;
    console.log("Guest Login User: ", payload);

    yield put(receiveLoginUser(payload));
    AsyncStorage.setItem("IS_AUTH_LOGIN_USER", JSON.stringify(payload));
    AsyncStorage.setItem("IS_AUTH", "1");
    yield put(authStatus(true));
    yield put(_loadingState(false));
  } catch (e) {
    yield put(_loadingState(false));
    logfunction("ERROR =", e);
  }
}

function* removeOrderState(action) {
  try {
    yield put(_loadingOrderSuccess(false));
  } catch (e) {
    yield put(_loadingState(false));
    logfunction("ERROR =", e);
  }
}
