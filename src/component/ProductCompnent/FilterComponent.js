import React, { useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import OtrixHeader from '../OtrixComponent/OtrixHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '@helpers/Fonts';
import { close, checkaround, checkround2 } from '@common';
import { _roundDimensions } from '@helpers/util';
import OtrixDivider from '../OtrixComponent/OtrixDivider';
import FilterTagsDummy from '../items/FilterTagsDummy'
import SizeTagDummy from '../items/SizeTagDummy'
import FilterTags from './FilterTags';
import SizeTags from './SizeTags';
import RangeSlider from './RangeSlider';
import { Button } from "native-base"

function FilterComponent(props) {


    return (
        <View>
            {Platform.OS === 'ios' &&
                <View style={{ height: hp('5%') }}></View>
            }
            <View style={styles.modelView}>

                {/* Model header */}
                <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                    <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.closeFilter()}>
                        <View style={styles.round} >
                            <Image source={close} style={styles.button} />
                        </View>
                    </TouchableOpacity>
                    <View style={[GlobalStyles.headerCenter]}>
                        <Text style={GlobalStyles.headingTxt}>{'Filter'}</Text>
                    </View>
                    <TouchableOpacity style={styles.headerRight} onPress={() => props.closeFilter()} >
                        <Text style={styles.clearTxt}> Clear All</Text>
                    </TouchableOpacity>
                </OtrixHeader>
                <OtrixDivider size={'sm'} />
                <View style={GlobalStyles.horizontalLine}></View>
                <OtrixDivider size={'md'} />


                <View style={styles.filterView}>

                    {/* Brand View  */}
                    <Text style={styles.titleTxt}>Tags:</Text>
                    <OtrixDivider size={'sm'} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: wp('1%') }}>
                        {
                            FilterTagsDummy.map((item, index) =>
                                <FilterTags tagName={item.name} tagID={item.id} key={item.id} selected={props.selectedFilter} onFilterPress={props.onFilterPress} />
                            )
                        }
                    </View>

                    <OtrixDivider size={'lg'} />
                    <View style={GlobalStyles.horizontalLine}></View>
                    <OtrixDivider size={'md'} />

                    {/* Price Range View  */}
                    <Text style={styles.titleTxt}>Price Range:</Text>
                    <View style={styles.rangeView}>
                        <RangeSlider
                            name="Price"
                            icon="ticket-percent-outline"
                            boundaryMin={0} boundaryMax={1000}
                            initValMin={50} initValMax={600} />
                    </View>


                    <OtrixDivider size={'lg'} />
                    <View style={GlobalStyles.horizontalLine}></View>
                    <OtrixDivider size={'md'} />

                    {/* Colors View  */}
                    <Text style={styles.titleTxt}>Colors:</Text>
                    <OtrixDivider size={'sm'} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: wp('1%') }}>
                        <TouchableOpacity style={[styles.colorBox, { backgroundColor: '#7d9128' }]} >
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.colorBox, styles.borderBox, { backgroundColor: Colors.themeColor }]} >
                            {true && <Image source={checkround2} style={styles.imageView} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.colorBox, { backgroundColor: '#c2da0c' }]} >
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.colorBox, styles.borderBox, { backgroundColor: '#ff1e1a' }]} >
                            {true && <Image source={checkround2} style={styles.imageView} />}
                        </TouchableOpacity>
                    </View>

                    <OtrixDivider size={'lg'} />
                    <Text style={styles.titleTxt}>Sizes:</Text>
                    <OtrixDivider size={'sm'} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: wp('1%') }}>
                        {
                            SizeTagDummy.map((item, index) =>
                                <SizeTags tagName={item.name} tagID={item.id} key={item.id} selected={props.selectedFilter} onFilterPress={props.onFilterPress} />
                            )
                        }
                    </View>
                </View>

                <OtrixDivider size={'lg'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={[GlobalStyles.button, { marginHorizontal: wp('4%'), top: hp('8.5%') }]}
                    onPress={() => props.closeFilter()}
                >
                    <Text style={GlobalStyles.buttonText}>Apply Filter</Text>
                </Button>
            </View>

        </View>
    )
}

export default FilterComponent;

const styles = StyleSheet.create({
    modelView: {
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: Colors.light_white,
    },
    filter: {
        height: _roundDimensions()._height * 0.028,
        width: _roundDimensions()._height * 0.028,
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        height: _roundDimensions()._height * 0.042,
        width: _roundDimensions()._height * 0.040,
        borderRadius: _roundDimensions()._borderRadius,
        backgroundColor: Colors.white,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 2,
    },
    button: {
        height: _roundDimensions()._height * 0.016,
        width: _roundDimensions()._height * 0.016,
    },
    headerRight: {
        flex: 0.25,
        marginRight: wp('2%'),
    },
    clearTxt: {
        color: Colors.link_color,
        textTransform: 'uppercase',
        fontSize: wp('3%'),
        fontFamily: Fonts.Font_Reguler
    },
    horiLine: {
        width: wp('90%'),
        alignSelf: 'center',
        height: 0.5,
        backgroundColor: Colors.line_color
    },
    filterView: {
        marginHorizontal: wp('4%'),

    },
    titleTxt: {
        color: Colors.text_color,
        textTransform: 'capitalize',
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Semibold
    },

    colorBox: {
        height: hp('4%'),
        width: wp('18%'),
        flexDirection: 'row',
        marginHorizontal: wp('2%'),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: Colors.light_gray,
        borderWidth: 1,
        alignItems: 'center'
    },
    borderBox: {
        borderColor: Colors.themeColor,
        borderWidth: 1,
    },

    imageView: {
        height: hp('2%'),
        width: wp('4%'),
        borderRadius: 50,
        marginHorizontal: wp('1%'),

    },
    rangeView:
        { flex: 1, flexDirection: 'row', marginTop: hp('2%'), marginBottom: hp('8%') }
});