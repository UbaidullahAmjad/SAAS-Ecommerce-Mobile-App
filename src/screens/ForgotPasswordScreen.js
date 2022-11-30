import React from "react";
import { requestInit, forget_Password } from "@actions";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
} from "@component";
import { Input, Text, FormControl, Button } from "native-base";
import { connect } from "react-redux";
import { GlobalStyles, Colors } from "@helpers";
import { ActivityIndicator, ToastAndroid } from "react-native";
import axios from "axios";
import { API_URL } from "@common/config";

function ForgotPasswordScreen(props) {
  const [formData, setData] = React.useState({ email: "Issamgh@gmail.com" });
  const [loading, setloading] = React.useState(false);

  const _forgetPassword = async () => {
    setloading(true);
    var data = JSON.stringify({
      email: formData.email,
    });

    var config = {
      method: "post",
      url: `${API_URL}forgot_password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          setloading(false);
          ToastAndroid.show(response.data.message, ToastAndroid.LONG);
          props.navigation.navigate("LoginScreen");
        } else {
          setloading(false);
          ToastAndroid.show(response.data.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setloading(false);
        ToastAndroid.show("Record not found!", ToastAndroid.LONG);
        console.log("Forget Password API error:", error);
      });
  };
  return (
    <OtrixContainer>
      {/* Header */}
      <OtrixHeader customStyles={GlobalStyles.authHeader}>
        <Text style={[GlobalStyles.authtabbarText]}>Forgot Password</Text>
        <Text style={GlobalStyles.authSubText}>
          Submit the email you signed up with to reset your password
        </Text>
      </OtrixHeader>
      <OtrixDivider size={"md"} />

      {/* Content Start from here */}
      <OtrixContent>
        {/* Forgot password form Start from here */}
        <FormControl isRequired>
          <Input
            value={formData.email}
            variant="outline"
            placeholder="Email Address"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, email: value })}
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"md"} />
        <Button
          size="md"
          variant="solid"
          bg={Colors.themeColor}
          style={GlobalStyles.button}
          onPress={() => {
            _forgetPassword();
          }}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color="white" />
          ) : (
            <Text style={GlobalStyles.buttonText}>Submit</Text>
          )}
        </Button>
        <OtrixDivider size={"md"} />
        <Button
          size="md"
          variant="outline"
          onPress={() => props.navigation.navigate("LoginScreen")}
        >
          <Text style={[GlobalStyles.buttonText, { color: Colors.black }]}>
            Back to login
          </Text>
        </Button>
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps({ params }) {
  return {};
}

export default connect(mapStateToProps, { requestInit, forget_Password })(
  ForgotPasswordScreen
);
