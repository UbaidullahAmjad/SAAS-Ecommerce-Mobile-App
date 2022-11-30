import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  OtrixSocialContainer,
} from "@component";
import { Input, Text, FormControl, Button } from "native-base";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import Icon from "react-native-vector-icons/Ionicons";
import Fonts from "../helpers/Fonts";
import { doLogin, doLoginGuest } from "@actions";

function LoginScreen(props) {
  const [formData, setData] = React.useState({
    email: "Issamgh@gmail.com",
    password: "123456789",
  });

  const [formDataGuest, setDataGuest] = React.useState({
    emailGuest: "",
    mobile_number: "",
  });
  const [state, setDatapassword] = React.useState({ secureEntry: true });
  const [loading, setloading] = React.useState(false);

  const [guestUser, setGuestUser] = React.useState(false);

  useEffect(() => {}, [props.navigation.navigate("ProfileScreen")]);

  const { email, password } = formData;
  const { emailGuest, mobile_number } = formDataGuest;
  return (
    <OtrixContainer>
      {/* Header */}
      {guestUser ? (
        <>
          <OtrixHeader customStyles={GlobalStyles.authHeader}>
            <Text style={[GlobalStyles.authtabbarText]}>Guest Account</Text>
            <Text style={GlobalStyles.authSubText}>
              Enter Some Information to continue as a guest
            </Text>
          </OtrixHeader>
          <OtrixDivider size={"md"} />

          <OtrixContent>
            {/* Login Form Start from here */}
            <FormControl isRequired>
              <Input
                value={formDataGuest.emailGuest}
                variant="outline"
                placeholder="Email Address"
                style={[GlobalStyles.textInputStyle]}
                onChangeText={(value) =>
                  setDataGuest({ ...formDataGuest, emailGuest: value })
                }
              />
              <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
                Error Name
              </FormControl.ErrorMessage>
            </FormControl>

            <OtrixDivider size={"sm"} />

            <FormControl isRequired>
              <Input
                value={formDataGuest.mobile_number}
                variant="outline"
                keyboardType="number-pad"
                placeholder="Mobile Number"
                style={GlobalStyles.textInputStyle}
                onChangeText={(value) =>
                  setDataGuest({ ...formDataGuest, mobile_number: value })
                }
              />
              <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
                {"Please enter valid Mobile Number"}
              </FormControl.ErrorMessage>
            </FormControl>

            <OtrixDivider size={"md"} />
            <Button
              size="md"
              variant="solid"
              bg={Colors.themeColor}
              style={GlobalStyles.button}
              onPress={async () => {
                // setloading(true);
                emailGuest != "" && mobile_number != ""
                  ? await props.doLoginGuest({
                      email: emailGuest,
                      mobilenumber: mobile_number,
                    })
                  : console.log("Both Fields of Guest Account are empty");
                // setTimeout(async () => {
                //   setloading(false);
                // }, 2000);
              }}
            >
              {/* {loading ? (
                <ActivityIndicator size={"small"} color="white" />
              ) : ( */}
              <Text style={GlobalStyles.buttonText}>Guest Now</Text>
              {/* )} */}
            </Button>
            <OtrixDivider size={"md"} />
            <View style={styles.registerView}>
              <Text style={styles.registerTxt}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("RegisterScreen")}
              >
                <Text style={styles.signupTxt}> Sign Up </Text>
              </TouchableOpacity>
            </View>
            <OtrixDivider size={"md"} />
            {/* Social Container Component */}
            {/* <OtrixSocialContainer /> */}
          </OtrixContent>
          {/* Content Start from here */}

          <View style={styles.registerView}>
            <Text style={[styles.registerTxt, { fontSize: wp("5%") }]}>
              Continue as a
            </Text>
            <TouchableOpacity
              onPress={() => {
                setGuestUser(false);
              }}
            >
              <Text style={[styles.signupTxt, { fontSize: wp("5%") }]}>
                {" "}
                Login User?{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <OtrixDivider size={"md"} />
          <OtrixDivider size={"md"} />
          <OtrixDivider size={"md"} />
        </>
      ) : (
        <>
          <OtrixHeader customStyles={GlobalStyles.authHeader}>
            <Text style={[GlobalStyles.authtabbarText]}>Login Account</Text>
            <Text style={GlobalStyles.authSubText}>
              Enter your email and password to login
            </Text>
          </OtrixHeader>
          <OtrixDivider size={"md"} />

          <OtrixContent>
            {/* Login Form Start from here */}
            <FormControl isRequired>
              <Input
                value={formData.email}
                variant="outline"
                placeholder="Email Address"
                style={[GlobalStyles.textInputStyle]}
                onChangeText={(value) => setData({ ...formData, email: value })}
              />
              <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
                Error Name
              </FormControl.ErrorMessage>
            </FormControl>
            <OtrixDivider size={"sm"} />
            <FormControl isRequired style={{ backgroundColor: Colors.white }}>
              <Input
                value={formData.password}
                variant="outline"
                placeholder="Password"
                style={[GlobalStyles.textInputStyle]}
                onChangeText={(value) =>
                  setData({ ...formData, password: value })
                }
                secureTextEntry={state.secureEntry}
                InputRightElement={
                  <TouchableOpacity
                    onPress={() =>
                      setDatapassword({
                        ...state,
                        secureEntry: !state.secureEntry,
                      })
                    }
                    style={[{ marginRight: wp("3%"), padding: 3 }]}
                  >
                    <Icon
                      name={state.secureEntry == true ? "eye" : "eye-off"}
                      size={18}
                      color={Colors.secondry_text_color}
                    />
                  </TouchableOpacity>
                }
              />
              <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
                Error Name
              </FormControl.ErrorMessage>
            </FormControl>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <OtrixDivider size={"md"} />
            <Button
              size="md"
              variant="solid"
              bg={Colors.themeColor}
              style={GlobalStyles.button}
              onPress={async () => {
                // setloading(true);
                await props.doLogin({ email: email, password: password });
                // setTimeout(async () => {
                //   setloading(false);
                // }, 2000);
              }}
            >
              {/* {loading ? (
                <ActivityIndicator size={"small"} color="white" />
              ) : ( */}
              <Text style={GlobalStyles.buttonText}>Login Now</Text>
              {/* )} */}
            </Button>
            <OtrixDivider size={"md"} />
            <View style={styles.registerView}>
              <Text style={styles.registerTxt}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("RegisterScreen")}
              >
                <Text style={styles.signupTxt}> Sign Up </Text>
              </TouchableOpacity>
            </View>
            <OtrixDivider size={"md"} />
            {/* Social Container Component */}
            {/* <OtrixSocialContainer /> */}
          </OtrixContent>
          {/* Content Start from here */}

          <View style={styles.registerView}>
            <Text style={[styles.registerTxt, { fontSize: wp("5%") }]}>
              Continue as a
            </Text>
            <TouchableOpacity
              onPress={() => {
                setGuestUser(true);
              }}
            >
              <Text style={[styles.signupTxt, { fontSize: wp("5%") }]}>
                {" "}
                Guest?{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <OtrixDivider size={"md"} />
          <OtrixDivider size={"md"} />
          <OtrixDivider size={"md"} />
        </>
      )}
    </OtrixContainer>
  );
}

function mapStateToProps({ params }) {
  return {};
}

export default connect(mapStateToProps, { doLogin, doLoginGuest })(LoginScreen);

const styles = StyleSheet.create({
  forgotPassword: {
    fontSize: wp("3%"),
    textAlign: "right",
    fontFamily: Fonts.Font_Reguler,
    color: Colors.link_color,
    padding: 5,
  },
  registerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerTxt: {
    fontSize: wp("3.5%"),
    textAlign: "center",
    fontFamily: Fonts.Font_Reguler,
    color: Colors.secondry_text_color,
  },
  signupTxt: {
    fontSize: wp("3.5%"),
    textAlign: "right",
    fontFamily: Fonts.Font_Semibold,
    color: Colors.link_color,
  },
});
