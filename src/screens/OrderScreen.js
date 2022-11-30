import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixDivider,
  OtirxBackButton,
  OrdersComponent,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import { proceedCheckout } from "@actions";
import Fonts from "@helpers/Fonts";
import DummyAddress from "@component/items/DummyAddress";
import OrdersDummy from "@component/items/OrdersDummy";
import { useFocusEffect } from "@react-navigation/native";

function OrderScreen(props) {
  const [OrderState, setOrderState] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress1 = () => {
        props.route.params?.orderScreen == "order"
          ? props.navigation.goBack()
          : props.navigation.navigate("HomeScreen");
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener("hardwareBackPress", onBackPress1);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener("hardwareBackPress", onBackPress1);
      };
    }, [])
  );

  useEffect(() => {}, []);

  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      {/* Header */}
      <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
        <TouchableOpacity
          style={GlobalStyles.headerLeft}
          onPress={() => {
            props.route.params?.orderScreen == "order"
              ? props.navigation.goBack()
              : props.navigation.navigate("HomeScreen");
          }}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={GlobalStyles.headingTxt}> Orders</Text>
        </View>
      </OtrixHeader>

      {/* Orders Content start from here */}
      <OtrixDivider size={"md"} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setOrderState(false);
          }}
        >
          <Text
            style={[
              styles.deliveryTitle,
              { color: OrderState ? Colors.text_color : "red" },
            ]}
          >
            Open Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOrderState(true);
          }}
        >
          <Text
            style={[
              styles.deliveryTitle,
              { color: OrderState ? "red" : Colors.text_color },
            ]}
          >
            Delivered Orders
          </Text>
        </TouchableOpacity>
      </View>
      <OtrixDivider size={"sm"} />

      {OrderState ? (
        <View style={styles.addressContent}>
          <ScrollView
            style={styles.addressBox}
            showsHorizontalScrollIndicator={false}
            vertical={true}
          >
            {
              <OrdersComponent
                navigation={props.navigation}
                products={props.OrderList?.delivered_orders}
              />
            }
          </ScrollView>
        </View>
      ) : (
        <View style={styles.addressContent}>
          <ScrollView
            style={styles.addressBox}
            showsHorizontalScrollIndicator={false}
            vertical={true}
          >
            {
              <OrdersComponent
                navigation={props.navigation}
                products={props.OrderList?.open_orders}
              />
            }
          </ScrollView>
        </View>
      )}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    LoginUser: state.auth.LoginUser,
    OrderList: state.auth.OrderList,
  };
}

export default connect(mapStateToProps, { proceedCheckout })(OrderScreen);

const styles = StyleSheet.create({
  deliveryTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("4%"),
    color: Colors.text_color,
    marginLeft: wp("5%"),
    marginBottom: wp("2%"),
  },
  addressBox: {
    marginLeft: wp("5%"),
    marginRight: wp("2.5%"),
    flex: 1,
    height: "auto",
    borderRadius: wp("2%"),
    // paddingBottom: hp("80%"),
  },
  deliveryBox: {
    marginHorizontal: wp("1.5%"),
    width: wp("88%"),
    marginVertical: hp("0.5%"),
    height: hp("30.5%"),
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
    //paddingBottom: wp("50%"),
  },
});
