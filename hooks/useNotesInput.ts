import { useState } from 'react';

export default function useNotesInput() {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  return { title, content, setTitle, setContent };
}
