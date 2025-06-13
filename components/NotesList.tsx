import { View, Text, FlatList } from 'react-native';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { notesTable } from '~/db/schema';
import { useSQLiteContext } from 'expo-sqlite';
import Item from './Item';
import { useCallback } from 'react';

interface note {
  id: number;
  title: string | null;
  content: string | null;
  color: string;
  createdDate: string;
  updatedDate: string;
}

export default function NotesList() {
  const rawDb = useSQLiteContext();
  const db = drizzle(rawDb);
  const { data } = useLiveQuery(db.select().from(notesTable));
  const renderItem = useCallback(({ item }: { item: note }) => <Item item={item} />, []);

  return (
    <View>
      <FlatList data={data} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
    </View>
  );
}
