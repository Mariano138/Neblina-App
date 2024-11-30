import { View, Text, Button } from "tamagui";
import React from "react";
import { StyleSheet } from "react-native";
import { Trash } from "@tamagui/lucide-icons";

type Props = {
  item: {
    title: string;
    note: string;
    id: number;
  };
};

const Note = ({ item }: Props) => {
  return (
    <View f={1} pt={30} pl={30}>
      <Text fontSize={27} fontWeight={"bold"}>
        {item.title}
      </Text>
      <View style={styles.line} />
      <Text pt={3}>{item.note}</Text>
      <View f={1} jc={"flex-end"} ai={"flex-end"} mb={17} mr={38}>
        <Button
          size={42}
          color={"#757575"}
          bg={"#FFC4C4"}
          circular
          icon={Trash}
          style={styles.buttonShadow}
        />
      </View>
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
  line: {
    borderBottomWidth: 1,
    width: "90%",
    borderBottomColor: "#D1D1D1",
    marginVertical: 10,
  },
});

export default Note;
