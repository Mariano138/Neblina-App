import { View, Input, XStack, Button, YStack } from "tamagui";

import { TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Save, Trash } from "@tamagui/lucide-icons";

type Props = {
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
  addNote: (note: { title: string; note: string; id: number }) => void;
};

const WriteANoteScreen = ({ setPressed, addNote }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSave = () => {
    if (!title.trim() || !note.trim()) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }
    const newNote = {
      title: title,
      note: note,
      id: Date.now(),
    };
    addNote(newNote);
    setPressed(false);
  };

  const handleCancel = () => {
    setPressed(false);
  };

  return (
    <View
      bg={"#FFF6E5"}
      minHeight={"408"}
      h={"auto"}
      w={"100%"}
      br={20}
      pos={"absolute"}
      top={"10%"}
      style={styles.containerShadow}
    >
      <YStack mx={32} mt={36} f={1}>
        <XStack jc={"space-between"}>
          <Input
            backgroundColor="$colorTransparent"
            borderWidth={0}
            placeholder="Titulo.."
            fontSize={27}
            fontWeight={"bold"}
            h={"auto"}
            w={"auto"}
            color={"#4F4F4F"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <XStack gap={19}>
            <Button
              style={styles.buttonShadow}
              bg={"#DFFFE7"}
              size={42}
              circular
              icon={Save}
              onPress={handleSave}
            />

            <Button
              style={styles.buttonShadow}
              bg={"#FFC4C4"}
              size={42}
              circular
              icon={Trash}
              onPress={handleCancel}
            />
          </XStack>
        </XStack>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#D1D1D1",
            marginVertical: 10,
          }}
        />

        <View f={1}>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="Escribe tu nota aquí..."
            placeholderTextColor="#A8A8A8"
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </View>
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    fontSize: 18,
    width: "100%",
    textAlignVertical: "top",
    lineHeight: 34,
    color: "#4F4F4F",
  },
  containerShadow: {
    boxShadow:
      "10px 15px 4px rgba(0, 0, 0, 0.3), inset 5px 10px 4px rgba(0, 0, 0, 0.2)",
  },
  buttonShadow: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.4)",
  },
});

export default WriteANoteScreen;
