import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function useItemAnimation() {
  const positionX = useSharedValue<number>(0);
  const positionY = useSharedValue<number>(0);

  const animatedItemStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(positionX.value) },
      { translateY: withTiming(positionY.value) },
    ],
  }));
  const onPressInNote = () => {
    positionX.value = 10;
    positionY.value = 5;
  };

  const onPressOutNote = () => {
    positionX.value = 0;
    positionY.value = 0;
  };
  return {
    animatedItemStyle,
    onPressInNote,
    onPressOutNote,
  };
}
