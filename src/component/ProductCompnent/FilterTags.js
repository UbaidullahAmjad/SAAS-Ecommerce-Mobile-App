import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '@helpers/Fonts';
import { checkaround } from '@common';

function FilterTags(props) {
    let selectedTag = false;
    if (props.selected.includes(props.tagID)) {
        selectedTag = true;
    }

    return (
        <TouchableOpacity style={[styles.filterBox, selectedTag ? styles.borderBox : styles.unborderBox]} onPress={() => props.onFilterPress(props.tagID)}>
            {selectedTag && <Image source={checkaround} style={styles.imageView} />}
            <Text style={styles.tagStyle}>
                {props.tagName}
            </Text>
        </TouchableOpacity>
    )
}

export default FilterTags;

const styles = StyleSheet.create({
    filterBox: {
        paddingHorizontal: wp('3.2%'),
        paddingVertical: hp('1.2%'),
        flexDirection: 'row',
        marginHorizontal: wp('2%'),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: Colors.light_gray,
        borderWidth: 1,
        marginVertical: hp('0.5%'),
        alignItems: 'center',
    },
    tagStyle: {
        color: Colors.black,
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3%')
    },
    borderBox: {
        borderColor: Colors.themeColor,
        borderWidth: 1,
    },

    imageView: {
        height: hp('2%'),
        width: wp('4%'),
        borderRadius: 50,
        marginHorizontal: wp('1%')
    }
});
