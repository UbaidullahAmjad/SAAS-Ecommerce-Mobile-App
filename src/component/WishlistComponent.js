import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Colors } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { OtrixDivider } from '@component';
import Fonts from '@helpers/Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/FontAwesome5';

function WishlistComponent(props) {
    let cartProduct = props.products;
    const PriceQuantity = (price, quantity) => {
        let amt = parseFloat(price.replace('$', ''));
        let qty = parseInt(quantity);
        return amt + "€";
    }
    return (
        <>
            <OtrixDivider size={'md'} />
            {
                cartProduct.length > 0 && cartProduct.map((item) =>
                    <View style={styles.cartContent} key={item.id.toString()}>
                        <View style={styles.cartBox} >
                            <View style={styles.imageView}>
                                <Image source={item.image} style={styles.image}
                                ></Image>
                            </View>
                            <View style={styles.infromationView}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', { id: item.id })}>
                                    <Text style={styles.name}>{item.name}</Text>
                                </TouchableOpacity>
                                <Text style={styles.price}>{PriceQuantity(item.price, item.quantity)}</Text>
                                <View style={styles.plusminus}>
                                    <Text style={styles.quantityTxt}>{item.quantity}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.deleteIcon} onPress={() => props.deleteItem(item.id)}>
                            <MatIcon name="trash" style={styles.delete} />
                        </TouchableOpacity>
                    </View>
                )
            }
        </>
    )
}

export default WishlistComponent;
const styles = StyleSheet.create({
    cartContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        marginBottom: wp('3%'),
        borderRadius: wp('2%'),
        marginLeft: wp('1%'),
    },
    cartBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('12%'),
        flex: 0.90,
    },
    imageView: {
        flex: 0.40,
        backgroundColor: Colors.light_white,
        height: hp('11%'),
        borderRadius: wp('1.5%')
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: undefined,
        aspectRatio: 1,
        width: wp('21.5%')
    },
    infromationView: {
        flex: 0.70,
        marginBottom: hp('1.4%'),
        marginLeft: wp('5%'),
        marginTop: hp('1%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
        textAlign: 'center',
        color: Colors.secondry_text_color,
        fontSize: wp('3.8%'),
        fontFamily: Fonts.Font_Bold,
    },
    price: {
        textAlign: 'center',
        color: Colors.link_color,
        lineHeight: hp('4%'),
        fontSize: wp('5%'),
        fontFamily: Fonts.Font_Bold,
    },
    plusminus: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: hp('1%')
    },
    plusminusTxt: {
        fontSize: wp('3%'),
        color: Colors.secondry_text_color,
        textAlign: 'center',
    },
    quantityTxt: {
        fontSize: wp('4%'),
        color: Colors.text_color,
        marginHorizontal: wp('1%'),
        fontFamily: Fonts.Font_Bold,
        top: hp('0.2%'),
        textAlign: 'center',
    },
    deleteIcon: {
        flex: 0.10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: wp('2%')
    },
    delete: {
        fontSize: wp('3.6%'),
        color: Colors.secondry_text_color
    }
});