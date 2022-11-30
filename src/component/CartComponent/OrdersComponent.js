import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { OtrixDivider } from "@component";
import Fonts from "@helpers/Fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalStyles, Colors } from "@helpers";
import Icon from "react-native-vector-icons/MaterialIcons";

function OrdersComponent(props) {
  let products = props.products;

  return (
    <View style={{ marginBottom: wp("35%") }}>
      <OtrixDivider size={"md"} />
      {products.length > 0 &&
        products.map((item, index) => (
          <>
            <View
              style={[
                styles.cartContent,
                { marginTop: index > 0 ? wp("3%") : 0 },
              ]}
              key={item.id}
            >
              {/* <View style={styles.cartBox}>
                {/* <View style={styles.imageView}>
                  <Image source={item.image} style={styles.image}></Image>
                </View> */}
              <View style={styles.infromationView}>
                {/* <View>
                  <Text style={styles.name}>{item.name}</Text>
                </View> */}
                <Text style={styles.orderDate}>Order No: #{item.order_no}</Text>
                <Text style={styles.orderDate}>
                  Payment Method:{" "}
                  <Text
                    style={[
                      styles.orderStatuss,
                      {
                        textTransform: "uppercase",
                        fontFamily: Fonts.Font_Regular,
                      },
                    ]}
                  >
                    {item.payment_method}
                  </Text>
                </Text>
                {/* </View> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: wp("5%"),
                  alignItems: "center",
                }}
              >
                <Text style={styles.orderDate}>
                  Delivery Method:{" "}
                  <Text
                    style={[
                      styles.orderStatuss,
                      {
                        textTransform: "uppercase",
                        fontFamily: Fonts.Font_Regular,
                      },
                    ]}
                  >
                    {item.delivery_method}
                  </Text>
                </Text>

                <Text
                  style={[
                    styles.orderStatuss,
                    { textTransform: "uppercase", fontFamily: Fonts.Font_Bold },
                  ]}
                >
                  {item.order_status == "0"
                    ? "Treated"
                    : item.order_status == "1"
                    ? "Confirmed"
                    : item.order_status == "2"
                    ? "In-Delivery"
                    : "Delivered"}
                </Text>
              </View>

              <View style={GlobalStyles.horizontalLine}></View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("OrderDetailScreen", {
                    orderData: item,
                  })
                }
                style={[styles.bottomButton]}
              >
                <Text style={styles.bottomLeftTxt}>Order Details</Text>
                <View style={{ padding: 4 }}>
                  <Icon name="arrow-forward-ios"></Icon>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={GlobalStyles.horizontalLine}></View> */}
            {/* <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("ProductDetailScreen", {
                  id: item.id,
                })
              }
              style={styles.bottomButton}
            >
              <Text style={styles.bottomLeftTxt}>Buy it Again</Text>
              <TouchableOpacity
                disabled
                onPress={() =>
                  props.navigation.navigate("ProductDetailScreen", {
                    item,
                  })
                }
                style={{ padding: 4 }}
              >
                <Icon name="arrow-forward-ios"></Icon>
              </TouchableOpacity>
            </TouchableOpacity> */}
          </>
        ))}
    </View>
  );
}

export default OrdersComponent;
const styles = StyleSheet.create({
  cartContent: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "center",
    borderRadius: wp("2%"),
    marginHorizontal: wp("2%"),
    elevation: 5,
    borderColor: "grey",
    borderWidth: 0.5,
  },
  cartBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp("11%"),
    width: wp("90%"),
    flex: 0.9,
  },
  imageView: {
    flex: 0.3,
    backgroundColor: Colors.light_white,
    margin: wp("1%"),
    height: hp("8%"),
    borderRadius: wp("1.5%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    height: undefined,
    aspectRatio: 1,
    width: wp("15.5%"),
  },
  infromationView: {
    flex: 0.7,
    // marginBottom: hp("1.4%"),
    marginLeft: wp("5%"),
    marginTop: hp("1%"),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    textAlign: "center",
    color: Colors.text_color,
    fontSize: wp("3.8%"),
    fontFamily: Fonts.Font_Bold,
  },
  orderDate: {
    textAlign: "center",
    color: Colors.secondry_text_color,
    lineHeight: hp("3%"),
    fontSize: wp("3.5%"),
    fontFamily: Fonts.Font_Regular,
    marginBottom: wp("1%"),
  },

  bottomButton: {
    height: hp("6%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "row",
    borderRadius: wp("2%"),
    marginLeft: wp("1%"),
    marginBottom: hp("0%"),
  },
  bottomLeftTxt: {
    textAlign: "left",
    fontSize: wp("3.8%"),
    flex: 0.9,
  },
  orderStatuss: {
    fontSize: wp("3.5%"),
    color: Colors.text_color,
  },
});
