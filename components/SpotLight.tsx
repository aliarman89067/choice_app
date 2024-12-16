import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Svg, Defs, RadialGradient, Stop, Circle } from "react-native-svg";

interface Props {
  isStart: boolean;
  circle:
    | { x: number; y: number; bgColor: Record<string, string>; id: number }[]
    | null;
}

export default function SpotLight({ isStart, circle }: Props) {
  const [spotLightCoor, setSpotLightCoor] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    if (!isStart) return;
    if (circle == null || circle.length < 2) return;

    const interval = setInterval(() => {
      const randomCircleIndex = Math.ceil(Math.random() * circle?.length - 1);
      const { x, y } = circle[randomCircleIndex];
      setSpotLightCoor({ x: x - 30, y: y - 30 });
    }, 100);

    return () => clearInterval(interval);
  }, [circle?.length, isStart]);

  if (spotLightCoor.x == null || spotLightCoor.y == null) return;

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: spotLightCoor.y,
          left: spotLightCoor.x,
        }}
      >
        <Svg height="160" width="160">
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <Stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="80" cy="80" r="80" fill="url(#grad)" />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    userSelect: "none",
    backgroundColor: "transparent",
    zIndex: 0,
  },
});
