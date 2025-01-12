import { Button, XStack } from "tamagui";
import {
  MessageCircleWarning,
  Calendar,
  PencilLine,
} from "@tamagui/lucide-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import useWriteANote from "../hooks/useWriteANote";
import useAnimations from "../hooks/useAnimations";

type Props = {
  setWriteNote: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonsAdd = ({ setWriteNote }: Props) => {
  const { handleAddNote } = useWriteANote({ setWriteNote });
  const { AnimatedButton, tapAdd, animatedButtonAddStyle } = useAnimations();

  return (
    <XStack f={1} ai={"flex-end"} jc={"space-between"}>
      <Button
        style={styles.buttonShadow}
        bg={"#FFE4E6"}
        size={54}
        circular
        icon={MessageCircleWarning}
      />
      <Button
        style={styles.buttonShadow}
        bg={"#D9F7FF"}
        size={54}
        circular
        icon={Calendar}
      />
      <GestureDetector gesture={tapAdd}>
        <AnimatedButton
          onPress={handleAddNote}
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
