import { Button, XStack } from "tamagui";
import {
  MessageCircleWarning,
  Calendar,
  PencilLine,
} from "@tamagui/lucide-icons";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  setWriteNote: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonsAdd = ({ setWriteNote }: Props) => {
  const handleAddNote = () => {
    setWriteNote(true);
  };

  return (
    <XStack f={1} ai={"flex-end"} jc={"space-between"} mb={15}>
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
      <Button
        onPress={handleAddNote}
        bg={"#E4F0FF"}
        size={54}
        circular
        icon={PencilLine}
        style={styles.buttonShadow}
      />
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
