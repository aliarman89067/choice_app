import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import touchLottie from "../assets/animations/touchLottie.json";
import LottieView from "lottie-react-native";

interface Props {
  circle: { x: number; y: number; bgColor: Record<string, string> }[] | null;
}

const { height, width } = Dimensions.get("window");
export default function PlaceFinger({ circle }: Props) {
  return (
    <>
      {circle?.length === 0 && (
        <View style={styles.textContianer}>
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
              Place your finger
            </Text>
            <LottieView
              source={touchLottie}
              loop
              autoPlay
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textContianer: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
    userSelect: "none",
  },
});
