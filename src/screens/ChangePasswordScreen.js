import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { requestInit } from '@actions';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtirxBackButton, OtrixDivider
} from '@component';
import { Input, Text, FormControl, Button, InfoOutlineIcon } from "native-base"
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from "../helpers/Fonts";

function ChangePasswordScreen(props) {
    const [formData, setData] = React.useState({ old_password: '', new_password: '', confirm_password: '', submited: false });
    const [state, setDatapassword] = React.useState({ secureEntry: true, secureEntry2: true, secureEntry3: true });

    const { secureEntry, secureEntry2, secureEntry3 } = state;
    const { old_password, new_password, confirm_password, submited } = formData;

    return (
        <OtrixContainer>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}>  Update Password</Text>
                </View>
            </OtrixHeader>
            <OtrixDivider size={'md'} />
            {/* Content Start from here */}
            <OtrixContent>

                {/* Password  Start from here */}
                <FormControl isRequired isInvalid={submited && old_password == '' ? true : false} style={{ backgroundColor: Colors.white }}>
                    <Input variant="outline" placeholder="Old Password" style={[GlobalStyles.textInputStyle,]}
                        onChangeText={(value) => setData({ ...formData, old_password: value })}
                        secureTextEntry={secureEntry}
                        value={old_password}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry: !state.secureEntry })} style={[{ marginRight: wp('3%') }]}>
                                <Icon name={state.secureEntry == true ? "eye" : "eye-off"} size={18} color={Colors.secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        Old Password is required
                    </FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'md'} />

                <FormControl isRequired isInvalid={submited && new_password == '' ? true : false} style={{ backgroundColor: Colors.white }}>
                    <Input variant="outline" placeholder="New Password" style={[GlobalStyles.textInputStyle,]}
                        onChangeText={(value) => setData({ ...formData, new_password: value })}
                        secureTextEntry={secureEntry2}
                        value={new_password}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry2: !state.secureEntry2 })} style={[{ marginRight: wp('3%') }]}>
                                <Icon name={state.secureEntry2 == true ? "eye" : "eye-off"} size={18} color={Colors.secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        New Password is required
                    </FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'md'} />

                <FormControl isRequired isInvalid={submited && confirm_password == '' ? true : false} style={{ backgroundColor: Colors.white }}>
                    <Input variant="outline" placeholder="Confirm Password" style={[GlobalStyles.textInputStyle,]}
                        onChangeText={(value) => setData({ ...formData, confirm_password: value })}
                        secureTextEntry={secureEntry3}
                        value={confirm_password}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry3: !state.secureEntry3 })} style={[{ marginRight: wp('3%') }]}>
                                <Icon name={state.secureEntry3 == true ? "eye" : "eye-off"} size={18} color={Colors.secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        Confirm Password is required
                    </FormControl.ErrorMessage>
                </FormControl>

                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={GlobalStyles.button}
                    onPress={() => props.navigation.navigate('MainScreen')}
                >
                    <Text style={GlobalStyles.buttonText}>Update</Text>
                </Button>
                <OtrixDivider size={'md'} />

            </OtrixContent>

        </OtrixContainer >
    )

}

function mapStateToProps({ params }) {
    return {}
}

export default connect(mapStateToProps, { requestInit })(ChangePasswordScreen);

const styles = StyleSheet.create({

});