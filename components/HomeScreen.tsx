import { View, Text, XStack, Button } from "tamagui";
import React, { useState } from "react";
import { Settings } from "@tamagui/lucide-icons";

//Screens
import ButtonsAdd from "./ButtonsAdd";
import NotesComponent from "./NotesComponent";

interface notesBody {
  title: string;
  note: string;
  id: number;
}

const HomeScreen = () => {
  const [notes, setNotes] = useState<notesBody[]>([]);

  const addNote = (newNote: notesBody) => {
    setNotes([...notes, newNote]);
  };

  return (
    <View f={1} mt={"30"} mx={"30"}>
      <XStack jc={"space-between"}>
        <Text fontSize={25}>Neblina</Text>
        <Button circular bg={"#E0E0E0"} size={42} icon={Settings}></Button>
      </XStack>

      <NotesComponent notes={notes} />

      <ButtonsAdd addNote={addNote} />
    </View>
  );
};

export default HomeScreen;
