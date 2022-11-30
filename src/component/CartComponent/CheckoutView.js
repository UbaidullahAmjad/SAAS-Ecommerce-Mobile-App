import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import Fonts from "@helpers/Fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRODUCT_IMAGE_URL } from "@common/config";

function CheckoutView(props) {
  let cartProduct = props.products;
  const PriceQuantity = (price, quantity) => {
    let amt = parseFloat(price);
    // let qty = parseInt(quantity);
    return amt + "€";
  };
  return (
    <>
      <OtrixDivider size={"md"} />
      {cartProduct.length > 0 &&
        cartProduct.map((item) => (
          <View style={styles.cartContent} key={item.id}>
            <View style={styles.cartBox}>
              <View style={styles.imageView}>
                <Image
                  source={{ uri: `${PRODUCT_IMAGE_URL}${item.image}` }}
                  style={styles.image}
                ></Image>
              </View>
              <View style={styles.infromationView}>
                <View
                // onPress={() =>
                //   props.navigation.navigate("ProductDetailScreen", {
                //     id: item.id,
                //   })
                // }
                >
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <Text style={styles.price}>
                  {PriceQuantity(item.price, item.quantity)}
                </Text>
                <Text style={styles.quantityTxt}>
                  Quantity: {item.quantity}
                </Text>
              </View>
            </View>
          </View>
        ))}
    </>
  );
}

export default CheckoutView;
const styles = StyleSheet.create({
  cartContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    padding: 5,
    marginBottom: wp("3%"),
    borderRadius: wp("2%"),
    marginLeft: wp("1.5%"),
  },
  cartBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // height: hp("10%"),
    width: wp("100%"),
    flex: 1,
  },
  imageView: {
    justifyContent: "center",
    flex: 0.3,
    backgroundColor: Colors.light_white,
    marginVertical: wp("1%"),
    height: hp("9%"),
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
    flex: 0.8,
    marginLeft: wp("3%"),
    marginBottom: hp("1.4%"),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    textAlign: "center",
    color: Colors.secondry_text_color,
    fontSize: wp("3.8%"),
    fontFamily: Fonts.Font_Bold,
  },
  price: {
    textAlign: "center",
    color: Colors.link_color,
    lineHeight: hp("3.5%"),
    fontSize: wp("4%"),
    fontFamily: Fonts.Font_Bold,
  },
  plusminus: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    marginTop: hp("1%"),
  },
  plusminusTxt: {
    fontSize: wp("3%"),
    color: Colors.secondry_text_color,
    textAlign: "center",
  },
  quantityTxt: {
    fontSize: wp("3.5%"),
    color: Colors.text_color,
    fontFamily: Fonts.Font_Semibold,
    textAlign: "center",
  },
  deleteIcon: {
    flex: 0.1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: wp("2%"),
  },
  delete: {
    fontSize: wp("3.6%"),
    color: Colors.secondry_text_color,
  },
});
