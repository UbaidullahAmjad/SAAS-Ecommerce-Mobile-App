import React from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import {
  SplashScreen,
  HomeScreen,
  SettingScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  CategoryScreen,
  CartScreen,
  ProfileScreen,
  ProductListScreen,
  ProductDetailScreen,
  CheckoutScreen,
  EditProfileScreen,
  ChangePasswordScreen,
  ManageAddressScreen,
  WishlistScreen,
  OrderScreen,
  OrderDetailScreen,
  LanguageScreen,
  TermsandconditionScreen,
  PrivacyPolicyScreen,
  NotificationScreen,
  SearchScreen,
} from "./screens/index";
import {
  bottomHome,
  bottomHomeFill,
  bottomCategory,
  bottomCategoryFill,
  bottomCart,
  bottomProfile,
  bottomProfileFill,
  bottomSetting,
  bottomSettingFill,
} from "@common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, GlobalStyles } from "@helpers";
import { Badge } from "native-base";
import Fonts from "./helpers/Fonts";
import { _roundDimensions } from "./helpers/util";

const SettingStack = createStackNavigator();
let cartCount = 0;

function SettingStackNavigation() {
  return (
    <SettingStack.Navigator initialRouteName="SettingScreen">
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </SettingStack.Navigator>
  );
}

//Auth Stack
const AuthStack = createStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="LoginScreen">
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </AuthStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function MyTabs(props) {
  let cartCount = props.cartCounts;
  let authStatus = props.auth;

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      backBehavior={"order"}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: { position: "absolute" },
        // unmountOnBlur: true,
        tabBarShowLabel: false,
        lazy: true,
        tabBarStyle: styles.tabbarStyle,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              square
              source={focused ? bottomHomeFill : bottomHome}
              style={[styles.bottomTabIcon]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              square
              source={focused ? bottomCategoryFill : bottomCategory}
              style={[styles.bottomTabIcon]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          tabBarIcon: ({ focused, tintColor }) => (
            <View style={[styles.cartIconView, { elevation: 5 }]}>
              <Image
                square
                source={focused ? bottomCart : bottomCart}
                style={[
                  styles.bottomTabIcon,
                  {
                    top: cartCount > 9 ? hp("0.8%") : hp("0.2%"),
                    right: wp("1%"),
                    height: wp("7%"),
                    width: wp("7%"),
                  },
                ]}
              />
              {cartCount > 0 && (
                <Badge
                  style={[
                    GlobalStyles.badge,
                    styles.count,
                    {
                      marginRight: -wp("2.8%"),
                      marginTop: -hp("0.9%"),
                      // height:
                      //   cartCount > 9
                      //     ? _roundDimensions()._height * 0.039
                      //     : _roundDimensions()._height * 0.032,
                      // width:
                      //   cartCount > 9
                      //     ? _roundDimensions()._height * 0.039
                      //     : _roundDimensions()._height * 0.032,
                      borderRadius: _roundDimensions()._borderRadius,
                      right: cartCount > 9 ? wp("0.3") : wp("1.2%"),
                      top: cartCount > 9 ? hp("0.1%") : hp("0.6%"),
                    },
                  ]}
                >
                  <Text
                    style={[
                      GlobalStyles.badgeText,
                      styles.countText,
                      { fontSize: cartCount > 9 ? wp("2.4%") : wp("3%") },
                    ]}
                  >
                    {cartCount}
                  </Text>
                </Badge>
              )}
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={authStatus == true ? ProfileScreen : AuthNavigator}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              square
              source={focused ? bottomProfileFill : bottomProfile}
              style={[styles.bottomTabIcon]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="SettingScreen"
        component={SettingStackNavigation}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              square
              source={focused ? bottomSettingFill : bottomSetting}
              style={[styles.bottomTabIcon]}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();
function AppNavigator(props) {
  const { cartCount, authStatus } = props;
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen {...props} name="MainScreen" component={() => <MyTabs cartCounts={cartCount} auth={authStatus}></MyTabs>} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} countProp={cartCount} initialParams={{ 'count': cartCount }} /> */}

          <Stack.Screen
            {...props}
            name="MainScreen"
            options={{ headerShown: false }}
          >
            {(props) => <MyTabs cartCounts={cartCount} auth={authStatus} />}
          </Stack.Screen>

          <Stack.Screen
            name="LoginScreen"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductListScreen"
            component={ProductListScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ManageAddressScreen"
            component={ManageAddressScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="WishlistScreen"
            component={WishlistScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="OrderScreen"
            component={OrderScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="LanguageScreen"
            component={LanguageScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="TermsandconditionScreen"
            component={TermsandconditionScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Modal transparent={true} visible={props?.loadingState}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={"black"} size={"large"} />
        </View>
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    cartCount: state.cart.cartCount ? state.cart.cartCount : null,
    authStatus: state.auth.authStatus,
    loadingState: state.Home.loadingState,
  };
}

export default connect(mapStateToProps, {})(AppNavigator);

const styles = StyleSheet.create({
  bottomTabIcon: {
    height: wp("6%"),
    width: wp("6%"),
  },
  tabbarStyle: {
    backgroundColor: Colors.white,
    height: Platform.isPad === true ? wp("10%") : wp("15%"),
    paddingTop: Platform.isPad == true ? 0 : wp("1%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
  },
  cartIconView: {
    backgroundColor: Colors.light_white,
    height: _roundDimensions()._height * 0.068,
    width: _roundDimensions()._height * 0.068,
    borderRadius: _roundDimensions()._borderRadius,
    justifyContent: "center",
    alignItems: "center",
    bottom: hp("2.5%"),
  },
  count: {
    backgroundColor: Colors.white,
  },
  countText: {
    color: Colors.link_color,
    fontFamily: Fonts.Font_Bold,
  },
});
