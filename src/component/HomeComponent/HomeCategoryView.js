import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CategoryDummy from "../items/CategoryDummy";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import Fonts from "@helpers/Fonts";
import { Props } from "react-native-image-zoom-viewer/built/image-viewer.type";
import { CATEGORY_IMAGE_URL } from "@common/config";

function HomeCategoryView(props) {
  loadImage = false;

  return (
    <View>
      {props?.data.length > 0 ? (
        <>
          <View style={styles.catHeading}>
            <Text style={GlobalStyles.boxHeading}>Top Categories</Text>
            <TouchableOpacity
              style={{ flex: 0.5 }}
              onPress={() =>
                props.navigation.navigate("CategoryScreen", {
                  item: props?.data,
                })
              }
            >
              <Text style={GlobalStyles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <OtrixDivider size={"sm"} />
          <FlatList
            style={{ padding: wp("1%") }}
            data={props?.data}
            contentContainerStyle={{ paddingRight: wp("3%") }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.7}
            keyExtractor={(contact, index) => String(index)}
            renderItem={({ item, index }) =>
              item.isActive == "1" ? (
                <TouchableOpacity
                  style={styles.catBox}
                  key={item.id}
                  onPress={() =>
                    props.navigation.navigate("ProductListScreen", {
                      title: item.name_fr,
                      item: item,
                    })
                  }
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: `${CATEGORY_IMAGE_URL}${item.image}` }}
                      style={styles.imageView}
                    ></Image>
                  </View>
                  <Text numberOfLines={2} style={styles.catName}>
                    {item.name_fr}
                  </Text>
                </TouchableOpacity>
              ) : null
            }
          />
        </>
      ) : null}
    </View>
  );
}

export default HomeCategoryView;

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
  imageContainer: {
    // backgroundColor: Colors.light_white,
    height: hp("7.5%"),
  },
  imageView: {
    resizeMode: "contain",
    // alignSelf: "center",
    height: hp("7.5%"),
    width: wp("14.5%"),
    // borderRadius: 5,
  },
  catName: {
    fontSize: wp("2.5%"),
    fontFamily: Fonts.Font_Semibold,
    textAlign: "center",
    color: Colors.secondry_text_color,
  },
});
