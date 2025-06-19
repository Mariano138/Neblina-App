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

//Recibo el item desde donde llaman a notes form para completar los campos
export default function NotesForm({ item }: { item?: note }) {
  //Recibo el item opcionalmente y completo los campos, caso contrario los dejo en limpio usando ''.
  const [title, setTitle] = useState<string>(item?.title ?? '');
  const [content, setContent] = useState<string>(item?.content ?? '');

  //Llamo la logica de agrear o borrar una nota de mi hook.
  const { handleAdd, handleDelete } = useHandleButtons();

  //Estas funciones llaman a las de mi hook pasandole los parametros necesarios.
  const handleSubmit = async () => {
    try {
      await handleAdd(item?.id, title, content);
    } catch (error) {
      console.log('Error en el submit del form.', error);
    }
  };
  const handleCancel = async () => {
    try {
      await handleDelete(item?.id);
    } catch (error) {
      console.log('Error en el delete del form.', error);
    }
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
