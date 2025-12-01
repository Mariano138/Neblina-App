import { useCallback } from 'react';
import { View } from 'react-native';

import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { notesTable } from '~/db/schema';
import Drizzle from '~/utils/Drizzle';

import Item from './items/Item';
import { Note } from '~/types/note';
import { desc } from 'drizzle-orm';
import Animated, { LinearTransition } from 'react-native-reanimated';

export default function NotesList() {
  //llamo a mi db usando mi hook para que use drizzle y luego uso livequery para ver mi db en tiempo real.
  const db = Drizzle();
  const { data } = useLiveQuery(
    db.select().from(notesTable).orderBy(desc(notesTable.pinned), desc(notesTable.id))
  );

  //Funcion para que renderiza mis notas usando useCallback para evitar re renders, esto es importante.
  const renderItem = useCallback(({ item }: { item: Note }) => <Item item={item} />, []);

  return (
    <View>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        itemLayoutAnimation={LinearTransition}
      />
    </View>
  );
}
