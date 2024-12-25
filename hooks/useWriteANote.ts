import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid/non-secure";
import formatDate from "./helpers/FormatDate";

type Props = {
  addNote: (note: {
    title: string;
    content: string;
    id: string;
    date: string;
    color: string;
  }) => void;
  setWriteNote: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useWriteANote({ addNote, setWriteNote }: Props) {
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const pastelColors = ["#E4F0FF", "#FFE4E6", "#D9F7FF", "#FFF4E4", "#E4FFE4"];
  const randomColor =
    pastelColors[Math.floor(Math.random() * pastelColors.length)];

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
      color: randomColor,
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
