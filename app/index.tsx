import { View, Text, XStack, Button } from "tamagui";
import React, { useState } from "react";
import { Settings } from "@tamagui/lucide-icons";

//Screens
import ButtonsAdd from "../components/ButtonsAdd";
import NotesComponent from "../components/NotesComponent";
import WriteANoteScreen from "../components/WriteANoteScreen";
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

  const addNote = (newNote: Note) => {
    setNotes([...notes, newNote]);
  };

  return (
    <View f={1} mt={"30"} mx={"30"}>
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

      {writeNote === true ? (
        <WriteANoteScreen addNote={addNote} setWriteNote={setWriteNote} />
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
