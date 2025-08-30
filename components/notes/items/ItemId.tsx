import { View, Text } from 'react-native';

import NotesForm from '../NotesForm';

import { FormatDate } from '~/utils/FormatDate';
import { Note } from '~/types/note';

export default function ItemId({ item }: { item: Note }) {
  const createdDate = FormatDate(item.createdDate); //Formateo la fecha para que coincida con las demas.

  return (
    <View style={{ backgroundColor: item.color }}>
      <NotesForm item={item} />
      <Text>creada el...{createdDate}</Text>
      <Text>actualizada el...{item.updatedDate}</Text>
    </View>
  );
}
