import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  ToastAndroid,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Button } from "native-base";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  CheckoutView,
  OtirxBackButton,
  AddAdressComponent,
  EditAddressComponent,
  PaymentSuccessComponent,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import {
  proceedCheckout,
  _RequestPlaceOrder,
  RemoveLoadingOrderState,
} from "@actions";
import ProductListDummy from "@component/items/ProductListDummy";
import PaymentMethodsDummy from "@component/items/PaymentMethodsDummy";
import Icon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Fonts from "@helpers/Fonts";
import DummyAddress from "@component/items/DummyAddress";
import { STRIPE_PUBLISHABLE_KEY, Secret_key } from "@common/config";
import {
  StripeProvider,
  CardField,
  useStripe,
} from "@stripe/stripe-react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from "react-native";
import { Platform } from "react-native";
import moment from "moment/moment";

const CURRENCY = "EUR";
var CARD_TOKEN = null;
function CheckoutScreen(props) {
  const AccountInromation = useRef();
  const CardDateInromation = useRef();
  const CVCInromation = useRef();

  const [loadingState, setLoading] = React.useState(false);
  const [cvc, setCVC] = React.useState("");
  const [date, setDate] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [SelectDeliveryMethod, setSelectDeliveryMethod] = React.useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [deliveryDateSelect, setDeliveryDateSelect] = React.useState("");
  const [DeliveryFomratDate, setDeliveryFomratDate] = React.useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDeliveryDateSelect(date);
    const fateTimeFormat = moment(date).format("DD/MM/YYYY h:m a");
    console.warn("A date has been picked: ", fateTimeFormat);
    setDeliveryFomratDate(fateTimeFormat);
  };

  const [state, setState] = React.useState({
    loading: true,
    cartArr: [],
    showAdd: false,
    cartProducts: [],
    sumAmount: 0,
    noRecord: false,
    addresses: [],
    addresses: DummyAddress,
    // selctedAddress: 0,
    showEdit: false,
    editAddressData: [],
    step: 1,
    selectedPaymentMethod: 2,
    paymentSuccessModal: false,
    accessToken: null,
    approvalUrl: null,
    paymentId: null,
    cartArrayData: [],
    PaypalPaymentItems: [],
  });

  const ContinueShopping = () => {
    props.navigation.navigate("HomeScreen");
    setTimeout(() => {
      props.RemoveLoadingOrderState();
    }, 2000);
  };

  const ViewOrders = () => {
    props.navigation.navigate("OrderScreen");
    setTimeout(() => {
      props.RemoveLoadingOrderState();
    }, 2000);
  };
  /******************************** Fetch Paypal Card Code *********************************/

  const buyBook = async () => {
    //Check out https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/# for more detail paypal checkout
    const dataDetail = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: props.route.params?.totalAmt,
            details: {
              shipping: "0",
              subtotal: state.sumAmount,
              shipping_discount: "0",
              insurance: "0",
              handling_fee: "0",
              tax: "0",
            },
          },
          description: "This is the payment transaction description",
          payment_options: {
            allowed_payment_method: "IMMEDIATE_PAY",
          },
          item_list: {
            items: state.PaypalPaymentItems,
          },
        },
      ],
      redirect_urls: {
        return_url: "http://192.168.8.103:3000/success",
        cancel_url: "http://192.168.8.103:3000/cancel",
      },
    };

    // const dataDetail = {
    //   intent: "sale",
    //   payer: {
    //     payment_method: "paypal",
    //   },
    //   redirect_urls: {
    //     return_url: "http://192.168.8.103:3000/success",
    //     cancel_url: "http://192.168.8.103:3000/cancel",
    //   },
    //   transactions: [
    //     {
    //       item_list: {
    //         items: [
    //           {
    //             name: "item",
    //             sku: "item",
    //             price: "1.00",
    //             currency: "USD",
    //             quantity: 1,
    //           },
    //         ],
    //       },
    //       amount: {
    //         currency: "USD",
    //         total: "1.00",
    //         details: {
    //           shipping: "0",
    //           subtotal: "1.00",
    //           shipping_discount: "0",
    //           insurance: "0",
    //           handling_fee: "0",
    //           tax: "0",
    //         },
    //       },
    //       description: "This is the payment description.",
    //     },
    //   ],
    // };

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Basic QVhuclhHV0U1UmdKRDVZaVA0Si1UMzBUWXJnTUU1YjJhWXM0cnhEU2E4OGJ6Q08tZ2QydS13bDI0NUZoVHFVaEVSd1dkNEs5d0JJYi1URHU6RUJoRGRwSE5yUTZiUHg5a3hCX3RVNU45UGI5Vmcxendmc1RrUFYwWmxQbnF6cG4weGtiWEgxY09CWWhpX2lPY1U1LTFDSGkzbzRJY3FqUmo="
    );
    myHeaders.append("Content-Type", "text/plain");

    var raw = "grant_type=client_credentials";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        console.log("Token result: ", result.access_token);
        setState({
          ...state,
          accessToken: result.access_token,
        });

        await fetch("https://api.sandbox.paypal.com/v1/payments/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result?.access_token}`,
          },
          body: JSON.stringify(dataDetail),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("Payment result: ", result);
            const { id, links } = result;
            const approvalUrl = links.find(
              (data) => data.rel == "approval_url"
            );
            console.log("approvalUrl: ", approvalUrl);
            setState({
              ...state,
              paymentId: id,
              approvalUrl: approvalUrl.href,
            });
          })
          .catch((error) => console.log("payment error", error));
      })
      .catch((error) => console.log("token error", error));
  };

  const _onNavigationStateChange = (webViewState) => {
    console.log("webViewState: ", webViewState);

    if (webViewState.url.includes("http://192.168.8.103:3000/")) {
      setState({
        ...state,
        approvalUrl: null,
      });

      const { payerID, paymentId } = webViewState.url;

      fetch(
        `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state?.accessToken}`,
          },
          body: { payer_id: payerID },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("Payment ID result: ", result);
          if (result.name == "INVALID_RESOURCE_ID") {
            alert("Payment Failed. Please Try Again");
            setState({
              ...state,
              approvalUrl: null,
            });
            props.navigation.pop();
          }
        })
        .catch((error) => console.log("payment error", error));
    }
  };
  {
    /********************************************************************************************/
  }

  /******************************** Fetch Paypal Card Code *********************************/

  const CashOnDelivery = async () => {
    setLoading(true);

    console.log("Address", state);
    // console.log("Login User: ", props.LoginUser);
    const Today_Date = new Date();
    // console.log("cartArray", state.cartArrayData);
    const data = [
      {
        contact: props.LoginUser?.email,
        checked: false,
        country: props.LoginUser?.country ? props.LoginUser?.country : "",
        firstName: props.LoginUser?.first_name
          ? props.LoginUser?.first_name
          : "",
        lastName: props.LoginUser?.last_name ? props.LoginUser?.last_name : "",
        address: props.LoginUser?.address ? props.LoginUser?.address : "",
        postalCode: props.LoginUser?.zip_code ? props.LoginUser?.zip_code : "",
        city: props.LoginUser?.city ? props.LoginUser?.city : "",
        phone: props.LoginUser?.mobilenumber
          ? props.LoginUser?.mobilenumber
          : "",
        type: props.LoginUser?.id ? "user" : "guest",
        user_id: props.LoginUser?.id ? props.LoginUser?.id : null,
        coupon_code: props?.CouponData
          ? props?.CouponData?.coupon?.code
          : "empty",
        couponCodeAmount: props?.CouponData
          ? props?.CouponData?.coupon?.amount
          : 0,
        couponCodeSymbol: props?.CouponData
          ? props?.CouponData?.coupon?.symbol
          : "",
        date: `${Today_Date}`,
        delivery_method: SelectDeliveryMethod == 0 ? "delivery" : "takeAway",
        delivery_info: deliveryDateSelect == "" ? null : deliveryDateSelect,
        totalPayPrice: props.route.params?.totalAmt,
        products: JSON.stringify(state.cartArrayData),
        total: parseFloat(props.route.params?.subTotalAmt).toFixed(2),
        grand_total: props.route.params?.totalAmt,
        discount: 0,
        item_count: state.cartProducts?.length,
        store_id: 0,
        isDefaultValues: props.LoginUser?.id ? true : false,
      },
      "cash_on_delivery",
    ];

    let data1 = {
      data,
      Login_id: props.LoginUser?.id ? props.LoginUser?.id : null,
    };

    await props?._RequestPlaceOrder(data1);
    setLoading(false);
    // setState({ ...state, paymentSuccessModal: true });
  };

  {
    /********************************************************************************************/
  }

  {
  }
  function getCreditCardToken() {
    let split = date.split("/");
    let carNumberWithOutSpace = cardNumber.replace(/ /g, "");

    // console.log(split[0], split[1]);
    // console.log(carNumberWithOutSpace);
    // console.log(cvc);
    // console.log("STRIPE_PUBLISHABLE_KEY: ", STRIPE_PUBLISHABLE_KEY);

    var card = {
      "card[number]": `${carNumberWithOutSpace}`,
      "card[exp_month]": split[0],
      "card[exp_year]": split[1],
      "card[cvc]": `${cvc}`,
    };
    return fetch("https://api.stripe.com/v1/tokens", {
      headers: {
        // Use the correct MIME type for your server
        Accept: "application/json",
        // Use the correct Content Type to send data to Stripe
        "Content-Type": "application/x-www-form-urlencoded",
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer pk_test_51Jkps9KSaL7qomLnQIO1efREMMu058gldePMrDjKOofIJPbrD4aDf4Hic6CFj6lWyjnrVcF4atjiDQ6ddjKUmeOq00Zt8baodp`,
      },
      method: "post",
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map((key) => key + "=" + card[key])
        .join("&"),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  function subscribeUser(creditCardToken) {
    return new Promise((resolve) => {
      CARD_TOKEN = creditCardToken.card.id;
      setTimeout(() => {
        resolve({ status: true });
      }, 1000);
    });
  }

  const onSubmit = async () => {
    setLoading(true);
    // console.log("Address", state);
    // console.log("Login User: ", props.LoginUser);
    const Today_Date = new Date();
    // console.log("cartArray", state.cartArrayData);

    const data = [
      {
        contact: props.LoginUser?.email,
        checked: false,
        country: props.LoginUser?.country ? props.LoginUser?.country : "",
        firstName: props.LoginUser?.first_name
          ? props.LoginUser?.first_name
          : "",
        lastName: props.LoginUser?.last_name ? props.LoginUser?.last_name : "",
        address: props.LoginUser?.address ? props.LoginUser?.address : "",
        postalCode: props.LoginUser?.zip_code ? props.LoginUser?.zip_code : "",
        city: props.LoginUser?.city ? props.LoginUser?.city : "",
        phone: props.LoginUser?.mobilenumber
          ? props.LoginUser?.mobilenumber
          : "",
        type: props.LoginUser?.id ? "user" : "guest",
        user_id: props.LoginUser?.id ? props.LoginUser?.id : null,
        coupon_code: props?.CouponData
          ? props?.CouponData?.coupon?.code
          : "empty",
        couponCodeAmount: props?.CouponData
          ? props?.CouponData?.coupon?.amount
          : 0,
        couponCodeSymbol: props?.CouponData
          ? props?.CouponData?.coupon?.symbol
          : "",
        date: `${Today_Date}`,
        delivery_method: SelectDeliveryMethod == 0 ? "delivery" : "takeAway",
        delivery_info: deliveryDateSelect == "" ? null : deliveryDateSelect,
        totalPayPrice: props.route.params?.totalAmt,
        products: JSON.stringify(state.cartArrayData),
        total: parseFloat(props.route.params?.subTotalAmt).toFixed(2),
        grand_total: props.route.params?.totalAmt,
        discount: 0,
        item_count: state.cartProducts?.length,
        store_id: 0,
        isDefaultValues: props.LoginUser?.id ? true : false,
      },
      "card",
    ];

    let data1 = {
      data,
      Login_id: props.LoginUser?.id ? props.LoginUser?.id : null,
    };

    let creditCardToken;
    try {
      creditCardToken = await getCreditCardToken();
      console.log("creditCardToken.error:", creditCardToken.card);
      if (creditCardToken.error) {
        setLoading(false);
        alert(`${creditCardToken.error.message}`);
        return;
      }
    } catch (e) {
      setLoading(false);
      console.log("e", e);
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // // Handle any errors from your server
    if (error) {
      setLoading(false);
      alert(error);
    } else {
      let pament_data = await charges();
      console.log("pament_data", pament_data);
      if (pament_data.status == "succeeded") {
        // await props.proceedCheckout();

        ToastAndroid.show("Payment Successfully !", ToastAndroid.LONG);
        await props?._RequestPlaceOrder(data1);
        setLoading(false);
        // setState({ ...state, paymentSuccessModal: true });
      } else {
        setLoading(false);
        console.log("Payment failed");
        ToastAndroid.show("Payment failed", ToastAndroid.LONG);
      }
    }
  };

  const charges = async () => {
    const card = {
      amount: props?.route?.params?.totalAmt * 100,
      currency: CURRENCY,
      source: "tok_visa",
      description: "Developers Sin Subscription",
    };
    return fetch("https://api.stripe.com/v1/charges", {
      headers: {
        // Use the correct MIME type for your server
        Accept: "application/json",
        // Use the correct Content Type to send data to Stripe
        "Content-Type": "application/x-www-form-urlencoded",
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${Secret_key}`,
      },
      // Use a proper HTTP method
      method: "POST",
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map((key) => key + "=" + card[key])
        .join("&"),
    }).then((response) => response.json());
  };
  {
    /********************************************************************************************/
  }

  const calculateCart = () => {
    const { product_Data } = props;

    let cartProducts = props.cartData;
    let cartItems = [];
    let cartArray = [];
    let sumAmount = 0;
    let cartPayPalArray = [];

    //find and create array
    cartProducts &&
      cartProducts.length > 0 &&
      cartProducts.forEach(function (item, index) {
        let findedProduct = product_Data.filter(
          (product) => product.id == item.product_id
        );
        cartItems.push({
          quantity: item.quantity,
          name: findedProduct[0].name_fr,
          price: findedProduct[0].price_euro,
          image: findedProduct[0].image,
          id: findedProduct[0].id,
        });

        //find and create array
        cartArray.push({
          id: findedProduct[0].id,
          name_fr: findedProduct[0].name_fr,
          price_euro: findedProduct[0].price_euro,
          quantity: item.quantity,
          unit_price:
            parseFloat(item.quantity) * parseFloat(findedProduct[0].price_euro),
        });

        //find and create array
        cartPayPalArray.push({
          name: findedProduct[0].name_fr,
          description: findedProduct[0].description_fr,
          quantity: item.quantity,
          price: findedProduct[0].price_euro,
          tax: "0",
          sku: "product34",
          currency: "USD",
        });

        let amt = parseFloat(findedProduct[0].price_euro);
        sumAmount += amt * item.quantity;
      });

    setState({
      ...state,
      noRecord: cartProducts.length > 0 ? false : true,
      loading: false,
      cartProducts: cartItems,
      sumAmount: sumAmount.toFixed(2),
      cartArrayData: cartArray,
      PaypalPaymentItems: cartPayPalArray,
    });
  };

  const storeAddress = (addressData) => {
    let newID = "" + Math.floor(Math.random() * 10000) + 1;
    let newObj = {
      id: "" + newID,
      name: addressData.name,
      country: addressData.country,
      city: addressData.city,
      postcode: addressData.postcode,
      address1: addressData.address1,
      address2: addressData.address2,
    };
    setState({
      ...state,
      addresses: [newObj, ...addresses],
      showAdd: false,
      selctedAddress: newObj.id,
    });
  };

  const updateAddress = (addressData) => {
    let newID = "" + Math.floor(Math.random() * 10000) + 1;
    if (selctedAddress == addressData.id) {
      setState({ ...state, selctedAddress: newID });
    }
    let findIndex = addresses.findIndex(
      (item) => item.id === editAddressData.id
    );
    let newObj = {
      id: newID,
      name: addressData.name,
      country: addressData.country,
      city: addressData.city,
      postcode: addressData.postcode,
      address1: addressData.address1,
      address2: addressData.address2,
    };
    addresses.splice(findIndex, 1);

    setState({
      ...state,
      addresses: [newObj, ...addresses],
      showEdit: false,
    });
    if (selctedAddress == addressData.id) {
      setState({ ...state, selctedAddress: newID });
    }
  };

  const editAddress = (id) => {
    let findAddress = addresses.filter((item) => item.id.indexOf(id) > -1);
    setState({ ...state, editAddressData: findAddress[0], showEdit: true });
  };

  const closeAddressModel = () => {
    setState({
      ...state,
      showAdd: false,
    });
  };

  const closeAddressEditModel = () => {
    setState({
      ...state,
      showEdit: false,
    });
  };

  const _proceedCheckout = async () => {
    if (selectedPaymentMethod == "2") {
      await onSubmit();
    } else if (selectedPaymentMethod == "1") {
      await buyBook();
    } else {
      await CashOnDelivery();
      console.log("Cash On Deliver");
    }
    // props.proceedCheckout();
  };

  useEffect(() => {
    calculateCart();
  }, []);

  const {
    cartProducts,
    loading,
    noRecord,
    showAdd,
    addresses,
    selctedAddress,
    showEdit,
    editAddressData,
    step,
    selectedPaymentMethod,
    paymentSuccessModal,
    approvalUrl,
  } = state;
  const { totalAmt } = props.route.params;
  return approvalUrl ? (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ height: "100%", width: "100%", marginTop: 40 }}
        source={{ uri: approvalUrl }}
        onNavigationStateChange={_onNavigationStateChange}
        injectedJavaScript={`document.f1.submit()`}
        // onNavigationStateChange={navState => {
        //   setCanGoBack(navState.canGoBack)
        //   setCanGoForward(navState.canGoForward)
        //   setCurrentUrl(navState.url)
        // }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
      />
    </View>
  ) : (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      {/* Header */}
      <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
        <TouchableOpacity
          style={GlobalStyles.headerLeft}
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={GlobalStyles.headingTxt}>Checkout</Text>
        </View>
      </OtrixHeader>

      {/* Content Start from here */}
      <View style={{ marginHorizontal: wp("4%") }}>
        {/* Arrow navigation Start from here */}
        <View style={styles.indicatorView}>
          <View style={[styles.indicator1, { marginRight: wp("4%") }]}>
            <View style={{ position: "relative" }}>
              <View
                style={[
                  styles.ract,
                  {
                    borderColor: step == 1 ? Colors.themeColor : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.indicatorText,
                    {
                      color:
                        step == 1
                          ? Colors.themeColor
                          : Colors.secondry_text_color,
                    },
                  ]}
                >
                  Address
                </Text>
              </View>
              <View style={[styles.tri]}>
                <View
                  style={[
                    styles.arrow,
                    {
                      borderColor:
                        step == 1 ? Colors.themeColor : "transparent",
                    },
                  ]}
                ></View>
              </View>
            </View>
          </View>

          <View style={styles.indicator1}>
            <View
              style={{
                borderColor: step == 2 ? Colors.themeColor : "transparent",
              }}
            >
              <View
                style={[
                  styles.ract,
                  {
                    borderColor: step == 2 ? Colors.themeColor : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.indicatorText,
                    {
                      color:
                        step == 2
                          ? Colors.themeColor
                          : Colors.secondry_text_color,
                    },
                  ]}
                >
                  Payment
                </Text>
              </View>
              <View style={[styles.tri]}>
                <View
                  style={[
                    styles.arrow,
                    {
                      borderColor:
                        step == 2 ? Colors.themeColor : "transparent",
                    },
                  ]}
                ></View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Address Content start from here */}
      {step == 1 && (
        <>
          <OtrixDivider size={"md"} />
          <Text style={styles.deliveryTitle}>Delivery Address</Text>
          <OtrixDivider size={"sm"} />
          <View style={styles.addressContent}>
            {/*horizontal address* */}
            <ScrollView
              style={styles.addressBox}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {addresses.length > 0 &&
                addresses.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.deliveryBox,
                      {
                        borderWidth: selctedAddress == item.id ? 1 : 0.1,
                        borderColor:
                          selctedAddress == item.id
                            ? Colors.themeColor
                            : Colors.white,
                      },
                    ]}
                    onPress={() =>
                      setState({ ...state, selctedAddress: item.id })
                    }
                  >
                    <Text style={styles.addressTxt} numberOfLines={1}>
                      {item.name}{" "}
                    </Text>
                    <Text style={styles.addressTxt} numberOfLines={2}>
                      {item.address1}{" "}
                    </Text>
                    <Text style={styles.addressTxt} numberOfLines={2}>
                      {item.address2}, {item.city}
                    </Text>
                    <Text style={styles.addressTxt} numberOfLines={1}>
                      {item.postcode}, {item.country}
                    </Text>
                    {selctedAddress == item.id && (
                      <Text style={styles.deliveryAddressTxt}>
                        Delivery Address{" "}
                        <Icon
                          name="md-checkmark-circle-sharp"
                          color={Colors.themeColor}
                          size={wp("4%")}
                          style={{ textAlignVertical: "center" }}
                        />
                      </Text>
                    )}
                    <TouchableOpacity
                      style={[
                        styles.editView,
                        {
                          bottom:
                            selctedAddress == item.id ? hp("12%") : hp("10%"),
                        },
                      ]}
                      onPress={() => editAddress(item.id)}
                    >
                      <Text style={styles.edit}>
                        {" "}
                        <MatIcon
                          name="pencil"
                          color={Colors.text_color}
                          size={wp("5%")}
                        />
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.plusView}
              onPress={() => setState({ ...state, showAdd: true })}
            >
              <MatIcon name="plus" color={Colors.text_color} size={wp("8%")} />
            </TouchableOpacity>
          </View>
        </>
      )}

      {step == 1 && (
        <>
          <OtrixDivider size={"lg"} />
          <Text style={styles.summayTitle}>Delivery Methods</Text>
          <OtrixDivider size={"sm"} />
          <View style={GlobalStyles.horizontalLine}></View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <FlatList
              data={[
                { id: 1, name: "Delivery" },
                { id: 2, name: "TakeAway" },
              ]}
              keyExtractor={(item, index) => index}
              horizontal
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectDeliveryMethod(index)}
                    style={[
                      styles.ract,
                      {
                        borderColor:
                          SelectDeliveryMethod == index
                            ? Colors.themeColor
                            : "transparent",
                        margin: wp("3%"),
                        elevation: 2,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.indicatorText,
                        {
                          color:
                            SelectDeliveryMethod == index
                              ? Colors.themeColor
                              : Colors.secondry_text_color,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <OtrixDivider size={"sm"} />

          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              ...styles.calenderView,
            }}
          >
            <Text
              style={{
                color: Colors.secondry_text_color,
                padding: 5,
                marginLeft: wp("2%"),
                fontSize: Platform.isPad === true ? wp("3.5%") : hp("1.6%"),
              }}
            >
              {DeliveryFomratDate == ""
                ? "Please select a date and time"
                : DeliveryFomratDate}
            </Text>
            <AntDesign
              name="calendar"
              size={wp("5%")}
              color={"rgba(44, 48, 56, 0.5)"}
              style={{ position: "absolute", right: 10 }}
            />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            locale="en_GB"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </>
      )}

      {step == 1 && (
        <OtrixContent>
          <OtrixDivider size={"lg"} />
          <Text style={styles.summayTitle}>Order Summary</Text>
          <OtrixDivider size={"sm"} />
          <View style={GlobalStyles.horizontalLine}></View>
          <>
            {!noRecord && !loading && (
              <CheckoutView
                navigation={props.navigation}
                products={cartProducts}
              />
            )}
          </>
        </OtrixContent>
      )}

      {/* Add Address Screen */}
      <Modal visible={showAdd} transparent={true}>
        <AddAdressComponent
          closeAdd={closeAddressModel}
          addAdress={storeAddress}
        />
      </Modal>

      {/* Edit Address Screen */}
      <Modal visible={showEdit} transparent={true}>
        <EditAddressComponent
          closeEdit={closeAddressEditModel}
          editAddress={updateAddress}
          editData={editAddressData}
        />
      </Modal>

      {/******** PAYMENT SECTION *************/}
      {step == 2 && (
        <OtrixContent>
          {/* <OtrixDivider size={"md"} />
          <View style={styles.offerView}>
            <Text style={styles.offerTxt}>Get 10% Off With Credit Card</Text>
          </View> */}
          <OtrixDivider size={"md"} />
          <Text style={styles.paymentMethodTitle}>Payment Methods</Text>
          <OtrixDivider size={"sm"} />
          {PaymentMethodsDummy.map(
            (item, index) =>
              index > 0 && (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setState({ ...state, selectedPaymentMethod: item.id })
                  }
                  style={[
                    styles.paymentView,
                    {
                      backgroundColor:
                        selectedPaymentMethod == item.id
                          ? Colors.themeColor
                          : Colors.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.paymentMethodTxt,
                      {
                        color:
                          selectedPaymentMethod == item.id
                            ? Colors.white
                            : Colors.text_color,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                  {selectedPaymentMethod == item.id ? (
                    <Icon
                      name="md-shield-checkmark"
                      color={Colors.white}
                      size={wp("6%")}
                      style={{ textAlign: "right", flex: 0.1 }}
                    />
                  ) : (
                    <Icon
                      name="radio-button-off"
                      color={Colors.secondry_text_color}
                      size={wp("5%")}
                      style={{ textAlign: "right", flex: 0.1 }}
                    />
                  )}
                </TouchableOpacity>
              )
          )}
          {selectedPaymentMethod == "2" && (
            <StripeProvider
              publishableKey={STRIPE_PUBLISHABLE_KEY}
              merchantIdentifier="merchant.identifier"
            >
              <View
                style={{
                  backgroundColor: "#FAFAFA",
                  paddingHorizontal: wp("6%"),
                  paddingVertical: wp("10%"),
                  borderRadius: 4,
                  marginTop: hp("1.5%"),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    width: "100%",
                    borderRadius: 8,
                    elevation: 2,
                  }}
                >
                  <TextInput
                    maxLength={19}
                    ref={AccountInromation}
                    keyboardType="number-pad"
                    value={cardNumber}
                    onChangeText={(e) => {
                      const inputVal = e.replace(/ /g, ""); //remove all the empty spaces in the input
                      let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits
                      if (inputNumbersOnly.length > 16) {
                        //If entered value has a length greater than 16 then take only the first 16 digits
                        inputNumbersOnly = inputNumbersOnly.substr(0, 16);
                      }
                      // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
                      const splits = inputNumbersOnly.match(/.{1,4}/g);
                      let spacedNumber = "";
                      if (splits) {
                        spacedNumber = splits.join(" "); // Join all the splits with an empty space
                      }
                      setCardNumber(spacedNumber);
                    }}
                    placeholder="1234 1234 1234 1234"
                    style={{ width: "60%" }}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    <AntDesign name="creditcard" color={"gray"} size={18} />
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    marginTop: hp("2%"),
                  }}
                >
                  <TextInput
                    keyboardType="number-pad"
                    value={date}
                    maxLength={5}
                    ref={CardDateInromation}
                    onChangeText={(e) => {
                      const inputVal = e.replace(/ /g, ""); //remove all the empty spaces in the input
                      let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits
                      if (inputNumbersOnly.length > 4) {
                        //If entered value has a length greater than 16 then take only the first 16 digits
                        inputNumbersOnly = inputNumbersOnly.substr(0, 4);
                      }
                      // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
                      const splits = inputNumbersOnly.match(/.{1,2}/g);
                      let spacedNumber = "";
                      if (splits) {
                        spacedNumber = splits.join("/"); // Join all the splits with an empty space
                      }
                      setDate(spacedNumber);
                    }}
                    placeholder="MM / YY"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      elevation: 2,
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    marginTop: hp("2%"),
                  }}
                >
                  <TextInput
                    keyboardType="number-pad"
                    value={cvc}
                    maxLength={3}
                    ref={CVCInromation}
                    onChangeText={(txt) => {
                      setCVC(txt);
                    }}
                    placeholder="CVC"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      elevation: 2,
                    }}
                  />
                </View>
              </View>
            </StripeProvider>
          )}
        </OtrixContent>
      )}

      <View style={styles.checkoutView}>
        <OtrixDivider size={"sm"} />
        <View style={styles.totalView}>
          <Text style={styles.leftTxt}>Total :</Text>
          <Text
            style={[
              styles.rightTxt,
              { color: Colors.link_color, fontSize: wp("5.5%") },
            ]}
          >
            {totalAmt} €
          </Text>
          {step == 1 ? (
            <Button
              size="md"
              variant="solid"
              bg={Colors.themeColor}
              style={[
                GlobalStyles.button,
                {
                  marginHorizontal: wp("5%"),
                  marginBottom: hp("1%"),
                  flex: 0.4,
                  alignSelf: "flex-end",
                },
              ]}
              onPress={() => {
                console.log(addresses.length, selctedAddress);
                if (addresses.length > 0 && selctedAddress != undefined) {
                  console.log("Address", state);
                  setState({ ...state, step: 2 });
                } else {
                  ToastAndroid.show(
                    "Add & Select proper delivery address",
                    ToastAndroid.LONG
                  );
                }
              }}
            >
              <Text style={GlobalStyles.buttonText}>Procced To Pay</Text>
            </Button>
          ) : (
            <Button
              size="md"
              variant="solid"
              bg={"#0ab97a"}
              style={[
                GlobalStyles.button,
                {
                  marginHorizontal: wp("5%"),
                  marginBottom: hp("1%"),
                  flex: 0.4,
                  alignSelf: "flex-end",
                },
              ]}
              onPress={() => {
                // setState({ ...state, paymentSuccessModal: true }),
                _proceedCheckout();
              }}
            >
              {loadingState ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Text
                  style={[GlobalStyles.buttonText, { fontSize: wp("4.8%") }]}
                >
                  Place Order
                </Text>
              )}
            </Button>
          )}
        </View>
      </View>

      {/* Payment Modal  */}
      <Modal visible={props?.OrderSuccessModal} transparent={true}>
        <PaymentSuccessComponent
          navigation={props.navigation}
          ContinueShopping={() => ContinueShopping()}
          ViewOrder={() => ViewOrders()}
        />
      </Modal>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    product_Data: state.Home.product_Data,
    cartCount: state.cart.cartCount,
    LoginUser: state.auth.LoginUser,
    CouponData: state.cart.CouponData,
    OrderSuccessModal: state.Home.OrderSuccessModal,
  };
}

export default connect(mapStateToProps, {
  proceedCheckout,
  _RequestPlaceOrder,
  RemoveLoadingOrderState,
})(CheckoutScreen);

const styles = StyleSheet.create({
  checkoutView: {
    backgroundColor: Colors.light_white,
    height: hp("8%"),
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderTopLeftRadius: wp("2%"),
    borderTopRightRadius: wp("2%"),
  },
  totalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: wp("6%"),
  },
  leftTxt: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Bold,
    flex: 0.2,
    fontSize: wp("4%"),
    textAlign: "left",
  },
  rightTxt: {
    color: Colors.text_color,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4%"),
    flex: 0.4,
    textAlign: "left",
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
  indicatorView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: hp("1.5%"),
  },

  indicator1: {
    marginHorizontal: wp("3%"),
  },
  ract: {
    borderWidth: 1,
    padding: 4.4,
    width: wp("38%"),
    backgroundColor: Colors.white,

    alignItems: "center",
  },
  tri: {
    position: "absolute",
    top: hp("0.6%"),
    right: -wp("2.6%"),
  },
  arrow: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    backgroundColor: Colors.white,
    borderColor: "#007299",
    width: 20,
    height: 21,
    transform: [{ rotate: "45deg" }],
  },
  indicatorText: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    textTransform: "uppercase",
    color: Colors.secondry_text_color,
  },
  deliveryTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    color: Colors.text_color,
    marginLeft: wp("5%"),
  },
  summayTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    color: Colors.text_color,
    left: wp("5%"),
  },
  addressBox: {
    marginLeft: wp("5%"),
    marginRight: wp("2.5%"),
    flex: 0.9,
    height: hp("15.5%"),
    borderRadius: wp("2%"),
  },
  deliveryBox: {
    marginHorizontal: wp("1.5%"),
    width: wp("72%"),
    height: hp("15.5%"),
    borderRadius: wp("2%"),
    backgroundColor: Colors.white,
    padding: wp("2.5%"),
  },
  addressTxt: {
    fontSize: wp("3.6%"),
    fontFamily: Fonts.Font_Reguler,
    color: Colors.text_color,
    textAlign: "left",
  },
  deliveryAddressTxt: {
    textAlign: "right",
    fontSize: wp("3.4%"),
    fontFamily: Fonts.Font_Reguler,
    color: Colors.link_color,
  },
  edit: {
    textAlign: "right",
  },
  editView: { justifyContent: "flex-start" },
  addressContent: {
    flexDirection: "row",
  },
  summryBox: {
    height: hp("6.5%"),
    backgroundColor: Colors.white,
    flexDirection: "row",
    marginVertical: hp("1%"),
  },
  image: {
    flex: 0.25,
    height: hp("10%"),
    resizeMode: "contain",
    width: wp("20%"),
  },
  plusView: {
    flex: 0.15,
    height: hp("15%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  //payment styles here
  offerView: {
    padding: hp("1.5%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  offerTxt: {
    fontSize: wp("3.8%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.link_color,
  },
  paymentMethodTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("4%"),
    color: Colors.text_color,
    marginLeft: wp("1%"),
  },
  paymentView: {
    flexDirection: "row",
    padding: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: hp("0.5%"),
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.light_gray,
  },
  paymentMethodTxt: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    textAlign: "left",
    marginLeft: wp("2%"),
    flex: 0.9,
  },
  calenderView: {
    height: wp("12%"),
    backgroundColor: "#F6F9FC",
    borderColor: "rgba(44, 48, 56, 0.4)",
    borderRadius: 4,
    borderWidth: 0.5,
    justifyContent: "center",
    marginHorizontal: wp("5%"),
  },
});

// import React from "react";
// import { View, Text, TouchableOpacity, Modal } from "react-native";
// import WebView from "react-native-webview";

// export default class App extends React.Component {
//   state = {
//     showModal: false,
//     status: "Pending",
//   };

//   handleResponse = (data) => {
//     if (data.title === "success") {
//       this.setState({ showModal: false, status: "Complete" });
//     } else if (data.title === "cancel") {
//       this.setState({ showModal: false, status: "Cancelled" });
//     } else {
//       return;
//     }
//   };

//   render() {
//     return (
//       <View style={{ marginTop: 100 }}>
//         <Modal
//           visible={this.state.showModal}
//           onRequestClose={() => this.setState({ showModal: false })}
//         >
//           <WebView
//             source={{ uri: "http://192.168.8.103:3000" }}
//             onNavigationStateChange={(data) => this.handleResponse(data)}
//             injectedJavaScript={`document.f1.submit()`}
//           />
//         </Modal>
//         <TouchableOpacity
//           style={{ width: 300, height: 100 }}
//           onPress={() => this.setState({ showModal: true })}
//         >
//           <Text>Pay with Paypal</Text>
//         </TouchableOpacity>
//         <Text>Payment Status: {this.state.status}</Text>
//       </View>
//     );
//   }
// }
