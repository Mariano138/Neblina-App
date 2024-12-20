import { View, Text, XStack, Button } from "tamagui";
import React, { useEffect, useState } from "react";
import { Settings } from "@tamagui/lucide-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur"; // Importa BlurView

//Screens
import ButtonsAdd from "../components/ButtonsAdd";
import NotesComponent from "../components/NotesComponent";
import WriteANote from "../components/WriteANote";
//Context
import { useNotes } from "../context/NotesProvider";

interface Note {
  title: string;
  content: string;
  id: string;
  date: string;
}

const HomeScreen = () => {
  const { notes, setNotes } = useNotes();

  const [writeNote, setWriteNote] = useState<boolean>(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNote = await AsyncStorage.getItem("notes-key");
        if (storedNote) {
          setNotes(JSON.parse(storedNote));
        } else {
          setNotes([]);
        }
      } catch (e) {
        console.error("Ocurrió un error al cargar las notas. " + e);
      }
    };
    loadNotes();
  }, []);

  const addNote = async (newNote: Note) => {
    try {
      const updatedNotes = [...notes, newNote];
      await AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (e) {
      console.error("Ocurrió un error al guardar las notas " + e);
    }
  };

  return (
    <View f={1} pt={"30"} px={"30"}>
      <XStack jc={"space-between"}>
        <Text
          style={{
            textShadowOffset: { width: 0, height: 4 },
            textShadowRadius: 6,
          }}
          fontFamily="$body"
          fontSize={25}
          letterSpacing={"$3"}
          fontWeight="$7"
          fontStyle="italic"
        >
          Neblina
        </Text>
        <Button circular bg={"#E0E0E0"} size={42} icon={Settings}></Button>
      </XStack>

      {writeNote && (
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={10}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />
      )}

      {writeNote === true ? (
        <WriteANote addNote={addNote} setWriteNote={setWriteNote} />
      ) : null}

      {notes.length == 0 ? (
        <View ai={"center"} mt={"50"}>
          <Text fontSize={20} color={"#A0A0A0"}>
            Nada por aquí...
          </Text>
        </View>
      ) : (
        <NotesComponent />
      )}

      <ButtonsAdd setWriteNote={setWriteNote} />
    </View>
  );
};

export default HomeScreen;
