import NotFoundScreen from './+not-found';
import ItemId from '~/components/notes/items/ItemId';

import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { notesTable } from '~/db/schema';
import Drizzle from '~/utils/Drizzle';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '~/types/navigation';

export default function NoteId({ route }: { route: RouteProp<RootStackParamList, 'Note'> }) {
  //llamo a mi db usando mi hook para que use drizzle y luego uso livequery para ver mi db en tiempo real.
  const db = Drizzle();
  const { data } = useLiveQuery(db.select().from(notesTable));

  // Comparo el id dinamico con el id de la nota y si es el mismo lo guardo en una constante
  // para luego pasarla a mi componente itemID

  const { noteId } = route.params;
  const item = data.find((n) => String(n.id) === String(noteId));

  if (!item) return <NotFoundScreen />;

  return <ItemId item={item} />;
}
