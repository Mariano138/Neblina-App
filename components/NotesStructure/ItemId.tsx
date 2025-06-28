import { View, Text } from 'react-native';
import { FormatDate } from '~/helpers/FormatDate';
import NotesForm from '../NotesForm';

interface note {
  id: number;
  title: string | null;
  content: string | null;
  color: string;
  createdDate: string;
  updatedDate: string;
}

export default function ItemId({ item }: { item: note }) {
  //Esta linea formatea la fecha de la db usando mi helper
  const createdDate = FormatDate(item.createdDate);

  return (
    <View style={{ backgroundColor: item.color }}>
      <NotesForm item={item} />
      <Text>creada el...{createdDate}</Text>
      <Text>actualizada el...{item.updatedDate}</Text>
    </View>
  );
}
