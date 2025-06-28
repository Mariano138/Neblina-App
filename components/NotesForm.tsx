import { View, TextInput, Button } from 'react-native';
import useHandleButtons from '~/hooks/useHandleButtons';
import { useState } from 'react';
import ColorPicker from './ColorPicker';
import useGenerateColor from '~/hooks/useGenerateColor';
import ReminderDate from './ReminderDate';

interface note {
  id: number;
  title: string | null;
  content: string | null;
  color: string;
  createdDate: string;
  updatedDate: string;
  reminderDate: string;
}

//Recibo el item desde donde llaman a notes form para completar los campos
export default function NotesForm({ item }: { item?: note }) {
  //Recibo el item opcionalmente y completo los campos, caso contrario los dejo en limpio usando ''.
  const [title, setTitle] = useState<string>(item?.title ?? '');
  const [content, setContent] = useState<string>(item?.content ?? '');
  const [reminder, setReminder] = useState<Date>(new Date(item?.reminderDate ?? new Date())); //Tengo que transformar el remiderDate de la db a DATE porque datepicker solo acepta Date de value y no strings.

  //Llamo la logica de agrear o borrar una nota de mi hook.
  const { handleAdd, handleDelete } = useHandleButtons();

  //Genero un color random para la nota si no selecciona uno.
  const randomColor = useGenerateColor();
  const [color, setColor] = useState<string>(randomColor);

  //Estas funciones llaman a las de mi hook pasandole los parametros necesarios para crear/actaulizar borrar/cancelar.
  const handleSubmit = async () => {
    try {
      await handleAdd(item?.id, title, content, color, reminder.toISOString()); //toISOString para que se guarde acorde a la creada por datepicker en la db.
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
      <ReminderDate reminder={reminder} setReminder={setReminder} />
    </View>
  );
}
