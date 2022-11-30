import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  OtrixLoader,
  OtirxBackButton,
  CategoryView,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import { requestCategoryData } from "@actions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function CategoryScreen(props) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await props.requestCategoryData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
          {/* <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity> */}
          <View style={[GlobalStyles.headerCenter, { flex: 0.9 }]}>
            <Text style={GlobalStyles.headingTxt}>Top Categories</Text>
          </View>
        </OtrixHeader>

        {/* Content Start from here */}
        <OtrixContent>
          {/* Category Component Start from here */}
          <CategoryView
            navigation={props.navigation}
            data={props?.category_Data}
          />
        </OtrixContent>
      </ScrollView>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    category_Data: state.Home.category_Data,
  };
}

export default connect(mapStateToProps, {
  requestCategoryData,
})(CategoryScreen);

const styles = StyleSheet.create({
  menuImage: {
    width: wp("5%"),
    height: hp("4%"),
    tintColor: Colors.secondry_text_color,
  },

  bannerStyle: {
    resizeMode: "contain",
    width: wp("100%"),
    height: hp("16%"),
    alignSelf: "center",
  },
});
