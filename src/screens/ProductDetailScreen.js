import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixContent,
  OtrixDivider,
  OtirxBackButton,
  OtrixLoader,
  SimilarProduct,
  SizeContainerComponent,
  RatingComponent,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import ProductListDummy from "@component/items/ProductListDummy";
import { bottomCart, checkround2, close } from "@common";
import { SliderBox } from "react-native-image-slider-box";
import { Badge, ScrollView, Button } from "native-base";
import Fonts from "../helpers/Fonts";
import { addToCart } from "@actions";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import ImageViewer from "react-native-image-zoom-viewer";
import Stars from "react-native-stars";
import getDataService from "../redux/Api/getApi";
import { PRODUCT_IMAGE_URL } from "@common/config";

const COLORS = ["#3ad35c", Colors.themeColor, "#efcd19", "#ff1e1a"];

function ProductDetailScreen(props) {
  const [state, setState] = React.useState({
    loading: true,
    productCount: 1,
    productDetail: null,
    fetchCart: false,
    selectedColor: 1,
    showZoom: false,
    zoomImages: [],
    msg: "",
  });
  const {
    loading,
    productDetail,
    selectedColor,
    productCount,
    zoomImages,
    showZoom,
    msg,
  } = state;

  // const _CartData = () => {
  //   // setState({ ...state, fetchCart: false })
  // };

  const showOutofStock = () => {
    setTimeout(() => {
      setState({ ...state, msg: "" });
    }, 2500);
    setState({ ...state, msg: "Product out of stock" });
  };

  const _addToCart = () => {
    setState({ ...state, fetchCart: true, msg: "" });
    props.addToCart(productDetail.id, productCount);
  };

  useEffect(() => {
    const { item } = props.route.params;
    getDetailProduct(item);
  }, []);

  const getDetailProduct = async (item) => {
    const findProduct = await getDataService.getData(`p/${item["slug"]}`);
    const image = `${PRODUCT_IMAGE_URL}${findProduct?.product?.image}`;
    const images = [
      {
        url: `${image}`,
        props: {
          source: `${image}`,
        },
      },
    ];

    setState({
      ...state,
      loading: false,
      productDetail: findProduct?.product,
      zoomImages: images,
    });
  };
  // useEffect(() => {
  // const { id } = props.route.params;

  // let findProduct = ProductListDummy.filter((p) => p.id == id);

  // let loadPage = setTimeout(
  //   () =>
  // setState({
  //   ...state,
  //   loading: false,
  //   productDetail: findProduct[0],
  //   zoomImages,
  // }),
  //   500
  // );

  // return () => {
  //   clearTimeout(loadPage);
  // };
  // }, [_CartData()]);

  const { cartCount } = props;
  const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      {loading ? (
        <OtrixLoader />
      ) : (
        <>
          {/* Product Detail View */}
          {productDetail && (
            <View style={styles.container}>
              <SliderBox
                images={[`${PRODUCT_IMAGE_URL}${productDetail.image}`]}
                onCurrentImagePressed={(index) =>
                  setState({ ...state, showZoom: true })
                }
                dotColor={Colors.themeColor}
                inactiveDotColor="#90A4AE"
                sliderBoxHeight={wp("35%")}
                paginationBoxVerticalPadding={20}
                autoplay={true}
                ImageComponentStyle={{
                  borderRadius: 10,
                  width: wp("70%"),
                  marginTop: wp("4%"),
                  height: wp("70%"),
                }}
                circleLoop={true}
                resizeMode={"contain"}
                dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 15,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                }}
              />
            </View>
          )}

          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              marginTop: hp("2%"),
              zIndex: 9999999,
            }}
          >
            <TouchableOpacity
              style={[
                GlobalStyles.headerLeft,
                {
                  zIndex: 999999999,
                  flex: 0.9,
                  alignItems: "flex-start",
                  elevation: 10,
                },
              ]}
              onPress={() => props.navigation.goBack()}
            >
              <OtirxBackButton />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                GlobalStyles.headerRight,
                {
                  zIndex: 999999999,
                  flex: 0.1,
                  backgroundColor: "white",
                  elevation: 10,
                  alignItems: "center",
                  alignSelf: "flex-end",
                },
              ]}
              onPress={() => props.navigation.navigate("CartScreen")}
            >
              <Image source={bottomCart} style={styles.menuImage} />
              {cartCount > 0 && (
                <Badge
                  style={[
                    GlobalStyles.badge,
                    {
                      left: wp("5%"),
                      top: -hp("1.6%"),
                      height: cartCount > 9 ? wp("8%") : wp("7%"),
                      width: cartCount > 9 ? wp("10%") : wp("7%"),
                      backgroundColor: Colors.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      GlobalStyles.badgeText,
                      {
                        color: Colors.themeColor,
                        fontSize: cartCount > 9 ? wp("2.5%") : wp("3%"),
                      },
                    ]}
                  >
                    {cartCount}
                  </Text>
                </Badge>
              )}
            </TouchableOpacity>
          </View>

          {/* Content Start from here */}
          <OtrixContent customStyles={styles.productDetailView}>
            <OtrixDivider size={"lg"} />
            <ScrollView
              style={styles.childView}
              showsVerticalScrollIndicator={false}
            >
              {/* Color And Heart Icon */}
              {/* <View style={styles.colorView}> */}
              {/* Color */}
              {/* <View style={styles.colorContainer}>
                                    <Text style={styles.containerTxt}>Colors:</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: wp('1%') }}>

                                        {
                                            COLORS.map((item, index) =>
                                                <TouchableOpacity key={index.toString()} style={[styles.box, { backgroundColor: item }]} onPress={() => setState({ ...state, selectedColor: index })}>
                                                    {index == selectedColor && <Image source={checkround2} style={styles.colorimageView} />}
                                                </TouchableOpacity>
                                            )
                                        }

                                        <TouchableOpacity style={{ justifyContent: 'center' }}>
                                            <Icon name="right" style={styles.arrowRight} ></Icon>
                                        </TouchableOpacity>

                                    </View>
                                </View> */}

              {/* Heart Icon */}
              {/* <View style={styles.heartIconView}>
                                    {
                                        productDetail.isFav ? <TouchableOpacity style={[GlobalStyles.FavCircle, { left: wp('12%'), top: 0 }]} >
                                            <FontAwesomeIcon name="heart" style={GlobalStyles.FavIcon} color={Colors.white} />
                                        </TouchableOpacity> : <TouchableOpacity style={[GlobalStyles.unFavCircle, { left: wp('12%'), top: 0 }]} >
                                            <FontAwesomeIcon name="heart-o" style={[GlobalStyles.unFavIcon, { fontSize: wp('3.8%') }]} color={Colors.secondry_text_color} />
                                        </TouchableOpacity>
                                    }
                                </View> */}

              {/* </View> */}

              {/* <OtrixDivider size={"md"} /> */}

              {/* Name Container*/}
              <View style={styles.subContainer}>
                <Text style={styles.headingTxt}>{productDetail.name_fr}</Text>
                <Text
                  style={[
                    styles.stock,
                    {
                      color: !productDetail.out_of_stock
                        ? "#5ddb79"
                        : "#fe151b",
                    },
                  ]}
                >
                  {!productDetail.out_of_stock ? "In Stock" : "Out of stock"}
                </Text>
              </View>
              <OtrixDivider size={"sm"} />

              {/* Price Container*/}
              <View style={styles.subContainer}>
                <Text style={styles.productPrice}>
                  {productDetail.price_euro} €
                </Text>
                {/* <View style={styles.starView}>
                  <Stars
                    default={productDetail.rating}
                    count={5}
                    half={true}
                    starSize={45}
                    fullStar={
                      <FontAwesomeIcon
                        name={"star"}
                        size={wp("3.5%")}
                        style={[styles.myStarStyle]}
                      />
                    }
                    emptyStar={
                      <FontAwesomeIcon
                        name={"star-o"}
                        size={wp("3.5%")}
                        style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                      />
                    }
                    halfStar={
                      <FontAwesomeIcon
                        name={"star-half-empty"}
                        size={wp("3.5%")}
                        style={[styles.myStarStyle]}
                      />
                    }
                    disabled={true}
                  />
                  <Text style={styles.reviewTxt}>
                    ({productDetail.reviewCount} Reviews)
                  </Text>
                </View> */}
              </View>
              <OtrixDivider size={"md"} />
              <View style={GlobalStyles.horizontalLine}></View>
              <OtrixDivider size={"md"} />

              {/* Sizes Container*/}
              {/* <SizeContainerComponent productData={productDetail} /> */}

              {/* <OtrixDivider size={"md"} /> */}

              {/* Description Container*/}
              <Text style={[styles.headingTxt, { fontSize: wp("3.8%") }]}>
                Description
              </Text>
              <OtrixDivider size={"sm"} />
              <Text style={styles.description}>
                {productDetail.description_fr.replace(regex, "")}
              </Text>
              <OtrixDivider size={"md"} />
              {/* <View style={GlobalStyles.horizontalLine}></View> */}

              {/* Rating Container*/}
              {/* <RatingComponent productData={productDetail} /> */}

              {/* Similar Product Component */}
              {/* <SimilarProduct navigation={props.navigation} /> */}
            </ScrollView>
          </OtrixContent>

          {/* Zoom image */}
          <Modal visible={showZoom} transparent={true}>
            <ImageViewer
              imageUrls={zoomImages}
              saveToLocalByLongPress={false}
              backgroundColor={Colors.light_white}
              renderIndicator={(currentIndex, allSize) => {
                return (
                  <View style={styles.pageindexview}>
                    <TouchableOpacity
                      onPress={() => setState({ ...state, showZoom: false })}
                      style={{ padding: 8 }}
                    >
                      <Image square source={close} style={styles.cancleIcon} />
                    </TouchableOpacity>
                    <Text style={styles.pageindextext}>
                      {currentIndex} / {allSize}
                    </Text>
                  </View>
                );
              }}
            />
          </Modal>

          {/* Bottom View */}
          <View style={styles.footerView}>
            <Button
              size="md"
              variant="solid"
              bg={Colors.themeColor}
              style={[
                GlobalStyles.button,
                { flex: 0.7, marginHorizontal: wp("2%") },
              ]}
              onPress={() =>
                !productDetail.out_of_stock ? _addToCart() : showOutofStock()
              }
            >
              <Text style={GlobalStyles.buttonText}>Add to cart</Text>
            </Button>
            <View style={styles.countBox}>
              <Text style={styles.countTxt}>{productCount}</Text>
              <View style={styles.arrowContainer}>
                <TouchableOpacity
                  // style={{ flex: 0.5 }}
                  onPress={() =>
                    setState({ ...state, productCount: productCount + 1 })
                  }
                >
                  <MaterialIconsIcon
                    name="keyboard-arrow-up"
                    style={styles.plusminusArrow}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  // style={{ flex: 0.5 }}
                  onPress={() =>
                    setState({
                      ...state,
                      productCount: productCount > 1 ? productCount - 1 : 1,
                    })
                  }
                >
                  <MaterialIconsIcon
                    name="keyboard-arrow-down"
                    style={styles.plusminusArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
      {msg != "" && (
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "red",
            color: "white",
            padding: 10,
          }}
        >
          {msg}
        </Text>
      )}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartCount: state.cart.cartCount,
  };
}

export default connect(mapStateToProps, { addToCart })(ProductDetailScreen);

const styles = StyleSheet.create({
  productDetailView: {
    backgroundColor: Colors.white,
    borderTopRightRadius: wp("13%"),
    borderTopLeftRadius: wp("13%"),
  },
  container: {
    height: wp("75%"),
    position: "relative",
    backgroundColor: Colors.light_white,
    zIndex: 99,
  },
  childView: {
    marginHorizontal: wp("5%"),
    paddingBottom: hp("1.8%"),
  },
  menuImage: {
    width: wp("6%"),
    height: hp("6%"),
    resizeMode: "contain",
    tintColor: Colors.themeColor,
  },
  colorView: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  colorContainer: {
    flex: 0.75,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTxt: {
    fontSize: wp("4%"),
    fontFamily: Fonts.Font_Reguler,
    color: Colors.secondry_text_color,
  },
  box: {
    height: hp("3.5%"),
    width: wp("8%"),
    flexDirection: "row",
    marginHorizontal: wp("2%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    borderRadius: 5,
    borderColor: Colors.light_gray,
    borderWidth: 1,
    alignItems: "center",
  },
  borderBox: {
    borderColor: Colors.themeColor,
    borderWidth: 1,
  },
  colorimageView: {
    height: hp("2%"),
    width: wp("4%"),
    borderRadius: 50,
    marginHorizontal: wp("1%"),
  },
  arrowRight: {
    fontSize: wp("3.5%"),
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.text_color,
  },
  heartIconView: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  headingTxt: {
    fontSize: wp("4.5%"),
    fontFamily: Fonts.Font_Bold,
    textAlignVertical: "center",
    flex: 0.8,
  },
  subContainer: {
    flexDirection: "row",
  },
  stock: {
    flex: 0.2,
    fontSize: wp("3%"),
    textAlignVertical: "center",
    fontFamily: Fonts.Font_Semibold,
    textAlign: "right",
  },
  productPrice: {
    fontSize: wp("5.5%"),
    fontFamily: Fonts.Font_Bold,
    textAlignVertical: "center",
    color: Colors.themeColor,
    flex: 0.8,
  },
  starView: {
    flex: 0.2,
  },
  myStarStyle: {
    color: "#ffd12d",
    backgroundColor: "transparent",
    marginHorizontal: 1,
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: "gray",
  },
  reviewTxt: {
    fontFamily: Fonts.Font_Reguler,
    fontSize: wp("2.5%"),
    marginTop: hp("0.3%"),
    textAlign: "center",
    color: Colors.secondry_text_color,
  },
  description: {
    fontSize: wp("3.5%"),
    fontFamily: Fonts.Font_Reguler,
    lineHeight: hp("2.4%"),
    color: Colors.secondry_text_color,
  },

  footerView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    // height: hp("7.5%"),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderTopColor: Colors.light_gray,
    borderTopWidth: 1,
    paddingVertical: wp("3%"),
  },
  countBox: {
    // backgroundColor: "red",
    backgroundColor: Colors.light_white,
    flexDirection: "row",
    flex: 0.2,
    // height: hp("5%"),
    // padding: wp("3%"),
    marginHorizontal: wp("1%"),
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderRadius: 5,
    justifyContent: "center",
  },
  countTxt: {
    fontSize: wp("4.5%"),
    flex: 0.6,
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.text_color,
    fontFamily: Fonts.Font_Semibold,
  },
  arrowContainer: {
    // flex: 0.4,
    flexDirection: "column",
  },
  plusminusArrow: {
    fontSize: wp("5.2%"),
  },
  cancleIcon: {
    marginLeft: wp("3%"),
    height: wp("6%"),
    width: wp("6%"),
    tintColor: Colors.black,
  },
  pageindexview: {
    position: "absolute",
    marginTop: wp("4.5%"),
    flexDirection: "row",
  },
  pageindextext: {
    width: wp("15%"),
    textAlign: "center",
    fontSize: wp("4.5%"),
    color: Colors.black_text,
    marginHorizontal: wp("34%"),
  },
});
