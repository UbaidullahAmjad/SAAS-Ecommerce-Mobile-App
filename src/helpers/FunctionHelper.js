import { Linking } from 'react-native'
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage'

export function chatSupport() {
    const link = 'whatsapp://send?text=Hello Otrixweb&phone=9898'
    Linking.canOpenURL(link)
        .then(supported => {
            if (!supported) {
                Toast.show('Whatsapp not installed', {
                    duration: 2000,
                    position: Toast.positions.CENTER,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                })
                // alert('Please Install Whatsapp To Send Direct Message');
            } else {
                Linking.openURL(link);
            }
        })
}

const logprint = false

export function logfunction(tag, message) {
    if (logprint) {
        console.log(tag, message)
    }
}

export async function _getWishlist() {
    let getWishlistData = await AsyncStorage.getItem('GET_LOCAL_WISHLIST');
    getWishlistData = JSON.parse(getWishlistData);
    return getWishlistData;
}

export async function _addToWishlist(id) {
    let getWishlistData = await AsyncStorage.getItem('GET_LOCAL_WISHLIST');
    getWishlistData = JSON.parse(getWishlistData);
    let storeToarr;
    if (getWishlistData != null && getWishlistData.length > 0) {
        if (!getWishlistData.includes(id)) {
            getWishlistData.push(id)
        }
        else {
            const index = getWishlistData.indexOf(id);
            if (index > -1) {
                getWishlistData.splice(index, 1);
            }
        }
        storeToarr = getWishlistData
    }
    else {
        storeToarr = [id]
    }
    await AsyncStorage.setItem('GET_LOCAL_WISHLIST', JSON.stringify(storeToarr));
    return storeToarr;
}

export async function _getLocalCart() {
    let data = await AsyncStorage.getItem('CART_DATA');
    data = JSON.parse(data);
    return data;
}