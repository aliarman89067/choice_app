import { Dispatch, SetStateAction } from "react";
import { Alert, Dimensions, GestureResponderEvent } from "react-native";
import { bgColors } from "./colors";

const { width, height } = Dimensions.get("window");

const halfOfWidth = width / 2;
const halfOfHeight = height / 2;
const buttonAreaSize = 75;

export const handleCreateCircle = (
  event: GestureResponderEvent,
  {
    isStart,
    circle,
    setCircle,
    startTheGame,
  }: {
    isStart: boolean;
    circle:
      | { x: number; y: number; bgColor: Record<string, string>; id: number }[]
      | null;
    setCircle: Dispatch<
      SetStateAction<
        | {
            x: number;
            y: number;
            bgColor: Record<string, string>;
            id: number;
          }[]
        | null
      >
    >;
    startTheGame: () => void;
  }
) => {
  if (isStart) return;

  const { pageX, pageY } = event.nativeEvent;
  if (circle && circle?.length > 0) {
    if (
      pageX >= halfOfWidth - buttonAreaSize &&
      pageX <= halfOfWidth + buttonAreaSize &&
      pageY >= halfOfHeight - buttonAreaSize &&
      pageY <= halfOfHeight + buttonAreaSize
    ) {
      if (circle == null || circle.length === 0) {
        return;
      }
      if (circle?.length < 2) {
        Alert.alert("Atleast two player required!");
        return;
      }
      startTheGame();
      return;
    }
  }

  const rBgColorsNumber = Math.ceil(Math.random() * bgColors.length - 1);
  const rBgColors = bgColors[rBgColorsNumber];
  const uniqueId = pageX / pageY;
  setCircle((prev) => [
    ...(prev || []),
    { x: pageX - 50, y: pageY - 50, bgColor: rBgColors, id: uniqueId },
  ]);
  return;
};

export const handleEndCircle = (
  event: GestureResponderEvent,
  {
    circle,
    setCircle,
  }: {
    circle:
      | { x: number; y: number; bgColor: Record<string, string>; id: number }[]
      | null;

    setCircle: Dispatch<
      SetStateAction<
        | {
            x: number;
            y: number;
            bgColor: Record<string, string>;
            id: number;
          }[]
        | null
      >
    >;
  }
) => {
  const { pageX, pageY } = event.nativeEvent;

  if (circle == null || circle.length === 0) {
    return;
  }

  setCircle((prev) => {
    if (prev == null) return [];
    return prev?.filter((c) => c.x !== pageX - 50 && c.y !== pageY - 50);
  });
};

export const handleMoveCircle = (
  event: GestureResponderEvent,
  {
    setCircle,
  }: {
    setCircle: Dispatch<
      SetStateAction<
        | {
            x: number;
            y: number;
            bgColor: Record<string, string>;
            id: number;
          }[]
        | null
      >
    >;
  }
) => {
  const { pageX, pageY } = event.nativeEvent;
  requestAnimationFrame(() => {
    setCircle((prev) => {
      if (!prev) return prev; // If no circles, do nothing.

      return prev.map((c) => {
        const leftBound = c.x - 50;
        const rightBound = c.x + 50;
        const topBound = c.y - 50;
        const bottomBound = c.y + 50;

        // Check if the touch is within the bounds of the circle (left, right, top, bottom)
        if (
          pageX - 50 >= leftBound &&
          pageX - 50 <= rightBound &&
          pageY - 50 >= topBound &&
          pageY - 50 <= bottomBound
        ) {
          return { ...c, x: pageX - 50, y: pageY - 50 };
        }
        return c;
      });
    });
  });
};
