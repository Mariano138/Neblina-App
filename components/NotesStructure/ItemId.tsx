import { View, Text, Button } from 'react-native';
import useHandleButtons from '~/hooks/useHandleButtons';
import useNotesInput from '~/hooks/useNotesInput';

interface note {
  id: number;
  title: string | null;
  content: string | null;
  color: string;
  createdDate: string;
  updatedDate: string;
}

export default function ItemId({ item }: { item: note }) {
  const { title, setTitle, content, setContent } = useNotesInput();
  const { handleSave, handleDelete } = useHandleButtons();

  return (
    <View>
      <Button title="Save" onPress={() => handleSave(title, content)} />
      <Button title="Delete" onPress={() => handleDelete(item.id)} />
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
    </View>
  );
}
