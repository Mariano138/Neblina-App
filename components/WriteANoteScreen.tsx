import { View, Input, XStack, Button, YStack, TextArea } from "tamagui";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Save, Trash } from "@tamagui/lucide-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { nanoid } from "nanoid/non-secure";

type Props = {
  addNote: (note: {
    title: string;
    content: string;
    id: string;
    date: string;
  }) => void;
  setWriteNote: React.Dispatch<React.SetStateAction<boolean>>;
};

const WriteANoteScreen = ({ addNote, setWriteNote }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const actualDate = new Date();
  const formatDate = format(actualDate, "d MMM", { locale: es });

  useEffect(() => {
    if (note.trim()) {
      const firstLine = note.split("\n")[0];
      const truncatedLine =
        firstLine.length > 15 ? firstLine.slice(0, 15) + "..." : firstLine;
      setTitle(truncatedLine);
    }
  }, [note]);

  const handleSave = () => {
    if (!note.trim()) {
      alert("El contenido de la nota no puede estar vacío.");
      return;
    }
    const newNote = {
      title: title,
      content: note,
      id: nanoid(),
      date: formatDate,
    };
    addNote(newNote);
    setWriteNote(false);
  };

  const handleCancel = () => {
    setWriteNote(false);
  };

  return (
    <View
      f={1}
      bg={"#FFF6E5"}
      minHeight={"408"}
      w={"100%"}
      br={20}
      pos={"absolute"}
      top={"10%"}
      style={styles.containerShadow}
      zIndex={1000}
    >
      <YStack mx={32} mt={36} f={1}>
        <XStack jc={"space-between"}>
          <Input
            multiline
            maxLength={30}
            backgroundColor="$colorTransparent"
            borderWidth={0}
            placeholder="Título.."
            fontSize={27}
            fontWeight={"bold"}
            h={"auto"}
            w={"60%"}
            color={"#4F4F4F"}
            focusable={false}
            value={"Nota"}
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

        <View style={styles.line} />

        <View f={1}>
          <TextArea
            multiline
            fontSize={18}
            bg={"$colorTransparent"}
            bw={"$0"}
            w={"100%"}
            numberOfLines={8}
            lineHeight={"$5"}
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
  line: {
    borderBottomWidth: 2,
    borderBottomColor: "#D1D1D1",
    marginVertical: 10,
  },
});

export default WriteANoteScreen;
