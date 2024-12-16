import image from "@/constant/image";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, View, Image } from "react-native";

const StaticNavigator = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        duration: 1500,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ position: "relative" }}>
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
      >
        <Image
          source={image.middleCircle}
          resizeMode="contain"
          style={{ width: 85 }}
        />
      </Animated.View>
      <Image
        source={image.logo}
        resizeMode="contain"
        style={{
          width: 50,
          position: "absolute",
          transform: [{ translateX: -32 }, { translateY: -60 }],
          top: 50,
          left: 50,
        }}
      />
    </View>
  );
};
export default StaticNavigator;
