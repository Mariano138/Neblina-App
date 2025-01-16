import { StyleSheet } from "react-native";
import { View } from "tamagui";
import { useRouter } from "expo-router";
import { useNotes } from "../context/NotesProvider";
import { ZoomOut, ZoomIn, LinearTransition } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import Note from "./Note";
import useAnimations from "../hooks/useAnimations";

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
  const { AnimatedPressable } = useAnimations();

  const renderItem = ({ item }: { item: NoteBody }) => {
    return (
      <AnimatedPressable
        entering={ZoomIn.delay(0)}
        exiting={ZoomOut}
        onPress={() => router.push(`/${item.id}`)}
      >
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
      </AnimatedPressable>
    );
  };

  return (
    <Animated.FlatList
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      itemLayoutAnimation={LinearTransition}
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
