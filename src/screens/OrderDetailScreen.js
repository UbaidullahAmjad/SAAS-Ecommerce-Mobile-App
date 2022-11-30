import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixDivider,
  OtirxBackButton,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import { proceedCheckout } from "@actions";
import Fonts from "@helpers/Fonts";
import axios from "axios";
import { DataTable } from "react-native-paper";
import moment from "moment/moment";

function OrderDetailScreen(props) {
  const [OrderData, setOrderData] = React.useState(null);
  const [OrderItemsData, setOrderItemsData] = React.useState([]);
  const [loading, setloading] = React.useState(true);

  const _getOrderDetails = async () => {
    var config = {
      method: "get",
      url: `https://saas-ecommerce.royaldonuts.xyz/api/viewinvoice/${props.route.params?.orderData?.id}`,
    };

    await axios(config)
      .then(function (response) {
        if (response?.data?.success == true) {
          setOrderData(response?.data?.order);
          setOrderItemsData(response?.data?.order_items);
          setloading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setloading(false);
      });
  };

  useEffect(() => {
    _getOrderDetails();
  }, []);

  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      {/* Header */}
      <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
        <TouchableOpacity
          style={GlobalStyles.headerLeft}
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={GlobalStyles.headingTxt}> Orders Details </Text>
        </View>
      </OtrixHeader>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size={"large"}
          color="black"
        />
      ) : (
        <>
          {/* Orders Content start from here */}

          <View style={styles.addressContent}>
            <ScrollView
              style={styles.addressBox}
              showsHorizontalScrollIndicator={false}
              vertical={true}
            >
              <OtrixDivider size={"md"} />
              <Text style={styles.deliveryTitle}>View Orders Details</Text>
              <OtrixDivider size={"sm"} />
              <View
                style={[
                  styles.cartContent,
                  { elevation: 5, paddingVertical: wp("2%") },
                ]}
              >
                <View style={styles.detailBox}>
                  <View style={styles.detailRow}>
                    <View style={styles.leftView}>
                      <Text style={styles.leftTxt}>Order Date</Text>
                    </View>
                    <View style={styles.rightView}>
                      <Text style={styles.rightTxt}>
                        {moment(OrderData?.created_at).format(
                          "DD/MM/YYYY h:m a"
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.leftView}>
                      <Text style={styles.leftTxt}>Delivery Date</Text>
                    </View>
                    <View style={styles.rightView}>
                      <Text style={styles.rightTxt}>
                        {moment(OrderData?.delivery_date).format(
                          "DD/MM/YYYY h:m a"
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.leftView}>
                      <Text style={styles.leftTxt}>Order No.</Text>
                    </View>
                    <View style={styles.rightView}>
                      <Text style={styles.rightTxt}>
                        #{OrderData?.order_no}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.leftView}>
                      <Text style={[styles.leftTxt]}>Order Total</Text>
                    </View>
                    <View style={styles.rightView}>
                      <Text style={styles.rightTxt}>
                        {OrderData?.grand_total} €
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <OtrixDivider size={"md"} />
              <Text style={styles.deliveryTitle}>Product Details</Text>
              <OtrixDivider size={"sm"} />

              <View style={{ height: wp("50%") }}>
                {OrderItemsData.length > 0 && (
                  <FlatList
                    data={OrderItemsData}
                    keyExtractor={(item, index) => index}
                    ListHeaderComponent={
                      <DataTable>
                        <DataTable.Header
                          style={{
                            backgroundColor: "silver",
                            borderRadius: 2,
                          }}
                        >
                          <DataTable.Title
                            textStyle={[
                              styles.DataTableHeaderTextView,
                              {
                                color: "grey",
                              },
                            ]}
                          >
                            Name
                          </DataTable.Title>
                          <DataTable.Title
                            textStyle={[
                              styles.DataTableHeaderTextView,
                              {
                                color: "grey",
                              },
                            ]}
                          >
                            Quantity
                          </DataTable.Title>
                          <DataTable.Title
                            textStyle={[
                              styles.DataTableHeaderTextView,
                              {
                                color: "grey",
                              },
                            ]}
                          >
                            Price
                          </DataTable.Title>
                          <DataTable.Title
                            textStyle={[
                              styles.DataTableHeaderTextView,
                              {
                                color: "grey",
                              },
                            ]}
                          >
                            Total
                          </DataTable.Title>
                        </DataTable.Header>
                      </DataTable>
                    }
                    renderItem={({ item, index }) => {
                      return (
                        <DataTable key={index}>
                          <DataTable.Row
                            style={{
                              backgroundColor: "transparent",
                              borderRadius: 2,
                            }}
                          >
                            <DataTable.Cell
                              textStyle={[
                                styles.DateCellTextView,
                                {
                                  color: "#000",
                                  // flex: 1,
                                  // width: wp("8%"),
                                },
                              ]}
                            >
                              {item?.product_name}
                            </DataTable.Cell>
                            <DataTable.Cell
                              textStyle={[
                                styles.DateCellTextView,
                                {
                                  color: "#000",
                                },
                              ]}
                            >
                              {item?.quantity}
                            </DataTable.Cell>
                            <DataTable.Cell
                              textStyle={[
                                styles.DateCellTextView,
                                {
                                  color: "#000",
                                },
                              ]}
                            >
                              {(
                                parseFloat(item?.unit_price) /
                                parseFloat(item?.quantity)
                              ).toFixed(2)}{" "}
                              €
                            </DataTable.Cell>

                            <DataTable.Cell
                              textStyle={[
                                styles.DateCellTextView,
                                {
                                  color: "#000",
                                },
                              ]}
                            >
                              {parseFloat(item?.unit_price).toFixed(2)} €
                            </DataTable.Cell>
                          </DataTable.Row>
                        </DataTable>
                        //   <View
                        //     style={[
                        //       styles.cartContent,
                        //       { elevation: 5, marginTop: wp("2%") },
                        //     ]}
                        //   >
                        //     <View style={styles.cartBox}>
                        //       {/* <View style={styles.imageView}>
                        //     <Image source={orderData.image} style={styles.image}></Image>
                        //  </View> */}
                        //       <View style={styles.infromationView}>
                        //         <View>
                        //           <Text style={styles.name}>
                        //             {item?.product_name}
                        //           </Text>
                        //         </View>
                        //         <Text style={styles.orderDate}>
                        //           Quantity: {item?.quantity}
                        //         </Text>
                        //         <Text style={styles.orderDate}>
                        //           Unit Price:{" "}
                        //           <Text style={styles.orderStatuss}>
                        //             {(
                        //               parseFloat(item?.unit_price) /
                        //               parseFloat(item?.quantity)
                        //             ).toFixed(2)}{" "}
                        //             €
                        //           </Text>
                        //         </Text>

                        //         <Text style={styles.orderDate}>
                        //           Grand Price:{" "}
                        //           <Text style={styles.orderStatuss}>
                        //             {parseFloat(item?.unit_price).toFixed(2)} €
                        //           </Text>
                        //         </Text>
                        //       </View>
                        //     </View>
                        //   </View>
                      );
                    }}
                  />
                )}
              </View>

              {/* <View
                style={[
                  styles.priceView,
                  { alignItems: "flex-end", marginLeft: wp("5%") },
                ]}
              >
                <Text style={styles.price}>{(OrderData?.total).toFixed(2)} €</Text>
              </View> */}

              <OtrixDivider size={"md"} />
              <Text style={styles.deliveryTitle}>Orders Summary</Text>
              <OtrixDivider size={"sm"} />
              <View
                style={[
                  styles.cartContent,
                  { elevation: 2, marginVertical: wp("1%") },
                ]}
              >
                <View style={[styles.detailBox]}>
                  <View style={styles.detailRow}>
                    <View style={styles.leftView}>
                      <Text style={styles.leftTxt}>SubTotal </Text>
                    </View>
                    <View style={styles.rightView}>
                      <Text style={styles.rightTxt}>{OrderData?.total} €</Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.leftView}>
                      <Text style={styles.leftTxt}>Tax </Text>
                    </View>
                    <View style={styles.rightView}>
                      <Text style={styles.rightTxt}>
                        {OrderData?.tax ? OrderData?.tax : 0}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.leftView}>
                      <Text style={styles.leftTxt}>Discount </Text>
                    </View>
                    <View style={styles.rightView}>
                      <Text style={styles.rightTxt}>
                        {OrderData?.grand_total == OrderData?.total
                          ? 0
                          : (OrderData?.grand_total / OrderData?.total) * 100}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.leftView}>
                      <Text
                        style={[
                          styles.leftTxt,
                          { color: Colors.link_color, fontSize: wp("4.5%") },
                        ]}
                      >
                        Grand Total
                      </Text>
                    </View>
                    <View style={styles.rightView}>
                      <Text
                        style={[
                          styles.rightTxt,
                          ,
                          { color: Colors.link_color, fontSize: wp("4.5%") },
                        ]}
                      >
                        {" "}
                        {OrderData?.grand_total} €
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <OtrixDivider size={"md"} />
              <Text style={styles.deliveryTitle}>Shipping Address</Text>
              <OtrixDivider size={"sm"} />
              <View
                style={[
                  styles.cartContent,
                  { elevation: 5, marginVertical: wp("2%") },
                ]}
              >
                <View style={[styles.deliveryBox]}>
                  <Text style={styles.addressTxt} numberOfLines={1}>
                    {OrderData?.custome_address}{" "}
                  </Text>
                  <Text style={styles.addressTxt} numberOfLines={1}>
                    {OrderData?.zip_code}, {OrderData?.country}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
  };
}

export default connect(mapStateToProps, { proceedCheckout })(OrderDetailScreen);

const styles = StyleSheet.create({
  deliveryTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    color: Colors.text_color,
    marginLeft: wp("2%"),
  },
  addressBox: {
    marginLeft: wp("5%"),
    marginRight: wp("2.5%"),
    flex: 1,
    height: "auto",
    borderRadius: wp("2%"),
  },
  deliveryBox: {
    marginHorizontal: wp("1.5%"),
    width: wp("88%"),
    marginVertical: hp("0.5%"),
    // height: hp("14.5%"),
    borderRadius: wp("2%"),
    backgroundColor: Colors.white,
    padding: wp("2.5%"),
  },
  addressTxt: {
    fontSize: wp("3.6%"),
    fontFamily: Fonts.Font_Reguler,
    color: Colors.text_color,
    textAlign: "left",
  },
  deliveryAddressTxt: {
    textAlign: "right",
    fontSize: wp("3.4%"),
    fontFamily: Fonts.Font_Reguler,
    color: Colors.link_color,
  },
  edit: {
    textAlign: "right",
  },
  editView: { justifyContent: "flex-start" },
  addressContent: {
    flexDirection: "row",
    marginBottom: wp("20%"),
  },

  cartContent: {
    flex: 1,
    elevation: 1,
    // flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "center",
    borderRadius: wp("2%"),
    marginHorizontal: wp("1%"),
  },
  cartBox: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // height: hp("11%"),
    width: wp("90%"),
    flex: 0.85,
  },
  detailBox: {
    justifyContent: "center",
    alignItems: "center",
    // height: hp("11%"),
    flex: 1,
  },
  imageView: {
    flex: 0.3,
    backgroundColor: Colors.light_white,
    margin: wp("1%"),
    height: hp("8%"),
    borderRadius: wp("1.5%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    height: undefined,
    aspectRatio: 1,
    width: wp("15.5%"),
  },
  infromationView: {
    flex: 0.7,
    marginBottom: hp("1.4%"),
    marginLeft: wp("5%"),
    marginTop: hp("1%"),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    textAlign: "center",
    color: Colors.text_color,
    fontSize: wp("3.8%"),
    fontFamily: Fonts.Font_Bold,
  },
  orderDate: {
    textAlign: "center",
    color: Colors.secondry_text_color,
    lineHeight: hp("3%"),
    fontSize: wp("3.5%"),
    fontFamily: Fonts.Font_Regular,
  },
  orderStatuss: {
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("3.5%"),
    color: Colors.text_color,
  },
  priceView: {
    flex: 0.15,
    marginTop: hp("1%"),
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: wp("2%"),
  },
  price: {
    color: Colors.link_color,
    fontSize: wp("4%"),
    fontFamily: Fonts.Font_Semibold,
  },
  leftView: {
    flex: 0.3,
    marginLeft: wp("3%"),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 0.7,
  },
  leftTxt: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.5%"),
    color: Colors.secondry_text_color,
  },
  rightTxt: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("4%"),
    color: Colors.text_color,
  },
  detailRow: {
    flexDirection: "row",
    marginVertical: hp("0.4%"),
  },
  DataTableHeaderTextView: {
    fontFamily: "Poppins-SemiBold",
    fontSize: hp("2.2%"),
  },
  DateCellTextView: {
    fontFamily: "Poppins-Regular",
    fontSize: hp("1%"),
  },
});
