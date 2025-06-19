import { useLocalSearchParams } from 'expo-router';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { notesTable } from '~/db/schema';
import NotFoundScreen from '../+not-found';
import ItemId from '~/components/NotesStructure/ItemId';
import useDrizzle from '~/hooks/useDrizzle';

export default function NoteId() {
  //llamo a mi db usando mi hook para que use drizzle y luego uso livequery para ver mi db en tiempo real.
  const db = useDrizzle();
  const { data } = useLiveQuery(db.select().from(notesTable));

  // Comparo el id dinamico con el id de la nota y si es el mismo lo guardo en una constante
  // para luego pasarla a mi componente itemID
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = data.find((n) => String(n.id) === String(id));

  if (!item) return <NotFoundScreen />;

  return <ItemId item={item} />;
}
