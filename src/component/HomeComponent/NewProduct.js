import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NewProductDummy from "../items/NewProductDummy";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import ProductView from "../ProductCompnent/ProductView";
import { logfunction } from "@helpers/FunctionHelper";

function NewProduct(props) {
  const navigateToDetailPage = (data) => {
    props.navigation.navigate("ProductDetailScreen", { item: data });
  };

  const addToWishlist = async (id) => {
    props.addToWishlist(id);
    // logfunction(" wishlist Data ", wishlistData)
  };

  const { wishlistArr } = props;

  const renderCard = (item) => {
    return item.isActive == "1" ? (
      <View style={styles.productBox} key={item.id.toString()}>
        <ProductView
          data={item}
          key={item.id}
          navToDetail={navigateToDetailPage}
          addToWishlist={addToWishlist}
          wishlistArray={wishlistArr}
        />
      </View>
    ) : null;
  };

  props.data.reverse();

  return props?.data ? (
    <>
      <View style={styles.catHeading}>
        <Text style={GlobalStyles.boxHeading}>All Products</Text>
        <TouchableOpacity
          style={{ flex: 0.5 }}
          onPress={() =>
            props.navigation.navigate("ProductListScreen", {
              title: "All Products",
              item: props?.data,
            })
          }
        >
          <Text style={GlobalStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <OtrixDivider size={"sm"} />
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {props?.data.map((item, index) => {
          return index > 3 ? null : renderCard(item);
        })}
      </View>
    </>
  ) : null;
}

export default NewProduct;

const styles = StyleSheet.create({
  catHeading: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp("1%"),
  },
  catBox: {
    height: hp("12.5%"),
    width: wp("15%"),
    marginHorizontal: wp("1%"),
    borderRadius: 5,
  },
  productBox: {
    flexDirection: "column",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.white,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    width: "46%",
    height: "auto",
    marginBottom: wp("3%"),
    borderRadius: wp("2%"),
    marginHorizontal: wp("1.5%"),
    paddingBottom: hp("1%"),
  },
});
