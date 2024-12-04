import { View, Text, Button, XStack } from "tamagui";
import React from "react";
import { StyleSheet } from "react-native";
import { Trash } from "@tamagui/lucide-icons";

type note = {
  title: string;
  note: string;
  id: number;
  date: string;
};

type Props = {
  item: {
    title: string;
    note: string;
    id: number;
    date: string;
  };
  notes: note[];
  setNotes: React.Dispatch<React.SetStateAction<note[]>>;
};

const Note = ({ item, setNotes, notes }: Props) => {
  const handleDelete = () => {
    setNotes(notes.filter((note) => note.id !== item.id));
  };

  return (
    <View f={1} pt={30} pl={30}>
      <Text
        fontSize={"$3"}
        fontFamily="$body"
        fontWeight="$7"
        mb={15}
        color={"#4F4F4F"}
      >
        {item.title}
      </Text>

      <Text
        fontSize={"$1"}
        fontFamily={"$body"}
        fontWeight={"$3"}
        fontStyle="normal"
        numberOfLines={4}
        lineHeight={"$4"}
        mr={30}
      >
        {item.note}
      </Text>
      <XStack f={1} jc={"space-between"} ai={"flex-end"} mb={17} mr={38}>
        <Text fontSize={"$1"} fontFamily={"$body"} fontWeight={"$1"}>
          {item.date}
        </Text>
        <Button
          size={42}
          color={"#757575"}
          bg={"#FFC4C4"}
          circular
          icon={Trash}
          style={styles.buttonShadow}
          onPress={handleDelete}
        />
      </XStack>
    </View>
  );
};

const styles = StyleSheet.create({
  containerShadow: {
    boxShadow:
      "10px 10px 4px rgba(0, 0, 0, 0.3), inset 1px 1px 4px rgba(0, 0, 0, 0.4)",
  },
  buttonShadow: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.4)",
  },
});

export default Note;
