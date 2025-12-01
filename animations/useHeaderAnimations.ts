import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export default function useHeaderAnimations() {
  const progress = useSharedValue(0);

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [1, 0]),
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [0, -10], Extrapolation.CLAMP),
        },
      ],
    };
  });

  const toolbarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1]),
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [0, 10], Extrapolation.CLAMP),
        },
      ],
    };
  });

  return {
    progress,
    titleStyle,
    toolbarStyle,
  };
}
