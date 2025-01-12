import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid/non-secure";
import formatDate from "./helpers/FormatDate";

type Props = {
  addNote?: (note: {
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

  //Generate random pastel color
  const pastelColors = ["#E4F0FF", "#FFE4E6", "#D9F7FF", "#FFF4E4", "#E4FFE4"];
  const randomColor =
    pastelColors[Math.floor(Math.random() * pastelColors.length)];

  //Generate Date
  const formattedDate = formatDate();

  //Generate a title with first letters of note
  useEffect(() => {
    if (note.trim()) {
      const firstLine = note.split("\n")[0];
      const truncatedLine =
        firstLine.length > 15 ? firstLine.slice(0, 15) + "..." : firstLine;
      setTitle(truncatedLine);
    }
  }, [note]);

  //Logic to save a note
  const handleSave = (triggerExitAnimation: () => void) => {
    if (!note.trim()) {
      triggerExitAnimation();
      setTimeout(() => setWriteNote(false), 300);
      return;
    }

    const newNote = {
      title: title,
      content: note,
      id: nanoid(),
      date: formattedDate,
      color: randomColor,
    };

    if (addNote) {
      addNote(newNote);
    }

    triggerExitAnimation();
    setTimeout(() => setWriteNote(false), 300);
  };

  //Logic to handle cancel/delete button press

  const handleCancel = (triggerExitAnimation: () => void) => {
    triggerExitAnimation();
    setTimeout(() => setWriteNote(false), 300);
  };

  //Handle WriteANote appear in screen

  const handleAddNote = () => {
    setWriteNote(true);
  };

  return {
    handleSave,
    handleCancel,
    note,
    setNote,
    handleAddNote,
  };
}
