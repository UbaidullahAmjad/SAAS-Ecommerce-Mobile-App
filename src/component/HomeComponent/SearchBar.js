import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import { homeSlider1, homeSlider2, homeSlider3, homeSlider4 } from '@common';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Input } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import Fonts from '@helpers/Fonts';

function SearchBar(props) {
    const images = [
        homeSlider1,
        homeSlider2,
        homeSlider3,
        homeSlider4,
    ];
    return (
        <TouchableOpacity style={styles.searchView} onPress={() => props.navigation.navigate('SearchScreen')}>
            <View style={styles.searchContainer}>
                <Icon name="search" style={styles.searchIcon} />
                <View style={styles.verticalLine}></View>
                <Text style={styles.textInputSearchStyle}>Search Products</Text>
            </View>

        </TouchableOpacity>


    )
}

export default SearchBar;
const styles = StyleSheet.create({
    searchView: {
        height: hp('9%'),
        backgroundColor: Colors.white,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: Colors.light_white,
        height: hp('6%'),

    },
    searchIcon: {
        flex: 0.10,
        color: Colors.secondry_text_color,
        fontSize: wp('3.5%'),
        alignSelf: 'center',
        textAlign: 'center'
    },
    verticalLine: {
        width: 0.07,
        height: hp('2.5%'),
        backgroundColor: Colors.secondry_text_color,
    },
    textInputSearchStyle: {
        flex: 0.90,
        fontFamily: Fonts.Font_Reguler,
        backgroundColor: Colors.light_white,
        fontSize: wp('3.2%'),
        color: Colors.secondry_text_color,

    },
});