import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { homeSlider1, homeSlider2, homeSlider3, homeSlider4 } from "@common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
const { width: screenWidth } = Dimensions.get("window");

function HomeSlider(props) {
  // const images = [homeSlider1, homeSlider2, homeSlider3, homeSlider4];

  const _renderItem = ({ item, index }, parallaxProps) => {
    console.log(item);
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri: `https://ecco.royaldonuts.xyz/images/Carousel/${item.image}`,
          }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 55}
        data={props.data}
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={1}
        renderItem={_renderItem}
        firstItem={1}
        // loop={true}
        // autoplayDelay={2500}
        // autoplay={true}
        activeAnimationType={"spring"}
        activeSlideAlignment={"center"}
        hasParallaxImages={true}
      />
    </View>
  );
}

export default HomeSlider;
const styles = StyleSheet.create({
  item: {
    width: screenWidth - 55,
    height: screenWidth - 100,
    right: wp("3.5%"),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: wp("1.5%"),
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
});
