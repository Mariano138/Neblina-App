import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid/non-secure";
import formatDate from "./helpers/FormatDate";

type Props = {
  addNote: (note: {
    title: string;
    content: string;
    id: string;
    date: string;
  }) => void;
  setWriteNote: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useWriteANote({ addNote, setWriteNote }: Props) {
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const formattedDate = formatDate();

  useEffect(() => {
    if (note.trim()) {
      const firstLine = note.split("\n")[0];
      const truncatedLine =
        firstLine.length > 15 ? firstLine.slice(0, 15) + "..." : firstLine;
      setTitle(truncatedLine);
    }
  }, [note]);

  const handleSave = () => {
    if (!note.trim()) {
      alert("El contenido de la nota no puede estar vacío.");
      return;
    }
    const newNote = {
      title: title,
      content: note,
      id: nanoid(),
      date: formattedDate,
    };
    addNote(newNote);
    setWriteNote(false);
  };

  const handleCancel = () => {
    setWriteNote(false);
  };

  return {
    handleSave,
    handleCancel,
    note,
    setNote,
  };
}
