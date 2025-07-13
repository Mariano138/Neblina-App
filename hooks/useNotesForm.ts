import { useState } from 'react';

import { Note } from '~/types/note';

export default function useNotesForm({ item }: { item?: Note }) {
  //Recibo el item opcionalmente y completo los campos, caso contrario los dejo en limpio usando ''.
  const [title, setTitle] = useState<string>(item?.title ?? '');
  const [content, setContent] = useState<string>(item?.content ?? '');
  const [reminder, setReminder] = useState<Date | undefined>();

  return { title, setTitle, content, setContent, reminder, setReminder };
}
