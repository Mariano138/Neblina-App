import {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface props {
  initialColor: string;
  endColor: string;
}

export default function useButtonAnimation({
  initialColor = '#FFFFFF',
  endColor = '#00000020',
}: props) {
  const scale = useSharedValue<number>(1);
  const progress = useSharedValue<number>(0);

  const animatedButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [initialColor, endColor]);

    return {
      transform: [{ scale: scale.value }],
      backgroundColor,
    };
  });

  const onPressInButton = () => {
    scale.value = withSpring(0.95);
    progress.value = withTiming(1, { duration: 200, easing: Easing.linear });
  };

  const onPressOutButton = () => {
    scale.value = withSpring(1);
    progress.value = withTiming(0, { duration: 200, easing: Easing.linear });
  };
  return {
    animatedButtonStyle,
    onPressInButton,
    onPressOutButton,
  };
}
