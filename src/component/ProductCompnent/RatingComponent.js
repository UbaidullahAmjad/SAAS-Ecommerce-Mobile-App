import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OtrixDivider from '../OtrixComponent/OtrixDivider';
import Fonts from '@helpers/Fonts';
import Stars from 'react-native-stars';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function RatingComponent(props) {

    let productDetail = props.productData;

    return (
        <>

            <OtrixDivider size={'md'} />
            <Text style={styles.overallTxt}>Overall Rating</Text>
            <OtrixDivider size={'sm'} />
            <Text style={styles.avgtxt}>4.7</Text>
            <OtrixDivider size={'sm'} />
            <Stars
                default={productDetail.rating}
                count={5}
                half={true}
                starSize={45}
                fullStar={<FontAwesomeIcon name={'star'} size={wp('3.5%')} style={[styles.myStarStyle]} />}
                emptyStar={<FontAwesomeIcon name={'star-o'} size={wp('3.5%')} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                halfStar={<FontAwesomeIcon name={'star-half-empty'} size={wp('3.5%')} style={[styles.myStarStyle]} />}
                disabled={true}
            />
            <Text style={[styles.reviewTxt, { fontSize: wp('3%'), lineHeight: hp('2.8%') }]}>Based on {productDetail.reviewCount} Reviews</Text>
            <OtrixDivider size={'sm'} />
            <View style={styles.ratingLine}>
                <Text style={styles.lineText}>Excellent</Text>
                <View style={styles.line}>
                    <View style={{
                        backgroundColor: '#3ad35c',
                        width: wp('60%'),
                        flex: 1,
                        borderRadius: 25
                    }}>
                    </View>
                </View>
            </View>
            <OtrixDivider size={'sm'} />
            <View style={styles.ratingLine}>
                <Text style={styles.lineText}>Good</Text>
                <View style={styles.line}>
                    <View style={{
                        backgroundColor: '#efcd19',
                        width: wp('45%'),
                        flex: 1,
                        borderRadius: 25
                    }}>
                    </View>
                </View>
            </View>

            <OtrixDivider size={'sm'} />
            <View style={styles.ratingLine}>
                <Text style={styles.lineText}>Average</Text>
                <View style={styles.line}>
                    <View style={{
                        backgroundColor: '#ffce1f',
                        width: wp('40%'),
                        flex: 1,
                        borderRadius: 25
                    }}>
                    </View>
                </View>
            </View>

            <OtrixDivider size={'sm'} />
            <View style={styles.ratingLine}>
                <Text style={styles.lineText}>Poor</Text>
                <View style={styles.line}>
                    <View style={{
                        backgroundColor: '#e9961a',
                        width: wp('25%'),
                        flex: 1,
                        borderRadius: 25
                    }}>
                    </View>
                </View>
            </View>

            <OtrixDivider size={'sm'} />
            <View style={styles.ratingLine}>
                <Text style={styles.lineText}>Very Bad</Text>
                <View style={styles.line}>
                    <View style={{
                        backgroundColor: '#e83328',
                        width: wp('8%'),
                        flex: 1,
                        borderRadius: 25
                    }}>
                    </View>
                </View>
            </View>

            <OtrixDivider size={'md'} />
        </>


    )
}

export default RatingComponent;

const styles = StyleSheet.create({
    overallTxt: {
        fontSize: wp('3.8%'),
        textAlign: 'center',
        color: Colors.secondry_text_color
    },
    avgtxt: {
        fontSize: wp('5.5%'),
        color: Colors.text_color,
        textAlign: 'center',
        fontFamily: Fonts.Font_Bold
    },
    ratingLine: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lineText: {
        fontSize: wp('3.4%'),
        flex: 0.30,
        textAlign: 'left',
        color: Colors.secondry_text_color
    },
    line: {
        flex: 0.70,
        height: hp('0.8%'),
        backgroundColor: Colors.light_gray,
        alignSelf: 'center',
        borderRadius: 25
    },
    myStarStyle: {
        color: '#ffd12d',
        backgroundColor: 'transparent',
        marginHorizontal: 1,
        textShadowRadius: 1,
    },
    myEmptyStarStyle: {
        color: 'gray',
    },
    reviewTxt: {
        fontFamily: Fonts.Font_Reguler,
        fontSize: wp('2.5%'),
        marginTop: hp('0.3%'),
        textAlign: 'center',
        color: Colors.secondry_text_color
    },
});