import { useEffect } from "react";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { Button } from "tamagui";

export default function useAnimations() {
  //Animation of WriteANote appearing in the screen
  const translateY = useSharedValue<number>(1000);

  const animatedStyled = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });
  }, []);

  //Animation of WriteANote leaving the screen

  const triggerExitAnimation = () => {
    translateY.value = withTiming(1500, {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });
  };

  //ButtonAdd animation

  const AnimatedButton = Animated.createAnimatedComponent(Button);
  const pressedAdd = useSharedValue<boolean>(false);
  const pressedDelete = useSharedValue<boolean>(false);

  const tapAdd = Gesture.Tap()
    .onBegin(() => {
      pressedAdd.value = true;
    })
    .onFinalize(() => {
      pressedAdd.value = false;
    });

  const tapDelete = Gesture.Tap()
    .onBegin(() => {
      pressedDelete.value = true;
    })
    .onFinalize(() => {
      pressedDelete.value = false;
    });

  const animatedButtonAddStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(pressedAdd.value ? "#CCE2FF" : "#E4F0FF"),
    transform: [{ scale: withSpring(pressedAdd.value ? 1.2 : 1) }],
  }));

  // Animations buttons add and cancel/delete

  const animatedButtonSaveStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(pressedAdd.value ? "#C3EFC5" : "#DFFFE7"),
    transform: [{ scale: withSpring(pressedAdd.value ? 1.2 : 1) }],
  }));

  const animatedButtonDeleteStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(pressedDelete.value ? "#FFA3A3" : "#FFC4C4"),
    transform: [{ scale: withSpring(pressedDelete.value ? 1.2 : 1) }],
  }));
  return {
    AnimatedButton,

    animatedStyled,
    triggerExitAnimation,

    tapAdd,
    tapDelete,

    animatedButtonAddStyle,

    animatedButtonSaveStyle,
    animatedButtonDeleteStyle,
  };
}
