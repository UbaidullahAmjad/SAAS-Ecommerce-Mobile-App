import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { requestInit, UpdateUserProfile } from "@actions";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtirxBackButton,
  OtrixDivider,
} from "@component";
import {
  Input,
  Text,
  FormControl,
  Button,
  InfoOutlineIcon,
  Select,
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
import CountryArr from "../component/items/CountryArr";

function EditProfileScreen(props) {
  const [state, setData] = React.useState({
    id: props?.LoginUser?.id,
    first_name: props?.LoginUser?.first_name,
    last_name: props?.LoginUser?.last_name,
    email: props?.LoginUser?.email,
    mobilenumber: props?.LoginUser?.mobilenumber,
    address: props?.LoginUser?.address,
    zip_code: props?.LoginUser?.zip_code,
    country: props?.LoginUser?.country,
    city: props?.LoginUser?.city,
    password: "",
  });
  const [loading, setloading] = React.useState(false);

  const [stateSubmited, setSubmitted] = React.useState({
    submited: false,
  });
  const [statePassword, setDatapassword] = React.useState({
    secureEntry: true,
  });

  useEffect(() => {
    console.log("User Data: ", props.LoginUser);
  }, []);

  const _updateProfile = async () => {
    // setloading(true);
    await props.UpdateUserProfile(state);
    setTimeout(() => {
      props.navigation.navigate("MainScreen");
      // setloading(false);
    }, 2000);
  };

  const { first_name, last_name, email, mobilenumber } = state;
  const { submited } = stateSubmited;
  return (
    <OtrixContainer>
      {/* Header */}
      <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
        <TouchableOpacity
          style={GlobalStyles.headerLeft}
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={GlobalStyles.headingTxt}> Edit Profile</Text>
        </View>
      </OtrixHeader>
      <OtrixDivider size={"md"} />
      {/* Content Start from here */}
      <OtrixContent>
        {/* Profile  Start from here */}
        <FormControl
          isRequired
          isInvalid={submited && first_name == "" ? true : false}
        >
          <Input
            variant="outline"
            value={first_name}
            placeholder="First Name"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...state, first_name: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            First Name is required
          </FormControl.ErrorMessage>
        </FormControl>

        <OtrixDivider size={"md"} />
        <FormControl>
          <Input
            variant="outline"
            value={last_name}
            placeholder="Last Name"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...state, last_name: value })}
          />
        </FormControl>
        <OtrixDivider size={"md"} />

        <FormControl
          isRequired
          isInvalid={submited && email == "" ? true : false}
        >
          <Input
            isDisabled={true}
            variant="outline"
            value={email}
            keyboardType="email-address"
            placeholder="Email Address"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...state, email: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            Email is required
          </FormControl.ErrorMessage>
        </FormControl>

        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Input
            variant="outline"
            placeholder="Password"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...state, password: value })}
            secureTextEntry={statePassword.secureEntry}
            InputRightElement={
              <TouchableOpacity
                onPress={() =>
                  setDatapassword({
                    ...statePassword,
                    secureEntry: !statePassword.secureEntry,
                  })
                }
                style={{ marginRight: wp("3%") }}
              >
                <Icon
                  name={statePassword.secureEntry == true ? "eye" : "eye-off"}
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

        <OtrixDivider size={"md"} />
        <FormControl
          isRequired
          isInvalid={submited && mobilenumber == "" ? true : false}
        >
          <Input
            variant="outline"
            value={mobilenumber}
            keyboardType="number-pad"
            placeholder="Mobile Number"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...state, mobilenumber: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            Mobile Number is required
          </FormControl.ErrorMessage>
        </FormControl>

        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Select
            selectedValue={state.country}
            minWidth="200"
            accessibilityLabel="Select Country"
            placeholder="Select Country"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) =>
              setData({ ...state, country: itemValue })
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
            value={state.city}
            placeholder="City"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...state, city: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            City is required
          </FormControl.ErrorMessage>
        </FormControl>

        <OtrixDivider size={"sm"} />
        <FormControl isRequired>
          <Input
            variant="outline"
            value={state.zip_code}
            placeholder="zip_code"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...state, zip_code: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            Postcode is required
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"sm"} />

        <FormControl isRequired>
          <TextArea
            value={state.address}
            variant="outline"
            placeholder="Your address"
            style={GlobalStyles.textAreaInputStyle}
            onChangeText={(value) => setData({ ...state, address: value })}
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
          onPress={() => _updateProfile()}
        >
          {/* {loading ? (
            <ActivityIndicator size={"small"} color="white" />
          ) : ( */}
          <Text style={GlobalStyles.buttonText}>Update Profile</Text>
          {/* )} */}
        </Button>
        <OtrixDivider size={"md"} />
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    LoginUser: state.auth.LoginUser,
    registerUser: state.auth.registerUser,
  };
}

export default connect(mapStateToProps, { requestInit, UpdateUserProfile })(
  EditProfileScreen
);

const styles = StyleSheet.create({});
