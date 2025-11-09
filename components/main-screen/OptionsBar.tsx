import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { View, Text, Button, StyleSheet } from 'react-native';
import { notesTable } from '~/db/schema';
import useHandleButtons from '~/hooks/useHandleButtons';
import { useLongPressStore } from '~/store/useLongPressStore';
import Drizzle from '~/utils/Drizzle';
import { Pressable } from 'react-native';

//Icons
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const handleClose = useLongPressStore.getState().handleClose;

export default function OptionsBar() {
  const { handleMultipleDelete, handlePin } = useHandleButtons();
  const selectedNotes = useLongPressStore((state) => state.selectedNotes);

  const db = Drizzle();
  const { data } = useLiveQuery(db.select().from(notesTable));

  const selected = data?.filter((note) => selectedNotes.includes(note.id)) ?? [];
  const allPinned = selected.length > 0 && selected.every((note) => note.pinned);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleClose}>
        <Entypo name="cross" size={28} color="black" />
      </Pressable>
      <View style={styles.rightButtonsContainer}>
        {allPinned ? (
          <Pressable onPress={() => handlePin(selectedNotes, !allPinned)}>
            <MaterialCommunityIcons name="pin-off" size={28} color="black" />
          </Pressable>
        ) : (
          <Pressable onPress={() => handlePin(selectedNotes, !allPinned)}>
            <MaterialCommunityIcons name="pin" size={28} color="black" />
          </Pressable>
        )}
        <Pressable onPress={() => handleMultipleDelete(selectedNotes)}>
          <Feather name="trash-2" size={28} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});
