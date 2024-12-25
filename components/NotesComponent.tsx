import React from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";
import Note from "./Note";
import { View } from "tamagui";
import { useRouter } from "expo-router";
import { useNotes } from "../context/NotesProvider";

//To-Do change NotesBody to => Notes
type NoteBody = {
  title: string;
  content: string;
  id: string;
  date: string;
  color: string;
};

const NotesComponent = () => {
  const { notes } = useNotes();
  const router = useRouter();

  const renderItem = ({ item }: { item: NoteBody }) => {
    return (
      <Pressable onPress={() => router.push(`/${item.id}`)}>
        <View
          mt={38}
          style={styles.containerShadow}
          w={340}
          h={258}
          bg={item.color}
          br={25}
        >
          <Note item={item} />
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
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
