import { useSharedValue } from "react-native-reanimated";
import { useNotes } from "../context/NotesProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Note = {
  title: string;
  content: string;
  id: string;
  date: string;
  color: string;
};

type Props = {
  item: Note;
};

export default function useItem({ item }: Props) {
  const { notes, setNotes } = useNotes();
  //Delete a note from item(outside [id])
  const handleDeleteItem = async () => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== item.id);
      await AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (e) {
      console.error("Ocurrió un error al eliminar la nota. " + e);
    }
  };

  return {
    handleDeleteItem,
  };
}
