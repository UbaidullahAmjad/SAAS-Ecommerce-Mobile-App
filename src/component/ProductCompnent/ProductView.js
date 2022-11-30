import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Fonts from "@helpers/Fonts";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/FontAwesome";
import { PRODUCT_IMAGE_URL } from "@common/config";

function ProductView(props) {
  const data = props.data;
  const wishlistArr = props.wishlistArray ? props.wishlistArray : null;
  return (
    data.isActive == 1 && (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.productBox}
        onPress={() => props.navToDetail(data)}
      >
        <View
          style={[
            styles.imageView,
            {
              backgroundColor: props.imageViewBg
                ? props.imageViewBg
                : Colors.light_white,
            },
          ]}
        >
          <Image
            source={{ uri: `${PRODUCT_IMAGE_URL}${data.image}` }}
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.infromationView}>
          {/* <View style={styles.starView}>
                    <Stars
                        default={data.rating}
                        count={5}
                        half={true}
                        starSize={45}
                        fullStar={<Icon name={'star'} size={11} style={[styles.myStarStyle]} />}
                        emptyStar={<Icon name={'star-o'} size={11} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                        halfStar={<Icon name={'star-half-empty'} size={11} style={[styles.myStarStyle]} />}
                        disabled={true}
                    />
                </View> */}
          <Text style={styles.productName} numberOfLines={1}>
            {data.name_fr}
          </Text>
          <View style={[styles.priceView]}>
            <Text style={styles.price}>{data.price_euro}€</Text>
            {/* <Text style={styles.offerTxt}>{data.off}</Text> */}
          </View>
        </View>
        {data.out_of_stock && (
          <View style={GlobalStyles.outstockview}>
            <Text style={GlobalStyles.outofstockTxt}>Out of stock</Text>
          </View>
        )}
        {data.out_of_stock == false && data.new == true && (
          <View style={GlobalStyles.newtextView}>
            <Text style={GlobalStyles.newTxt}>New</Text>
          </View>
        )}
        {/* {
                wishlistArr && wishlistArr.length > 0 && wishlistArr.includes(data.id) ? <TouchableOpacity style={GlobalStyles.FavCircle} onPress={() => props.addToWishlist(data.id)} >
                    <Icon name="heart" style={GlobalStyles.unFavIcon} color={Colors.white} />
                </TouchableOpacity> : <TouchableOpacity style={GlobalStyles.unFavCircle} onPress={() => props.addToWishlist(data.id)}>
                    <Icon name="heart-o" style={GlobalStyles.unFavIcon} color={Colors.secondry_text_color} />
                </TouchableOpacity>
            } */}
      </TouchableOpacity>
    )
  );
}

export default ProductView;

const styles = StyleSheet.create({
  productBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: wp("100%"),
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
  imageView: {
    flex: 0.63,
    backgroundColor: Colors.light_white,
    width: wp("42.2%"),
    borderTopStartRadius: wp("2%"),
    borderTopEndRadius: wp("2%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    height: hp("16%"),
    width: wp("30%"),
  },
  infromationView: {
    flex: 0.37,
    width: wp("35%"),
  },
  starView: {
    alignItems: "flex-start",
    marginVertical: hp("0.6%"),
  },
  myStarStyle: {
    color: "#ffd12d",
    backgroundColor: "transparent",
    marginHorizontal: 1,
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: "gray",
  },
  productName: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.5%"),
  },
  priceView: {
    flex: 1,
    marginTop: hp("0.6%"),
    flexDirection: "row",
  },
  price: {
    flex: 0.3,
    color: Colors.black,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4%"),
  },
  offerTxt: {
    flex: 0.7,
    textAlign: "right",
    color: Colors.link_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("2.8%"),
    textTransform: "uppercase",
  },
});
