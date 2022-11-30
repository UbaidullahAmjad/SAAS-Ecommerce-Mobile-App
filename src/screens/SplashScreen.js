import React, { useEffect } from "react";
import {
    View,
    Animated,
    Easing,
    LogBox
} from "react-native";
import { requestInit } from '@actions';
import { splashlogo } from '@common';
import { OtrixContainer } from '@component';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '@helpers'

const animatedValue = new Animated.Value(0);

function SplashScreen(props) {

    const navigateToMain = () => {
        let navTo = setTimeout(() => props.loadApplication &&
            props.navigation.reset({
                index: 0,
                routes: [{ name: props.navScreen }]
            }), 300)

        return () => {
            clearTimeout(navTo);
        };
    }

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true, // Add this line

        }).start();

        let loadApp = setTimeout(() => props.requestInit(), 1500);

        return () => {
            clearTimeout(loadApp);
        };
    }, [

        navigateToMain()

    ]);


    return (
        <OtrixContainer>
            <View style={{ backgroundColor: Colors.white, flex: 1 }}>
                <Animated.Image source={splashlogo} resizeMode='contain' style={{
                    position: 'absolute',
                    left: wp('35%'),
                    top: hp('20%'),
                    tintColor: Colors.link_color,
                    height: hp('10%'),
                    width: wp('10%'),
                    transform: [
                        {
                            translateX: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 32]
                            })
                        },
                        {
                            translateY: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 150]
                            })
                        },
                        {
                            scaleX: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 8]
                            })
                        },
                        {
                            scaleY: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 10]
                            })
                        }
                    ]
                }}

                />
            </View>
        </OtrixContainer >
    )

}

const mapStateToProps = (state) => ({
    loadApplication: state.mainScreenInit.loadApplication,
    navScreen: state.mainScreenInit.navScreen
});


export default connect(mapStateToProps, { requestInit })(SplashScreen);
