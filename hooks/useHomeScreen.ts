import { useEffect, useState } from "react";
import { useNotes } from "../context/NotesProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Note {
  title: string;
  content: string;
  id: string;
  date: string;
  color: string;
}

export default function useHomeScreen() {
  const { notes, setNotes } = useNotes();
  const [writeNote, setWriteNote] = useState<boolean>(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNote = await AsyncStorage.getItem("notes-key");
        if (storedNote) {
          setNotes(JSON.parse(storedNote));
        } else {
          setNotes([]);
        }
      } catch (e) {
        console.error("Ocurrió un error al cargar las notas. " + e);
      }
    };
    loadNotes();
  }, []);

  const addNote = async (newNote: Note) => {
    try {
      const updatedNotes = [...notes, newNote];
      await AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (e) {
      console.error("Ocurrió un error al guardar las notas " + e);
    }
  };

  return {
    addNote,
    writeNote,
    setWriteNote,
  };
}
