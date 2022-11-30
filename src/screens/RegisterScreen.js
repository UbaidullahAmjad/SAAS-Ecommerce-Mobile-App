import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { requestInit, requestRegisterUser } from "@actions";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  OtrixSocialContainer,
} from "@component";
import {
  Input,
  Text,
  FormControl,
  Button,
  Select,
  InfoOutlineIcon,
  CheckIcon,
  TextArea,
} from "native-base";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import Icon from "react-native-vector-icons/Ionicons";
import Fonts from "@helpers/Fonts";
import CountryArr from "../component/items/CountryArr";

function RegisterScreen(props) {
  const [formData, setData] = React.useState({});
  const [state, setDatapassword] = React.useState({ secureEntry: true });
  const [loading, setloading] = React.useState(false);

  const _registerUser = async () => {
    // setloading(true);
    await props.requestRegisterUser(formData);
    // setTimeout(async () => {
    //   setloading(false);
    // }, 2000);

    // props.navigation.navigate("LoginScreen");
  };

  useEffect(() => {
    setData({
      ...formData,
      portal: "webshop",
    });
  }, []);

  return (
    <OtrixContainer>
      {/* Header */}
      <OtrixHeader customStyles={GlobalStyles.authHeader}>
        <Text style={[GlobalStyles.authtabbarText]}>Register Account</Text>
        <Text style={GlobalStyles.authSubText}>
          Create account to continue shopping with otrixweb
        </Text>
      </OtrixHeader>
      <OtrixDivider size={"md"} />

      {/* Content Start from here */}
      <OtrixContent>
        {/* Registration Form Start from here */}
        <FormControl isRequired>
          <Input
            variant="outline"
            placeholder="Full Name"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) =>
              setData({ ...formData, first_name: value })
            }
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            {"Please enter valid name"}
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Input
            variant="outline"
            placeholder="Last Name"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, last_name: value })}
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Input
            variant="outline"
            placeholder="Email Address"
            style={GlobalStyles.textInputStyle}
            keyboardType="email-address"
            onChangeText={(value) => setData({ ...formData, email: value })}
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            {"Please enter valid email address"}
          </FormControl.ErrorMessage>
        </FormControl>

        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Input
            variant="outline"
            placeholder="Password"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, password: value })}
            secureTextEntry={state.secureEntry}
            InputRightElement={
              <TouchableOpacity
                onPress={() =>
                  setDatapassword({ ...state, secureEntry: !state.secureEntry })
                }
                style={{ marginRight: wp("3%") }}
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
        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Input
            variant="outline"
            placeholder="Confirm Password"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) =>
              setData({ ...formData, confirm_password: value })
            }
            secureTextEntry={state.secureEntry}
            InputRightElement={
              <TouchableOpacity
                onPress={() =>
                  setDatapassword({ ...state, secureEntry: !state.secureEntry })
                }
                style={{ marginRight: wp("3%") }}
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

        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Input
            variant="outline"
            keyboardType="number-pad"
            placeholder="Mobile Number"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) =>
              setData({ ...formData, mobile_number: value })
            }
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            {"Please enter valid Mobile Number"}
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Select
            selectedValue={formData.country}
            minWidth="200"
            accessibilityLabel="Select Country"
            placeholder="Select Country"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) =>
              setData({ ...formData, country: itemValue })
            }
          >
            {CountryArr.map((item, index) => (
              <Select.Item label={item} value={item} key={index} />
            ))}
          </Select>
        </FormControl>

        <OtrixDivider size={"sm"} />

        <FormControl isRequired>
          <Input
            variant="outline"
            value={formData.city}
            placeholder="City"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, city: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            City is required
          </FormControl.ErrorMessage>
        </FormControl>

        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Input
            variant="outline"
            value={formData.postcode}
            placeholder="Postcode"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, zip_code: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            Postcode is required
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"sm"} />

        <FormControl isRequired>
          <TextArea
            value={formData.address}
            variant="outline"
            placeholder="Your address"
            style={GlobalStyles.textAreaInputStyle}
            onChangeText={(value) => setData({ ...formData, address: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            Address is required
          </FormControl.ErrorMessage>
        </FormControl>

        <OtrixDivider size={"md"} />
        <Button
          size="md"
          variant="solid"
          bg={Colors.themeColor}
          style={GlobalStyles.button}
          onPress={() => _registerUser()}
        >
          {/* {loading ? (
            <ActivityIndicator size={"small"} color="white" />
          ) : ( */}
          <Text style={GlobalStyles.buttonText}>Register Now</Text>
          {/* )} */}
        </Button>
        <OtrixDivider size={"md"} />
        <View style={styles.registerView}>
          <Text style={styles.registerTxt}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("LoginScreen")}
          >
            <Text style={styles.signupTxt}> Sign In </Text>
          </TouchableOpacity>
        </View>
        <OtrixDivider size={"md"} />

        {/* Social Container Component */}
        {/* <OtrixSocialContainer /> */}
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps({ params }) {
  return {};
}

export default connect(mapStateToProps, { requestInit, requestRegisterUser })(
  RegisterScreen
);

const styles = StyleSheet.create({
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
