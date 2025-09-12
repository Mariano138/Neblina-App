import { View, Text } from 'react-native';

import NotesForm from '../NotesForm';

import { FormatDate } from '~/utils/FormatDate';
import { Note } from '~/types/note';

export default function ItemId({ item }: { item: Note }) {
  //Formateo las fechas para que coincidan.
  const createdDate = FormatDate(item.createdDate);
  const updatedDate = FormatDate(item.updatedDate);

  return (
    <View style={{ backgroundColor: item.color }}>
      <NotesForm item={item} />
      <Text>creada el...{createdDate}</Text>
      <Text>actualizada el...{updatedDate}</Text>
    </View>
  );
}
