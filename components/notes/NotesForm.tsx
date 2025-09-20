import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';

import ColorPicker from '../pickers/ColorPicker';
import DatePicker from '../pickers/DatePicker';

import useHandleButtons from '~/hooks/useHandleButtons';
import useNotesForm from '~/hooks/useNotesForm';

import GenerateColor from '~/utils/GenerateColor';
import { Note } from '~/types/note';
import useUserActions from '~/hooks/useUserActions';

//Recibo el item desde donde llaman a notes form para completar los campos
export default function NotesForm({ item }: { item?: Note }) {
  const { title, setTitle, content, setContent, reminder, setReminder } = useNotesForm({ item });

  //Genero un color random para la nota si no selecciona uno.
  const { randomColor } = GenerateColor();
  const [color, setColor] = useState<string>(item?.color ?? randomColor); // Uso el color existente caso contrario genero uno.

  //Estas funciones llaman a las de mi hook pasandole los parametros necesarios para crear/actualizar borrar/cancelar.
  const { handleAdd, handleDelete, handleBack } = useHandleButtons(); //Logica de agrear o borrar una nota de mi hook.

  const handleSubmit = async (goBackAfterSave = true) => {
    try {
      await handleAdd(
        item?.id,
        title,
        content,
        color,
        goBackAfterSave,
        reminder?.toISOString(),
        item
      );
    } catch (error) {
      console.log('Error en el submit del form.', error);
    }
  };

  useUserActions({ handleSubmit });

  const handleCancel = async () => {
    try {
      await handleDelete(item?.id);
    } catch (error) {
      console.log('Error en el delete del form.', error);
    }
  };

  return (
    <View style={{ backgroundColor: color }}>
      <Button title="Back" onPress={handleBack} />
      <Button title="Save" onPress={() => handleSubmit(true)} />
      <Button title="Delete" onPress={handleCancel} />
      <ColorPicker setColor={setColor} />
      <TextInput placeholder="title" value={title} onChangeText={(text) => setTitle(text)} />
      <TextInput placeholder="content" value={content} onChangeText={(text) => setContent(text)} />
      <DatePicker item={item} onReminderSelect={setReminder} />
    </View>
  );
}
