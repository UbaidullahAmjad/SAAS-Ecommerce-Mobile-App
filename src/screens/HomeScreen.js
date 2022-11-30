import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  HomeSlider,
  HomeCategoryView,
  SearchBar,
  NewProduct,
  TrendingProduct,
  BestDeal,
} from "@component";
import { HomeSkeleton } from "@skeleton";
import {
  addToWishList,
  requestCategoryData,
  requestProductyData,
  requestCarouselData,
} from "@actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, GlobalStyles } from "@helpers";
import { Avatar, Badge, ScrollView } from "native-base";
import { heart, offerBanner, avatarImg, avatarImg2 } from "@common";
import Fonts from "@helpers/Fonts";
import { _roundDimensions } from "@helpers/util";
import { _addToWishlist, logfunction } from "@helpers/FunctionHelper";
import { logo } from "@common";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function HomeScreen(props) {
  const [state, setState] = React.useState({
    notificationCount: 9,
    loading: true,
  });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dataGet();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const addToWish = async (id) => {
    let wishlistData = await _addToWishlist(id);
    props.addToWishList(wishlistData);
  };

  const dataGet = async () => {
    await props.requestCategoryData();
    await props.requestProductyData();
    await props.requestCarouselData();

    setTimeout(() => {
      setState({
        ...state,
        loading: false,
      });
    }, 2000);
  };

  useEffect(() => {
    dataGet();
  }, []);

  // useEffect(() => {
  //   let loadHomePage = setTimeout(
  //     () => setState({ ...state, loading: false }),
  //     300
  //   );
  //   return () => {
  //     clearTimeout(loadHomePage);
  //   };
  // }, []);

  const { loading } = state;
  const {
    authStatus,
    wishlistData,
    wishlistCount,
    category_Data,
    product_Data,
    carousel_Data,
  } = props;
  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.white }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <OtrixHeader customStyles={{ backgroundColor: Colors.white }}>
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={() => props.navigation.navigate("ProfileScreen")}
          >
            {/* {authStatus ? (
              <Avatar
                ml="3"
                size="sm"
                style={styles.avatarImg}
                source={avatarImg}
              ></Avatar>
            ) : ( */}
            <Avatar
              ml="3"
              size="sm"
              style={styles.avatarImg}
              source={avatarImg2}
            ></Avatar>
            {/* )} */}
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            {/* <Text style={styles.headingTxt}>Saas Ecommerce</Text> */}
            <Image source={logo} style={styles.bottomlogo} />
          </View>

          <View
            style={styles.headerRight}
            onPress={() => props.navigation.navigate("WishlistScreen")}
          ></View>

          {/* {!loading && (
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => props.navigation.navigate("WishlistScreen")}
          >
            <Image source={heart} style={styles.heartIcon}></Image>
            {wishlistCount > 0 && (
              <Badge
                style={[
                  GlobalStyles.badge,
                  {
                    height:
                      wishlistCount > 9
                        ? _roundDimensions()._height * 0.038
                        : _roundDimensions()._height * 0.032,
                    width:
                      wishlistCount > 9
                        ? _roundDimensions()._height * 0.038
                        : _roundDimensions()._height * 0.032,
                    borderRadius: _roundDimensions()._borderRadius,
                    right: wishlistCount > 9 ? -wp("0.6%") : wp("0.2%"),
                    top: wishlistCount > 9 ? -hp("0.5%") : hp("0.1%"),
                  },
                ]}
              >
                <Text
                  style={[
                    GlobalStyles.badgeText,
                    styles.countText,
                    { fontSize: wishlistCount > 9 ? wp("2.2%") : wp("3%") },
                  ]}
                >
                  {wishlistCount}
                </Text>
              </Badge>
            )}
          </TouchableOpacity>
        )} */}
        </OtrixHeader>

        {loading ? (
          <HomeSkeleton />
        ) : (
          <OtrixContent>
            {/* SearchBar Component */}
            <SearchBar navigation={props.navigation} />

            {/* HomeCategoryView Component */}
            <HomeCategoryView
              navigation={props.navigation}
              data={category_Data}
            />
            {/* HomeSlider Component */}
            {/* <HomeSlider data={carousel_Data} />
          <OtrixDivider size={"md"} /> */}

            {/* NewProduct Component */}
            <NewProduct
              navigation={props.navigation}
              wishlistArr={wishlistData}
              addToWishlist={addToWish}
              data={product_Data}
            />

            {/* Banner Image */}
            <Image source={offerBanner} style={styles.bannerStyle} />
            <OtrixDivider size={"sm"} />

            {/* BestDeal Component */}
            {/* <BestDeal navigation={props.navigation} wishlistArr={wishlistData} addToWishlist={addToWish} /> */}
            <OtrixDivider size={"sm"} />

            {/* TrendingProduct Component */}
            {/* <TrendingProduct navigation={props.navigation} wishlistArr={wishlistData} addToWishlist={addToWish} /> */}
          </OtrixContent>
        )}
      </ScrollView>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    authStatus: state.auth.authStatus,
    wishlistData: state.wishlist.wishlistData,
    wishlistCount: state.wishlist.wishlistCount,
    category_Data: state.Home.category_Data,
    product_Data: state.Home.product_Data,
    carousel_Data: state.Home.carousel_Data,
    LoginUser: state.auth.LoginUser,
    registerUser: state.auth.registerUser,
  };
}

export default connect(mapStateToProps, {
  addToWishList,
  requestCategoryData,
  requestProductyData,
  requestCarouselData,
})(HomeScreen);

const styles = StyleSheet.create({
  headerRight: {
    flex: 0.15,
    marginRight: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    width: wp("6.5%"),
    height: hp("6.5%"),
    resizeMode: "contain",
    tintColor: Colors.custom_pink,
  },
  bottomlogo: {
    height: hp("6%"),
    width: wp("20%"),
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: Colors.link_color,
  },
  headerCenter: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  headingTxt: {
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("6.5%"),
    color: Colors.themeColor,
  },
  headerLeft: {
    flex: 0.15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bannerStyle: {
    resizeMode: "contain",
    width: wp("100%"),
    height: hp("16%"),
    alignSelf: "center",
  },
  avatarImg: {
    height: hp("7%"),
    width: wp("7%"),
    resizeMode: "contain",
  },
});
