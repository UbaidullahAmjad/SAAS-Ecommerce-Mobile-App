import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Input, Button } from "native-base";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  CartView,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  _couponData,
  _RemoveCouponData,
} from "@actions";
import ProductListDummy from "@component/items/ProductListDummy";
import Icon from "react-native-vector-icons/Ionicons";
import Fonts from "@helpers/Fonts";
import axios from "axios";
import { API_URL } from "@common/config";

function CheckoutScreen(props) {
  const [state, setState] = React.useState({
    loading: true,
    cartArr: [],
    cartProducts: [],
    sumAmount: 0,
    isApplied: false,
    validCode: false,
    couponCode: props?.CouponData?.coupon?.code
      ? props?.CouponData?.coupon?.code
      : null,
    noRecord: false,
    coupon: null,
  });

  const applyCouponCode = async () => {
    const { couponCode } = state;
    await props._couponData(couponCode);

    // if (couponCode != null) {
    //   if (couponValue.code == "1" && couponCode == couponValue.coupon.code) {
    //     console.log("Right Coupon");
    //     calculateCart();
    //     setState({
    //       ...state,
    //       isApplied: true,
    //       validCode: true,
    //       coupon: couponValue,
    //     });
    //   } else {
    //     console.log("Wrong");
    //     setState({
    //       ...state,
    //       isApplied: true,
    //       validCode: false,
    //       coupon: couponValue,
    //     });
    //   }
    // } else {
    //   setState({ ...state, isApplied: true, validCode: false });
    // }
  };

  const onDeleteItem = (id) => {
    props.removeFromCart(id);
  };

  const decrement = (id) => {
    if (props.cartCount > 0) {
      props.decrementQuantity(id);
    }
  };

  const increment = (id) => {
    if (props.cartCount > 0) {
      props.incrementQuantity(id);
    }
  };

  const calculateCart = async () => {
    const { cartData, product_Data } = props;

    let cartItems = [];
    let sumAmount = 0;

    //find and create array
    cartData &&
      cartData.length > 0 &&
      (await cartData.map(async (item, index) => {
        let findedProduct = await product_Data.filter(
          (product) => product?.id == item.product_id
        );

        cartItems.push({
          quantity: item?.quantity,
          name: findedProduct[0]?.name_fr,
          price: findedProduct[0]?.price_euro,
          image: findedProduct[0]?.image,
          id: findedProduct[0]?.id,
        });

        let amt = parseFloat(findedProduct[0].price_euro);
        sumAmount += amt * item?.quantity;
      }));

    // if (props?.CouponData != null) {
    //   if (props?.CouponData?.coupon?.symbol == "%") {
    //     sumAmount = (sumAmount / 100) * props?.CouponData?.coupon?.amount;
    //   } else {
    //     sumAmount =
    //       parseFloat(sumAmount) - parseFloat(props?.CouponData?.coupon?.amount);
    //   }
    // } else {
    //   sumAmount = parseFloat(sumAmount) - 0;
    // }

    setState({
      ...state,
      noRecord: cartData.length > 0 ? false : true,
      loading: false,
      cartProducts: cartItems,
      sumAmount: sumAmount.toFixed(2),
    });
  };

  //   const calculateCart = () => {
  //     const { cartData, product_Data } = props;

  //     console.log(cartData);

  //     product_Data.fil

  //     // let cartItems = [];
  //     // let sumAmount = 0;

  //     // //find and create array
  //     // cartProducts && cartProducts.length > 0 && cartProducts.forEach(function (item, index) {
  //     //     let findedProduct = ProductListDummy.filter(product => product.id == item.product_id);
  //     //     cartItems.push({
  //     //         quantity: item.quantity,
  //     //         name: findedProduct[0].name,
  //     //         price: findedProduct[0].price,
  //     //         image: findedProduct[0].image,
  //     //         id: findedProduct[0].id
  //     //     });
  //     //     let amt = parseInt(findedProduct[0].price.replace('$', ''));
  //     //     sumAmount += amt * item.quantity;
  //     // });

  //     // setState({ ...state, noRecord: cartProducts.length > 0 ? false : true, loading: false, cartProducts: cartItems, sumAmount: sumAmount, });
  //   };

  useEffect(() => {
    calculateCart();
  }, [props.cartData, props?.CouponData]);

  const {
    cartProducts,
    sumAmount,
    couponCode,
    loading,
    isApplied,
    validCode,
    noRecord,
  } = state;

  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      {/* Header */}

      <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={GlobalStyles.headingTxt}> Shopping Cart</Text>
        </View>
      </OtrixHeader>

      {/* Content Start from here */}
      <OtrixContent>
        {/* Cart Component Start from here */}
        {!noRecord && !loading && (
          <CartView
            navigation={props.navigation}
            products={cartProducts}
            deleteItem={onDeleteItem}
            decrementItem={decrement}
            incrementItem={increment}
          />
        )}
        {!loading && noRecord && (
          <View style={styles.noRecord}>
            <Text style={styles.emptyTxt}>Cart is empty!</Text>
            <Button
              size="lg"
              variant="solid"
              bg={Colors.themeColor}
              style={[
                GlobalStyles.button,
                {
                  marginHorizontal: wp("2%"),
                  marginBottom: hp("2.5%"),
                  marginTop: hp("1%"),
                },
              ]}
              onPress={() => props.navigation.navigate("HomeScreen")}
            >
              <Text style={GlobalStyles.buttonText}>
                <Icon
                  name={"md-cart-sharp"}
                  color={Colors.white}
                  style={{ fontSize: wp("4.5%") }}
                />{" "}
                Shop Now
              </Text>
            </Button>
          </View>
        )}
      </OtrixContent>
      {!noRecord && !loading && (
        <View style={styles.checkoutView}>
          <View style={styles.couponInput}>
            <Input
              variant="outline"
              value={couponCode}
              placeholder="Coupon Code (use 258)"
              style={[GlobalStyles.textInputStyle, styles.inputStyle]}
              onChangeText={(couponCode) => setState({ ...state, couponCode })}
              InputRightElement={
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: wp("3%"),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {props?.CouponData != null &&
                  props?.CouponData.message == "Coupon Applied Succefully" ? (
                    <Icon
                      name={"checkmark-circle"}
                      size={18}
                      color={"#3ad35c"}
                    />
                  ) : null}
                  {/* {isApplied ? (
                    validCode ? (
                      <Icon
                        name={"checkmark-circle"}
                        size={18}
                        color={"#3ad35c"}
                      />
                    ) : (
                      <Icon name={"ios-close-circle"} size={18} color={"red"} />
                    )
                  ) : null} */}
                  <TouchableOpacity
                    style={styles.applyView}
                    onPress={() => applyCouponCode()}
                  >
                    <Text style={styles.applyTxt}>Apply</Text>
                  </TouchableOpacity>
                  {props?.CouponData != null &&
                  props?.CouponData.message == "Coupon Applied Succefully" ? (
                    <Icon
                      onPress={async () => {
                        await props._RemoveCouponData();
                        setState({
                          ...state,
                          couponCode: null,
                        });
                      }}
                      name={"ios-close-circle"}
                      size={18}
                      color={"red"}
                    />
                  ) : null}
                </View>
              }
            />
          </View>
          <View style={GlobalStyles.horizontalLine}></View>
          <OtrixDivider size={"sm"} />
          <View style={styles.totalView}>
            <Text style={styles.leftTxt}>Sub Total</Text>
            <Text style={styles.rightTxt}>{sumAmount} €</Text>
          </View>
          {/* <View style={styles.totalView}>
            <Text style={styles.leftTxt}>Discount</Text>
            <Text style={styles.rightTxt}>$0</Text>
          </View> */}
          {props?.CouponData?.coupon?.amount ? (
            <View style={styles.totalView}>
              <Text style={styles.leftTxt}>
                Coupon ({props?.CouponData?.coupon?.symbol})
              </Text>
              <Text style={styles.rightTxt}>
                {props?.CouponData?.coupon?.amount}
              </Text>
            </View>
          ) : (
            <View style={styles.totalView}>
              <Text style={styles.leftTxt}>Discount</Text>
              <Text style={styles.rightTxt}>0</Text>
            </View>
          )}
          <View style={styles.totalView}>
            <Text style={styles.leftTxt}>Total</Text>
            <Text
              style={[
                styles.rightTxt,
                { color: Colors.link_color, fontSize: wp("5.5%") },
              ]}
            >
              {/* {sumAmount + "€"} */}
              {props?.CouponData != null
                ? props?.CouponData?.coupon?.symbol == "%"
                  ? (
                      (sumAmount / 100) *
                      props?.CouponData?.coupon?.amount
                    ).toFixed(2) + "€"
                  : (
                      parseFloat(sumAmount) -
                      parseFloat(props?.CouponData?.coupon?.amount)
                    ).toFixed(2) + "€"
                : (parseFloat(sumAmount) - 0).toFixed(2) + "€"}
            </Text>
          </View>
          <Button
            size="md"
            variant="solid"
            bg={Colors.themeColor}
            style={[
              GlobalStyles.button,
              {
                marginHorizontal: wp("5%"),
                marginBottom: hp("2.5%"),
                marginTop: hp("1%"),
              },
            ]}
            onPress={() => {
              props.authStatus == true
                ? props.navigation.navigate("CheckoutScreen", {
                    totalAmt:
                      props?.CouponData != null
                        ? props?.CouponData?.coupon?.symbol == "%"
                          ? (
                              (sumAmount / 100) *
                              props?.CouponData?.coupon?.amount
                            ).toFixed(2)
                          : (
                              parseFloat(sumAmount) -
                              parseFloat(props?.CouponData?.coupon?.amount)
                            ).toFixed(2)
                        : (parseFloat(sumAmount) - 0).toFixed(2),
                    subTotalAmt: sumAmount,

                    //  validCode
                    //   ? parseFloat(sumAmount - 50).toFixed(2) + "€"
                    //   : sumAmount + "€",
                  })
                : props.navigation.navigate("ProfileScreen");
            }}
          >
            <Text style={GlobalStyles.buttonText}>Checkout</Text>
          </Button>
        </View>
      )}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    product_Data: state.Home.product_Data,
    cartCount: state.cart.cartCount,
    LoginUser: state.auth.LoginUser,
    authStatus: state.auth.authStatus,
    CouponData: state.cart.CouponData,
  };
}

export default connect(mapStateToProps, {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  _couponData,
  _RemoveCouponData,
})(CheckoutScreen);

const styles = StyleSheet.create({
  checkoutView: {
    backgroundColor: Colors.light_white,
    height: wp("70%"),
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    // flex: 1,
    borderTopLeftRadius: wp("2%"),
    borderTopRightRadius: wp("2%"),
  },
  couponInput: {
    marginHorizontal: wp("5%"),
    marginVertical: hp("1.5%"),
  },
  inputStyle: {
    borderColor: Colors.black,
    backgroundColor: Colors.light_white,
  },
  applyTxt: {
    color: Colors.link_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("4%"),
  },
  applyView: {
    marginHorizontal: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  totalView: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: wp("6%"),
  },
  leftTxt: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Bold,
    flex: 0.5,
    fontSize: wp("3.8%"),
    textAlign: "left",
  },
  rightTxt: {
    color: Colors.text_color,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4.5%"),
    flex: 0.5,
    textAlign: "right",
  },
  noRecord: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: hp("25%"),
  },
  emptyTxt: {
    fontSize: wp("6%"),
    marginVertical: hp("1.5%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.secondry_text_color,
  },
});
