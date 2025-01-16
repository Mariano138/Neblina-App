import { useState, useEffect } from "react";
import { nanoid } from "nanoid/non-secure";
import formatDate from "./helpers/FormatDate";
import { useRouter } from "expo-router";

type Props = {
  addNote?: (note: {
    title: string;
    content: string;
    id: string;
    date: string;
    color: string;
  }) => void;
};

export default function useWriteANote({ addNote }: Props) {
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");

  //Generate random pastel color
  const pastelColors = ["#E4F0FF", "#FFE4E6", "#D9F7FF", "#FFF4E4", "#E4FFE4"];
  const randomColor =
    pastelColors[Math.floor(Math.random() * pastelColors.length)];

  //Generate Date
  const formattedDate = formatDate();

  //Generate a title with first letters of note
  // useEffect(() => {
  //   if (title.trim()) {
  //     const firstLine = note.split("\n")[0];
  //     const truncatedLine =
  //       firstLine.length > 15 ? firstLine.slice(0, 15) + "..." : firstLine;
  //     setTitle(truncatedLine);
  //   }
  // }, [note]);

  //Logic to save a note
  const router = useRouter();

  const handleSave = () => {
    if (!note.trim()) {
      router.push(`/`);
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
    router.push(`/`);
  };

  //Logic to handle cancel/delete button press

  const handleCancel = () => {
    router.push(`/`);
  };

  return {
    handleSave,
    handleCancel,
    title,
    setTitle,
    note,
    setNote,
  };
}
