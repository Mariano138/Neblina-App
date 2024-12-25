import React, { createContext, useContext, useState } from "react";

interface Note {
  title: string;
  content: string;
  id: string;
  date: string;
  color: string;
}

interface NotesContextProp {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesContext = createContext<NotesContextProp | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes debe usarse dentro de un NotesProvider");
  }
  return context;
};
