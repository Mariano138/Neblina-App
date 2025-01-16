import { Save, Trash } from "@tamagui/lucide-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Input, View, XStack, YStack } from "tamagui";
import useWriteANote from "../hooks/useWriteANote";
import useHomeScreen from "../hooks/useHomeScreen";
import useAnimations from "../hooks/useAnimations";
import { GestureDetector } from "react-native-gesture-handler";

export default function writeNote() {
  const { addNote } = useHomeScreen();

  const { handleSave, handleCancel, title, setTitle, note, setNote } =
    useWriteANote({
      addNote,
    });
  const {
    AnimatedButton,

    tapAdd,
    tapDelete,

    animatedButtonSaveStyle,
    animatedButtonDeleteStyle,
  } = useAnimations();

  return (
    <YStack f={1} bg={"#E4F0FF"}>
      <XStack jc={"flex-end"} mt={44} mr={34} gap={18}>
        <GestureDetector gesture={tapAdd}>
          <AnimatedButton
            style={[styles.buttonShadow, animatedButtonSaveStyle]}
            bg={"#DFFFE7"}
            size={42}
            circular
            icon={Save}
            onPress={handleSave}
          />
        </GestureDetector>
        <GestureDetector gesture={tapDelete}>
          <AnimatedButton
            style={[styles.buttonShadow, animatedButtonDeleteStyle]}
            bg={"#FFC4C4"}
            size={42}
            circular
            icon={Trash}
            onPress={handleCancel}
          />
        </GestureDetector>
      </XStack>

      <XStack jc={"space-between"} mt={33}>
        <Input
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Título.."
          multiline
          maxLength={30}
          maxWidth={"$20"}
          py={"$1"}
          fontSize={"$3"}
          fontWeight={"$7"}
          ml={30}
          bg={"$colorTransparent"}
          borderWidth={0}
          focusStyle={{
            borderWidth: 0,
            outlineWidth: 0,
          }}
        />
      </XStack>

      <View style={styles.line} />

      <Input
        f={1}
        value={note}
        onChangeText={(text) => setNote(text)}
        placeholder="Contenido de la nota..."
        multiline
        verticalAlign={"top"}
        mx={30}
        fontSize={19}
        fontWeight={"$3"}
        lineHeight={"$5"}
        bg={"$colorTransparent"}
        borderWidth={0}
        focusStyle={{
          borderWidth: 0,
          outlineWidth: 0,
        }}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  buttonShadow: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.4)",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#B1B1B1",
    marginTop: 18,
    marginBottom: 28,
    marginHorizontal: 30,
    marginVertical: 1,
  },
});
