import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';

import ColorPicker from '../pickers/ColorPicker';

import useHandleButtons from '~/hooks/useHandleButtons';
import GenerateColor from '~/utils/GenerateColor';
import DatePicker from '../pickers/DatePicker';
import { Note } from '~/types/note';

//Recibo el item desde donde llaman a notes form para completar los campos
export default function NotesForm({ item }: { item?: Note }) {
  //Recibo el item opcionalmente y completo los campos, caso contrario los dejo en limpio usando ''.
  const [title, setTitle] = useState<string>(item?.title ?? '');
  const [content, setContent] = useState<string>(item?.content ?? '');
  const [reminder, setReminder] = useState<Date>(new Date(item?.reminderDate ?? new Date())); //Tengo que transformar el remiderDate de la db a DATE porque datepicker solo acepta Date de value y no strings.
  const [senDateDb, setSendDateDb] = useState(false);

  //Llamo la logica de agrear o borrar una nota de mi hook.
  const { handleAdd, handleDelete } = useHandleButtons();

  //Genero un color random para la nota si no selecciona uno.
  const { randomColor } = GenerateColor();
  const [color, setColor] = useState<string>(item?.color ?? randomColor); // Uso el color existente caso contrario genero uno.

  //Estas funciones llaman a las de mi hook pasandole los parametros necesarios para crear/actualizar borrar/cancelar.
  const handleSubmit = async () => {
    try {
      if (senDateDb === false) {
        await handleAdd(item?.id, title, content, color);
      } else {
        await handleAdd(item?.id, title, content, color, reminder.toISOString());
      }
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
    <View style={{ backgroundColor: color }}>
      <Button title="Save" onPress={handleSubmit} />
      <Button title="Delete" onPress={handleCancel} />
      <ColorPicker setColor={setColor} />
      <TextInput placeholder="title" value={title} onChangeText={(text) => setTitle(text)} />
      <TextInput placeholder="content" value={content} onChangeText={(text) => setContent(text)} />
      <DatePicker
        setSendDateDb={setSendDateDb}
        item={item}
        reminder={reminder}
        setReminder={setReminder}
      />
    </View>
  );
}
