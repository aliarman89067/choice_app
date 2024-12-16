import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  GestureResponderEvent,
  Image,
  StyleSheet,
  View,
} from "react-native";
import Circle from "@/components/Circle";
import { Text } from "react-native";
import PlaceFinger from "@/components/PlaceFinger";
import image from "@/constant/image";
import {
  handleCreateCircle,
  handleEndCircle,
  handleMoveCircle,
} from "@/constant/utils";
import SpotLight from "@/components/SpotLight";
import audio from "@/constant/audio";
import { Audio } from "expo-av";
import StaticNavigator from "@/components/StaticNavigator";

export default function Home() {
  const [circle, setCircle] = useState<
    | { x: number; y: number; bgColor: Record<string, string>; id: number }[]
    | null
  >([]);

  const [isStart, setIsStart] = useState<boolean>(false);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [youWin, setYouWin] = useState(false);

  const circleRef = useRef(circle);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound: avSound } = await Audio.Sound.createAsync(
        require("../assets/audio/clock_ticking.mp3"),
        { isLooping: false }
      );
      setSound(avSound);
    };

    loadSound();

    // Cleanup function to unload the sound when the component is unmounted
    return () => {
      if (sound) {
        sound.unloadAsync(); // Only unload if sound exists
      }
    };
  }, []);

  useEffect(() => {
    circleRef.current = circle;

    if (sound && (circle == null || circle.length === 0)) {
      const stopAudio = async () => {
        if (sound) {
          await sound.stopAsync(); // Stop the audio
        }
        setIsStart(false); // Stop the game logic
      };
      stopAudio();
    }
  }, [circle, isStart, sound]);

  const startTheGame = async () => {
    if (circle == null || circle.length === 0) {
      return;
    }
    clearTimeout(timeoutRef.current);
    setIsStart(true);
    if (sound) {
      await sound?.stopAsync();
    }

    await sound?.playAsync();

    timeoutRef.current = setTimeout(async () => {
      if (circleRef.current == null || circleRef.current.length === 0) {
        clearTimeout(timeoutRef.current);
        return;
      }
      const ranCircleNumber = Math.floor(
        Math.random() * circleRef.current.length
      );
      if (circleRef.current.length === 2) {
        setCircle((prevCircles) => {
          if (prevCircles == null) return prevCircles;
          return prevCircles.filter((_, index) => index !== ranCircleNumber);
        });
        setYouWin(true);
        setTimeout(() => {
          setYouWin(false);
          clearTimeout(timeoutRef.current);
          setCircle([]);
          setIsStart(false);
        }, 2000);
        return;
      }

      setCircle((prevCircles) => {
        if (prevCircles == null) return prevCircles;
        return prevCircles.filter((_, index) => index !== ranCircleNumber);
      });
      setIsStart(false);
    }, 5000);
  };

  return (
    <View style={styles.main}>
      <View
        style={[
          styles.startButtonContainer,
          {
            opacity: circle && circle.length > 0 ? 100 : 0,
          },
        ]}
      >
        <View
          style={[
            styles.startButtonBox,
            { backgroundColor: isStart ? "transparent" : "#fff" },
          ]}
        >
          {!isStart && <Text>Click to Start</Text>}
          {isStart && youWin && (
            <Text style={{ color: "#fff", fontWeight: 500, fontSize: 20 }}>
              You Win!
            </Text>
          )}
          {isStart && !youWin && <StaticNavigator />}
        </View>
      </View>
      <View
        onTouchStart={(event) =>
          handleCreateCircle(event, {
            circle,
            isStart,
            setCircle,
            startTheGame,
          })
        }
        onTouchEnd={(event) => handleEndCircle(event, { circle, setCircle })}
        onTouchMove={(event) => handleMoveCircle(event, { setCircle })}
        style={styles.container}
      >
        <PlaceFinger circle={circle} />
        {circle && circle.length > 1 && (
          <SpotLight circle={circle} isStart={isStart} />
        )}

        {circle?.map((c, index) => (
          <Circle key={index} c={c} />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  startButtonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  startButtonBox: {
    height: 60,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
