import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function useColorAnimation(isSelected: boolean) {
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(2);

  useEffect(() => {
    scale.value = withTiming(isSelected ? 1.3 : 1, { duration: 150 });
    borderWidth.value = withTiming(isSelected ? 4 : 2, { duration: 150 });
  }, [isSelected]);

  const animatedColorStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderWidth: borderWidth.value,
  }));

  return { animatedColorStyle };
}
