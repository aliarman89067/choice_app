import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  circle: { x: number; y: number; bgColor: Record<string, string> }[] | null;
  setIsPlayPressed: Dispatch<SetStateAction<boolean>>;
}

export default function PlayButton({ circle, setIsPlayPressed }: Props) {
  const startPlay = (event: GestureResponderEvent) => {
    setIsPlayPressed(true);
    setTimeout(() => setIsPlayPressed(false), 200);
  };
  return (
    <>
      {circle && circle?.length > 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={50}
            style={styles.button}
            onPressIn={startPlay}
          >
            <Text style={{ color: "#000" }}>Click to Start</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: 9999,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 5,
  },
});
