import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Note from "./Note";
import { View } from "tamagui";

type note = {
  title: string;
  note: string;
  id: number;
};

type Props = {
  notes: note[];
};

const NotesComponent = ({ notes }: Props) => {
  const renderItem = ({ item }: { item: note }) => {
    return (
      <View
        mt={38}
        style={styles.containerShadow}
        w={340}
        h={258}
        bg={"#E4F0FF"}
        br={25}
      >
        <Note item={item} />
      </View>
    );
  };

  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  containerShadow: {
    boxShadow:
      "10px 10px 4px rgba(0, 0, 0, 0.3), inset 1px 1px 4px rgba(0, 0, 0, 0.4)",
  },
});

export default NotesComponent;
