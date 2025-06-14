import { useLocalSearchParams } from 'expo-router';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { notesTable } from '~/db/schema';
import NotFoundScreen from '../+not-found';
import ItemId from '~/components/NotesStructure/ItemId';
import useDrizzle from '~/hooks/useDrizzle';

export default function NoteId() {
  const db = useDrizzle();
  const { data } = useLiveQuery(db.select().from(notesTable));

  const { id } = useLocalSearchParams<{ id: string }>();
  const item = data.find((n) => String(n.id) === String(id));

  if (!item) return <NotFoundScreen />;

  return <ItemId item={item} />;
}
