import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { OtrixDivider } from "@component";
import Fonts from "@helpers/Fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import MatIcon from "react-native-vector-icons/FontAwesome5";
import { PRODUCT_IMAGE_URL } from "@common/config";

function SearchProductsViewComponent(props) {
  let cartProduct = props.products;
  const PriceQuantity = (price, quantity) => {
    let amt = parseFloat(price);
    let qty = parseInt(quantity);
    return amt + "€";
  };
  return (
    <>
      {cartProduct.length > 0 &&
        cartProduct.map((item) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cartContent}
            key={item.id}
            onPress={() =>
              props.navigation.navigate("ProductDetailScreen", { item: item })
            }
          >
            <View style={styles.cartBox}>
              <View style={styles.imageView}>
                <Image
                  source={{ uri: `${PRODUCT_IMAGE_URL}${item.image}` }}
                  style={styles.image}
                ></Image>
              </View>
              <View style={styles.infromationView}>
                <View>
                  <Text style={styles.name}>{item.name_fr}</Text>
                </View>
                <Text style={styles.price}>
                  {PriceQuantity(item.price_euro, item.quantity)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </>
  );
}

export default SearchProductsViewComponent;
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
    marginBottom: wp("3%"),
    borderRadius: wp("2%"),
    marginLeft: wp("1%"),
  },
  cartBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: wp("90%"),
    flex: 0.9,
  },
  imageView: {
    flex: 0.2,
    backgroundColor: Colors.light_wWhite,
    margin: wp("1%"),
    // height: hp("11%"),
    paddingVertical: hp("1%"),
    borderRadius: wp("1.5%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    height: hp("10%"),
    aspectRatio: 1,
    width: wp("21.5%"),
  },
  infromationView: {
    flex: 0.8,
    marginBottom: hp("1.4%"),
    marginLeft: wp("5%"),
    marginTop: hp("1%"),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    color: Colors.secondry_text_color,
    fontSize: wp("3.8%"),
    fontFamily: Fonts.Font_Bold,
  },
  price: {
    textAlign: "center",
    color: Colors.link_color,
    lineHeight: hp("4%"),
    fontSize: wp("5%"),
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
    fontSize: wp("4%"),
    color: Colors.text_color,
    marginHorizontal: wp("1%"),
    fontFamily: Fonts.Font_Bold,
    top: hp("0.2%"),
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
