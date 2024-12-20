import { Text, View, XStack, YStack, Button, Input } from "tamagui";
import React, { useEffect, useState } from "react";
import { useNotes } from "../context/NotesProvider";
import { router, useLocalSearchParams } from "expo-router";
import { Save, Trash } from "@tamagui/lucide-icons";
import {
  AppState,
  AppStateStatus,
  BackHandler,
  StyleSheet,
} from "react-native";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Note() {
  const { notes, setNotes } = useNotes();
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState(notes.find((n) => String(n.id) == id));
  const [appState, setAppState] = useState(AppState.currentState);

  const actualDate = new Date();
  const formatDate = format(actualDate, "d MMM", { locale: es });

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, [appState, note]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState === "active" && nextAppState.match(/inactive|background/)) {
      if (!note) {
        return;
      }
      try {
        const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
        AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        router.push("/");
        return true;
      } catch (e) {
        console.error("No se pudo guardar la nota." + e);
      }
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    const backAction = () => {
      if (!note) {
        return;
      }
      try {
        const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
        AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        router.push("/");
        return true;
      } catch (e) {
        console.error("No se pudo guardar la nota." + e);
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [note]);

  useEffect(() => {
    if (!note) {
      const foundNote = notes.find((n) => String(n.id) == id);
      setNote(foundNote);
    }
  }, [notes, id]);

  if (!note) {
    return (
      <View f={1} jc={"center"}>
        <Text color={"#A0A0A0"} fontSize={"$1"} ta={"center"}>
          Nota no encontrada
        </Text>
      </View>
    );
  }

  const handleDelete = async () => {
    try {
      const updatedNotes = notes.filter((n) => String(n.id) !== id);
      AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      router.push("/");
    } catch (e) {
      console.error("Error al eliminar la nota." + e);
    }
  };

  const handleSave = async () => {
    try {
      const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
      AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      router.push("/");
    } catch (e) {
      console.error("Ocurrio un erro al guardar la nota. " + e);
    }
  };

  return (
    <YStack f={1} bg={"#E4F0FF"}>
      <XStack jc={"flex-end"} mt={44} mr={34} gap={18}>
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
          onPress={handleDelete}
        />
      </XStack>

      <XStack jc={"space-between"} mt={33}>
        <Input
          value={note.title}
          onChangeText={(text) => setNote({ ...note, title: text })}
          placeholder="Puedes agregar un titulo aqui."
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

        <Text als={"center"} fontSize={"$1"} fontWeight={"$1"} mr={39}>
          {note.date}
        </Text>
      </XStack>

      <Text mt={13} ml={30} fontSize={15} fontWeight={"$2"}>
        Editado: {formatDate}
      </Text>

      <View style={styles.line} />

      <Input
        f={1}
        value={note.content}
        onChangeText={(text) => setNote({ ...note, content: text })}
        placeholder="Escribe aquí el contenido de tu nota..."
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
