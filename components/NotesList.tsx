import { View, FlatList } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { notesTable } from '~/db/schema';
import Item from './NotesStructure/Item';
import { useCallback } from 'react';
import useDrizzle from '~/hooks/useDrizzle';

interface note {
  id: number;
  title: string | null;
  content: string | null;
  color: string;
  createdDate: string;
  updatedDate: string;
}

export default function NotesList() {
  //llamo a mi db usando mi hook para que use drizzle y luego uso livequery para ver mi db en tiempo real.
  const db = useDrizzle();
  const { data } = useLiveQuery(db.select().from(notesTable));

  //Funcion para que renderiza mis notas usando useCallback para evitar re renders, esto es importante.
  const renderItem = useCallback(({ item }: { item: note }) => <Item item={item} />, []);

  return (
    <View>
      <FlatList data={data} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
    </View>
  );
}
