import { View, Text, XStack, Button } from "tamagui";
import React from "react";
import { Settings } from "@tamagui/lucide-icons";
//Screens
import ButtonsAdd from "../components/ButtonsAdd";
import NotesComponent from "../components/NotesComponent";

//Context
import { useNotes } from "../context/NotesProvider";

const HomeScreen = () => {
  const { notes } = useNotes();

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

      {notes.length == 0 ? (
        <View f={1} jc={"center"} ai={"center"}>
          <Text fontSize={20} color={"#A0A0A0"}>
            Nada por aquí...
          </Text>
        </View>
      ) : (
        <NotesComponent />
      )}

      <ButtonsAdd />
    </View>
  );
};

export default HomeScreen;
