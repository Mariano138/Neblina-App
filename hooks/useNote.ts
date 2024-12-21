import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, AppStateStatus, BackHandler } from "react-native";
import { router } from "expo-router";
import { useNotes } from "../context/NotesProvider";
import formatDate from "./helpers/FormatDate";

type Props = {
  id: string | string[];
};

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

type useNoteReturn = {
  handleSave: () => Promise<void>;
  handleDelete: () => Promise<void>;
  formattedDate: string;
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
};

export default function useNote({ id }: Props): useNoteReturn | undefined {
  const { notes, setNotes } = useNotes();
  const [note, setNote] = useState(notes.find((n) => String(n.id) == id));
  const [appState, setAppState] = useState(AppState.currentState);

  const formattedDate = formatDate();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, [appState, note]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState === "active" && nextAppState.match(/inactive|background/)) {
      if (!note) {
        return;
      }
      try {
        const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
        AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        router.push("/");
        return true;
      } catch (e) {
        console.error("No se pudo guardar la nota." + e);
      }
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    const backAction = () => {
      if (!note) {
        return;
      }
      try {
        const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
        AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        router.push("/");
        return true;
      } catch (e) {
        console.error("No se pudo guardar la nota." + e);
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [note]);

  useEffect(() => {
    if (!note) {
      const foundNote = notes.find((n) => String(n.id) == id);
      setNote(foundNote);
    }
  }, [notes, id]);

  if (!note) return undefined;

  const handleDelete = async () => {
    try {
      const updatedNotes = notes.filter((n) => String(n.id) !== id);
      AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      router.push("/");
    } catch (e) {
      console.error("Error al eliminar la nota." + e);
    }
  };

  const handleSave = async () => {
    try {
      const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
      AsyncStorage.setItem("notes-key", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      router.push("/");
    } catch (e) {
      console.error("Ocurrio un erro al guardar la nota. " + e);
    }
  };

  return {
    handleSave,
    handleDelete,
    formattedDate,
    note,
    setNote,
  };
}
