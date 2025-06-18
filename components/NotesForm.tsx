import { View, TextInput, Button } from 'react-native';
import useHandleButtons from '~/hooks/useHandleButtons';
import { useState } from 'react';

interface note {
  id: number;
  title: string | null;
  content: string | null;
  color: string;
  createdDate: string;
  updatedDate: string;
}

export default function NotesForm({ item }: { item: note }) {
  const [title, setTitle] = useState<string>(item?.title ?? '');
  const [content, setContent] = useState<string>(item?.content ?? '');
  const { handleAdd, handleDelete } = useHandleButtons();

  const handleSubmit = async () => {
    await handleAdd(item?.id, title, content);
  };

  const handleCancel = async () => {
    await handleDelete(item?.id);
  };

  return (
    <View>
      <Button title="Save" onPress={handleSubmit} />
      <Button title="Delete" onPress={handleCancel} />
      <TextInput placeholder="title" value={title} onChangeText={(text) => setTitle(text)} />
      <TextInput placeholder="content" value={content} onChangeText={(text) => setContent(text)} />
    </View>
  );
}
