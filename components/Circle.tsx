import { Animated, Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Circle({
  c,
}: {
  c: { x: number; y: number; bgColor: Record<string, string> };
}) {
  const spinValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        duration: 1200,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: false,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [spinValue]);

  const spin = useMemo(
    () =>
      spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      }),
    [spinValue]
  );
  return (
    <Animated.View
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        position: "absolute",
        top: c.y,
        left: c.x,
        overflow: "hidden",
      }}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <LinearGradient
          style={{ width: 100, height: 100 }}
          onStartShouldSetResponder={() => true}
          colors={[c.bgColor.start, c.bgColor.end]}
        ></LinearGradient>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
