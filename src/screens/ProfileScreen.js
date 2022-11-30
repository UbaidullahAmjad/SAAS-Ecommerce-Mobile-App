import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { OtrixContainer, OtrixContent, OtrixDivider } from "@component";
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
  doLogout,
} from "@actions";
// import { avatarImg } from "@common";
import Fonts from "@helpers/Fonts";
import Icon from "react-native-vector-icons/FontAwesome5";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from "react-native-root-toast";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Avatar, Badge, ScrollView } from "native-base";
import { heart, offerBanner, avatarImg, avatarImg2 } from "@common";

function ProfileScreen(props) {
  const [state, setState] = React.useState({ profileImage: "" });

  const openImagePicker = async (res) => {
    setState({
      ...state,
      profileImage: res.assets[0]["uri"],
    });
  };

  const { profileImage } = state;
  const { LoginUser } = props;

  console.log("LoginUser ", LoginUser);
  console.log("RES ", profileImage);

  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      <View style={styles.container}>
        {/* <TouchableOpacity
         style={styles.imageView}
          onPress={() =>
            launchImageLibrary(
              {
                mediaType: "photo",
                includeBase64: false,
                maxHeight: 400,
                maxWidth: 400,
              },
              (response) => {
                openImagePicker(response);
              }
            )
          }
       > */}

        <Image source={avatarImg2} style={styles.avatarImg}></Image>
        {/* {profileImage != "" ? (
            <Image source={{ uri: profileImage }} style={styles.image}></Image>
          ) : (
            <Image source={avatarImg} style={styles.image}></Image>
          )} */}
        {/* </TouchableOpacity> */}
        <OtrixDivider size={"sm"} />
        <Text style={styles.username}>
          {LoginUser != null
            ? LoginUser?.id
              ? LoginUser?.last_name
              : "Guest User"
            : "user name"}
        </Text>
        <Text style={styles.email}>
          {LoginUser != null ? LoginUser?.email : "user email address"}
        </Text>
      </View>

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          marginTop: hp("2%"),
        }}
      >
        <TouchableOpacity
          style={[
            GlobalStyles.headerLeft,
            { zIndex: 999999999, flex: 0.9, alignItems: "flex-start" },
          ]}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={GlobalStyles.headingTxt}> My Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Content Start from here */}
      <OtrixContent customStyles={styles.contentView}>
        <OtrixDivider size={"lg"} />

        {LoginUser?.id ? (
          <TouchableOpacity
            style={styles.listView}
            onPress={() => props.navigation.navigate("EditProfileScreen")}
          >
            <View style={[styles.leftSide, { left: wp("1%") }]}>
              <Icon name="user-edit" style={styles.icon} />
            </View>
            <View style={styles.center}>
              <Text style={styles.listTitle}>Edit Profile</Text>
            </View>
            <View style={styles.rightSide}>
              <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
        ) : null}

        {/* <TouchableOpacity style={styles.listView} onPress={() => props.navigation.navigate('WishlistScreen')}>
                    <View style={styles.leftSide}>
                        <Fontisto name="heart" style={styles.icon} />
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.listTitle}>Wishlist</Text>
                    </View>
                    <View style={styles.rightSide}>
                        <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
                    </View>
                </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.listView}
          onPress={() => props.navigation.navigate("ManageAddressScreen")}
        >
          <View style={styles.leftSide}>
            <Icon
              name="address-book"
              style={[styles.icon, { fontSize: wp("5.4%") }]}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.listTitle}>Manage Address</Text>
          </View>
          <View style={styles.rightSide}>
            <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
          </View>
        </TouchableOpacity> */}

        {LoginUser?.id && props.OrderList != null ? (
          <TouchableOpacity
            style={styles.listView}
            onPress={() =>
              props.navigation.navigate("OrderScreen", {
                orderScreen: "order",
              })
            }
          >
            <View style={styles.leftSide}>
              <Fontisto
                name="shopping-bag-1"
                style={[styles.icon, { fontSize: wp("5.4%") }]}
              />
            </View>
            <View style={styles.center}>
              <Text style={styles.listTitle}>My Orders</Text>
            </View>
            <View style={styles.rightSide}>
              <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
        ) : null}

        {/* <TouchableOpacity
          style={styles.listView}
          onPress={() => props.navigation.navigate("ChangePasswordScreen")}
        >
          <View style={styles.leftSide}>
            <Fontisto name="locked" style={styles.icon} />
          </View>
          <View style={styles.center}>
            <Text style={styles.listTitle}>Change Password</Text>
          </View>
          <View style={styles.rightSide}>
            <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.listView}
          onPress={() => {
            props.doLogout(),
              Toast.show("Successfully Logout", {
                duration: 2000,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              }),
              props.navigation.navigate("HomeScreen");
          }}
        >
          <View style={styles.leftSide}>
            <AntDesign name="logout" style={styles.icon} />
          </View>
          <View style={styles.center}>
            <Text style={styles.listTitle}>Logout</Text>
          </View>
          <View style={styles.rightSide}>
            <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
          </View>
        </TouchableOpacity>
      </OtrixContent>
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

export default connect(mapStateToProps, {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  doLogout,
})(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    height: hp("25%"),
    position: "relative",
    backgroundColor: Colors.light_white,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 99,
    marginBottom: hp("4%"),
  },
  imageView: {
    justifyContent: "center",
    backgroundColor: Colors.white,
    alignItems: "center",
    borderRadius: wp("0.8%"),
    elevation: 2,
    height: hp("11%"),
    width: wp("23%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    resizeMode: "contain",
    height: undefined,
    aspectRatio: 1,
    width: wp("20%"),
    alignSelf: "center",
  },
  username: {
    color: Colors.text_color,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4%"),
  },
  email: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Regular,
    fontSize: wp("3.5%"),
    marginTop: hp("0.5%"),
  },
  contentView: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    borderTopRightRadius: wp("13%"),
    borderTopLeftRadius: wp("13%"),
  },
  listView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("1%"),
  },
  leftSide: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp("2%"),
    flex: 0.1,
  },
  center: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 0.8,
    padding: 10,
    marginHorizontal: wp("3%"),
  },
  rightSide: {
    flex: 0.1,
  },
  listTitle: {
    color: Colors.text_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
  },
  icon: {
    fontSize: wp("5.5%"),
    color: Colors.secondry_text_color,
  },
  rightIcon: {
    fontSize: wp("3.5%"),
    color: Colors.secondry_text_color,
  },
  avatarImg: {
    height: hp("10.5%"),
    width: wp("22%"),
    resizeMode: "cover",
  },
});
