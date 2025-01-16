import { XStack } from "tamagui";
import { PencilLine } from "@tamagui/lucide-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import useAnimations from "../hooks/useAnimations";
import { useRouter } from "expo-router";

const ButtonsAdd = () => {
  const router = useRouter();
  const { AnimatedButton, tapAdd, animatedButtonAddStyle } = useAnimations();

  return (
    <XStack f={1} ai={"flex-end"} jc={"flex-end"}>
      <GestureDetector gesture={tapAdd}>
        <AnimatedButton
          onPress={() => {
            router.push(`/writeNote`);
          }}
          size={54}
          circular
          icon={PencilLine}
          style={[styles.buttonShadow, animatedButtonAddStyle]}
          mb={15}
        />
      </GestureDetector>
    </XStack>
  );
};

const styles = StyleSheet.create({
  buttonShadow: {
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.4), inset 1px 1px 4px rgba(0, 0, 0, 0.4)",
  },
});

export default ButtonsAdd;
